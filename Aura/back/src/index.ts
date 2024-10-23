import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from"dotenv";
import { AppDataSource } from "./data-source";
import { APIRouter } from "./routes/api";
import { AUTHRouter } from "./routes/auth";
import { errorHandler } from "./middlewares/error.middleware";



const main = async ()=> {
dotenv.config();
const app = express();
const port = process.env.PORT||3000;
    app.use(express.json());
    app.use(cors());
    app.use('/images', express.static('upload/images'));
    
     app.listen(port, () => {
          console.log(`⚡ Server is running at http://localhost:${port}`);
        });
    
    app.use('/api', APIRouter);
    app.use('/auth', AUTHRouter);

    app.use(errorHandler);
}

AppDataSource.initialize()
    .then(()=> {
        main();
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


