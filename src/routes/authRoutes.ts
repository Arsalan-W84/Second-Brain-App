import express from "express"
import z from "zod"
import { UserModel } from "../schema.js";
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
// const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();


const ValidUser = z.object({
      username : z.string().min(3).max(15) , 
      password : z.string().min(6).max(15)
    });


router.post("/signup" , async(req,res) => {
    const {username , password} = req.body;
    
        //ZOD Validation 
        //parse input with Zod type
        const result = ValidUser.safeParse({username : username , password : password});
    
        if(result.success){
          //hit the DB to check if user exists or not
          const foundUser = await UserModel.findOne({username : username});
          if(foundUser){ // this user exists in the database
            return res.status(409).json({
              message : "User ALready exists"
            })
          }else{//user not found in the database
    
            const hashedPassword = await bcrypt.hash(password , 10);
            await UserModel.create({
              username : username , 
              password : hashedPassword 
            });
            return res.json({
              message : "Signed Up Successfully!"
            })
          }
        }else{ // zod validation error
            return res.status(400).json({
              error : result.error.format()
            })
        }
});

router.post("/login" , async(req,res) => {
    try {
    
        const {username , password} = req.body;
        const result = ValidUser.safeParse({username : username , password : password});
        if(result.success)
        {
            const foundUser = await UserModel.findOne({username : username});
            if(foundUser){//user exists
                //check if password entered is correct
                const correct = await bcrypt.compare(password  , foundUser.password);
                //if correct == true , sign a jwt token and return it in a header
                if(correct == true) {
                  const token = JWT.sign({_id : foundUser._id} , process.env.JWT_SECRET);
                  return res.status(200).json({
                    token : token
                  })
                }else {
                  return res.status(401).json({
                    message : "Incorrect username or password!"
                  });
                }
                
            }else {//user dosen't exist
              
              return res.status(401).json({
                message : "Incorrect username or password!"
              });
            }
    
        }
        else
        {
          return res.status(400).json({
              error : result.error.format()
          })
        }
      }catch(e){//bcrypt or mongodb errors
        return res.status(501).json({
          error : e
        })
      }
});

export default router;