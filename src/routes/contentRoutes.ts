import express from "express";
import { authmiddleware } from "../middlewares/auth.js";
import { ContentModel } from "../schema.js";
import { error } from "node:console";
const Router = express.Router();


Router.post("/" , authmiddleware , async(req,res) => { // POST A CONTENT 
    //@ts-ignore
    const UserId = req.userId;
    const {link , type , title} = req.body;
    try{
        await ContentModel.create({
            link: link,
            type : type , 
            title : title , 
            tags : [] , 
            userId : UserId,
           // authorId : authorId   app feature allows other users to post content in my brain , what change will i make here????
        });
        return res.json({
            message :  "content post"
        });
    }catch(e){
        return res.status(409).json({
            Error : e
        });
    }

});

Router.get("/" , authmiddleware ,  async(req,res) => { // get all contents for the user
    try{
        const UserContent = await ContentModel.find({
            //@ts-ignore
            userId : req.userId
        }).populate("userId" , "username");
        return res.json({
            message :  "content get",
            contents : UserContent
        });
    }catch(e){
        error : e
    }
        
});

Router.delete("/" , authmiddleware , async(req,res) => { // delete a specific content from the brain
    const contentId = req.body.contentId;
    try{
        await ContentModel.deleteOne({
            _id : contentId , 
            //@ts-ignore
            userId : req.userId
        });
        return res.status(200).json({
            message : "Content deleted successfully"
        });
    }catch(e) {
        return res.status(401).json({
            error : e
        })
    }
    
});

export default Router;