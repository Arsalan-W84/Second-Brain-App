import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
import cors from 'cors'
import mongoose from 'mongoose';

mongoose.connect(process.env.DB_LINK as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js'
import brainRoutes from './routes/brainRoutes.js'


app.use(express.json());
app.use(cors());

app.use("/api/v1/auth" , authRoutes);//AUTH ENDPOINTS
app.use("/api/v1/content" , contentRoutes);//CRUD ENPOINTS
app.use("/api/v1/brain" , brainRoutes);// SHARE ENDPOINTS


// Only run app.listen() locally
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}


export default app;
