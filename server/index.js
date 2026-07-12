import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());


app.use('/api',aiRoutes);
app.get('/',(req,res)=>{
    res.send("Backend is Running");
})
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});