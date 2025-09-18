const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/user");

const otpStore = new Map();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

module.exports.getotp = async(req, res) => {
    try {
        const { email, type } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        if (type !== "login") {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
        } else {
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(400).json({ message: "User does not exists" });
            }
        }

        const generatedOtp = generateOTP();
        console.log("Generated OTP Successfully");
        otpStore.set(email, generatedOtp);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "OTP Verification",
            text: `Your OTP is: ${generatedOtp}`,
        });

        res.json({ message: "OTP sent" });
    } catch (error) {
        console.log("Error sending OTP:", error);
        return res.status(500).json({ message: "Failed to send OTP" });
    }
};

module.exports.signup = async(req, res) => {
    const { email, name, dob, otp } = req.body;
    if (!email || !name || !dob || !otp) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const storedOtp = otpStore.get(email);
    if (!storedOtp || storedOtp !== otp) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    try {
        const savedUser = await new User({ email, name, dob }).save();
        otpStore.delete(email);

        const token = jwt.sign({ userId: { id: savedUser._id, email: savedUser.email } },
            process.env.JWT_SECRET, { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Signup failed" });
    }
};

module.exports.verifyuser = async(req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized User" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User Verified successfully", user });
    } catch (error) {
        console.error("Verification error:", error);
        return res.status(500).json({ message: "Failed to verify User" });
    }
};

module.exports.login = async(req, res) => {
    const { email, otp, check } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "Enter a valid email" });
    }

    let storedOtp = otpStore.get(email);
    const otpStr = String(otp).trim();

    if (!storedOtp || storedOtp !== otpStr) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (user && storedOtp === otpStr) {
        const userId = {
            id: user._id,
            email: user.email,
        };
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        if (check) {
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
        } else {
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 24 * 60 * 60 * 1000,
            });
        }
        otpStore.delete(email);
        res.json({ message: "Signin successfully" });
    } else {
        res.status(400).json({ message: "Invalid OTP or expired OTP" });
    }
};

module.exports.logout = async(req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            path: "/",
        });
        res.json({ message: "User logout successfully" });
    } catch (error) {
        return res.status(400).json({ message: "Failed to logout User" });
    }
};
