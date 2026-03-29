import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
import cors from 'cors'

import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js'
import brainRoutes from './routes/brainRoutes.js'


app.use(express.json());
app.use(cors());

app.use("/api/v1/auth" , authRoutes);//AUTH ENDPOINTS

app.use("/api/v1/content" , contentRoutes);//CRUD ENPOINTS

app.use("/api/v1/brain" , brainRoutes);// SHARE ENDPOINTS

app.listen(3000, async() => {
  await mongoose.connect(process.env.DB_LINK);
  console.log('Server listening on http://localhost:3000');
});
