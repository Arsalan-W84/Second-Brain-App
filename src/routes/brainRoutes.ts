import express from "express";
import { authmiddleware } from "../middlewares/auth.js";
import { ContentModel } from "../schema.js";
const Router = express.Router();

Router.get("/share" , authmiddleware , async(req,res)=> { //sharing 1 content from the user's brain
    //@ts-ignore
    const userId = req.userId;
    try{
        const sharedContent = await ContentModel.findOne({
            userId : userId,
            _id : req.body.contentId
        } , "link title");
        res.status(200).json({
            sharedContent             //gives the link attached with that content
        });
    }catch(e){
        return res.status(404).json({
            Error : e
        });
    }
    
});

Router.get("/:shareLink" , authmiddleware ,(req,res) => {
    res.json({
        message : "/shareLink"
    });
});

export default Router;