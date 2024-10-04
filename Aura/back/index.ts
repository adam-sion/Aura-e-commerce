import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(express.json());
 app.use(cors());

// mongoose.connect(
//     "mongodb+srv://adamsion:12345@cluster0.rmtpv.mongodb.net/aura-Ecommerce")
//   .then(() => {
//     console.log("Connected to MongoDB Atlas");
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB", err);
//   });

app.get('/', (req:Request, res:Response)=> {
    res.send('Hello from server');
})

app.listen(port, ()=> {
    console.log(`⚡server is fire at http://localhost:${port}`)
})