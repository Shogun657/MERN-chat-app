import bcrypt from "bcryptjs"

import User from "../models/user.models.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        console.log("req body :" + req.body)
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passowrds don't match" })
        }
        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ error: "User already exists" })
        }

        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Default profile picture
        // https://avatar-placeholder.iran.liara.run

        const boyPP = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlPP = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyPP : girlPP
        })

        if (newUser) {
            // Generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        return res.status(500).json({ error: "error :: signup :: server error" })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // console.log("req body  : ", req.body)
        const user = await User.findOne({ username })
        // console.log(user);
        const isCorrectPassword = await bcrypt.compare(password, user?.password || "")   // The || "" part wis essential because otherwise bcrypt will give me an "illegal arguement" arror
        // console.log(isCorrectPassword);
        if (!user || !isCorrectPassword) {
            return res.status(400).json({ error: "invalid credentials" })
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (error) {
        return res.status(500).json({ error: "error :: login :: server error" })
    }
}


export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(500).json({ message: "Logged out Successfully!" })
    } catch (error) {
        return res.status(500).json({ error: "error :: logout :: server error" })
    }
}