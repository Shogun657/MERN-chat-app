import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "isLoggedIn :: Unauthorized Access :: No token provided" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId).select("-password");

            if (!user) {
                return res.status(404).json({ error: "isLoggedIn :: User not found" });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ error: "isLoggedIn :: Unauthorized Access :: Invalid Token" });
        }

    } catch (error) {
        console.log("Error : ", error.message);
        return res.status(500).json({ error: "error :: isLoggedIn :: internal server error" });
    }
};

export default isLoggedIn;
