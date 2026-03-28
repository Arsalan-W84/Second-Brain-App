import express from "express";
import { authmiddleware } from "../middlewares/auth.js";
import { ContentModel, LinkModel } from "../schema.js";
const Router = express.Router();


function randomLinkGenerator() {
    let options =  "r4567tkjyuhmbgvfc389dxsqweaziopl120";
    let ans = "";
    for(let i=0;i<25;i++){
       ans += options[Math.floor(Math.random()*options.length)];
    }
    return ans;
}

Router.post("/share" , authmiddleware , async(req,res)=> { //generate a unique link for the user
    //@ts-ignore
    const userId = req.userId;
    const {share} =  req.body;
    try{
        if(share){
            const hash = randomLinkGenerator();
            await LinkModel.findOneAndUpdate({
                userId : userId 
            } , 
            {hash : hash} , 
            {upsert : true , new : true });
            
            return res.status(200).json({
                link : hash
            }); 

        }else{
            await LinkModel.deleteOne({
                userId : userId
            });
            return res.status(200).json({
                message : "Sharing disabled"
            });
        }
    }catch(e){
        return res.status(404).json({
            Error : e
        });
    }
    
});

Router.get("/:shareLink" , async(req,res) => { 
    const hash = req.params.shareLink;
    try{

        const link = await LinkModel.findOne({
         hash : hash
        });
        if(!link){
            return res.status(500).json({
                message : "Someting went wrong!"
            })
        }
        const contents = await ContentModel.find({
            userId : link.userId!
        });
        res.json({
            contents : contents
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : "Oops!Link not found!"
        }); 
    }
    
});

export default Router;