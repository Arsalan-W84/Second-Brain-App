import JWT from 'jsonwebtoken' ;

export function authmiddleware(req:any,res:any,next:any) {
  try{
    const token = req.headers.token;
    if(!token){
        return res.status(401).json({
            message : "You are not logged in!"
        });
    }
    const decoded:any = JWT.verify(token , process.env.JWT_SECRET);
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