import Conversation from "../models/conversation.models.js"
import Message from "../models/message.models.js"

// sending message to a user
export const sendMessage = async (req,res) => {
    try {
        const {message} = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all : [senderId, receiverId]}
        })

        if(!conversation){
            // we are using let instead of const because of this line only
            conversation = await Conversation.create({
                participants : [senderId, receiverId]
            })
            // we also don't need to mention messsages during creating one convo because by default 
            // the value of messages has been set to [] in our model schema
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        // SOCKET IO FUNCTIONALITY HERE
        
        // await conversation.save()
        // await newMessage.save()

        // this will run in parallel
        // remember to give the commands in the array []
        await Promise.all([conversation.save(),newMessage.save()])

        return res.status(201).json({newMessage})
    } catch (error) {
        console.log("Error in sendMessage controller : ", error.message);
        res.status(500).json({error: "Internal Server Error :: sendMessage :: controller"})
    }
}

// getting all messages of a conversation
export const getMessages = async(req,res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all : [userToChatId,senderId]}
        }).populate("messages");    // populating the message field

        if(!conversation) return res.status(200).json([])

        res.status(200).json(conversation.messages)



    } catch (error) {
        console.log("Error in getMessage controller : ", error.message);
        res.status(500).json({error: "Internal Server Error :: getMessage :: controller"})
    }
}
