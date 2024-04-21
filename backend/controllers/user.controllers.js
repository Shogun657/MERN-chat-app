import User from "../models/user.models.js";

export const getUsers = async(req,res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id : {$ne : loggedInUserId}}).select('-password');   // fetch all users from database whose id is not equal to the logged in userid

        res.status(200).json(filteredUsers)

    } catch (error) {
        console.error("Error in getUsers functionality : ", error.message);
        res.status(500).json({error: "Internal Server Error :: getUsers :: controller"})
    }
}