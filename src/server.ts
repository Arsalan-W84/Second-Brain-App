import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import JWT from 'jsonwebtoken' ;
const  JWT_SECRET = "RFVASVMKKIGVDE567789JKHB" ;
import mongoose from 'mongoose';
import {safeParse, z,} from 'zod';
import {UserModel} from './schema.js'
import  bcrypt  from 'bcrypt'
const app = express();

//Zod object
const ValidUser = z.object({
      username : z.string().min(3).max(15) , 
      password : z.string().min(6).max(15)
    });


function authmiddleware(req:any,res:any,next:any) {
  try{
    const token = req.headers.token;
    if(!token){
        return res.status(401).json({
            message : "You are not logged in!"
        });
    }
    const decoded:any = JWT.verify(token , JWT_SECRET);
    if(decoded) {
      req.userId = decoded._id
      next();
    }
  }catch(e){
    return res.status(401).json({
      error : "Invalid or expired token"
    })
  } 
}

app.use(express.json());

//---------------LOGIN ENDPOINTS-------------
app.post("/api/v1/signup"  , async(req,res) => {
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

app.post("/api/v1/signin"  , async(req,res)=> {
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
              const token = JWT.sign({_id : foundUser._id} , JWT_SECRET);
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
    return res.json({
      error : e
    })
  }
});
//---------------------------------------------



//-------------CRUD ENPOINTS-----------------
app.post("/api/v1/content"  , authmiddleware ,  (req,res)=> {
  return res.json({
    message : "POST CONTENT ENDPOINT"
  });
});
app.get("/api/v1/content" , authmiddleware , (req,res)=> {});
app.delete("/api/v1/content" , authmiddleware , (req,res)=> {});

//--------------SHARE ENDPOINTS---------------
app.get("/api/v1/brain/share" , (req,res)=>{});
app.get("/api/v1/brain/:shareLink" , (req,res)=> {});

app.listen(3000, async() => {
  await mongoose.connect("mongodb+srv://arsalanwahid0804_db_user:C5S9Z6oTDJ2r3y5H@cluster0.mckhh0n.mongodb.net/");
  console.log('Server listening on http://localhost:3000');
});
