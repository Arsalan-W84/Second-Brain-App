import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {type : String , required:true},
    password : {type : String , required:true}
});

const ContentSchema = new Schema({
    link : String,
    type : {type : String, enum:['image' , 'video' , 'article' , 'tweet' , 'reel']} ,
    title: String,
    tags:  [{type : Schema.Types.ObjectId , ref : 'Tag' } ],
    userId : {type : Schema.Types.ObjectId , ref : 'User' } 
})

const TagSchema = new Schema({
    title : String
});

const LinkSchema = new Schema({
    hash : String,
    userId : {type : Schema.Types.ObjectId , ref : 'User' , required:true}
});


export const UserModel = mongoose.model('User' , UserSchema);
export const ContentModel = mongoose.model('Content' , ContentSchema);
export const TagModel = mongoose.model('Tag' , TagSchema);
export const LinkModel =mongoose.model('Links' , LinkSchema);




