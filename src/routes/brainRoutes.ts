import express from "express";
import { authmiddleware } from "../middlewares/auth.js";
const Router = express.Router();

Router.get("/share" , authmiddleware , (req,res)=> {
    res.json({
        message : "/share"
    })
});
Router.get("/:shareLink" , authmiddleware ,(req,res) => {
    res.json({
        message : "/shareLink"
    })
});
export default Router;