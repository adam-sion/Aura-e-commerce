import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

 app.listen(port, () => {
      console.log(`⚡ Server is running at http://localhost:${port}`);
    });

app.get('/', (req: Request, res: Response) => {
    
  res.send('Hello from the server');
});

