import express from "express";
import { authmiddleware } from "../middlewares/auth.js";
const Router = express.Router();


Router.post("/" , authmiddleware , (req,res) => {
    return res.json({
        message :  "content post"
    });
});
Router.get("/" , authmiddleware ,  (req,res) => {
    return res.json({
        message :  "content get"
    });    
});
Router.delete("/" , authmiddleware ,(req,res) => {
    return res.json({
        message :  "content delete"
    });
});
export default Router;