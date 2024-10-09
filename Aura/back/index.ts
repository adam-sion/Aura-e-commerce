import express, { Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { APIRouter } from "./routes/api";



const main = async ()=> {

const app = express();
const port = 3000;
    app.use(express.json());
    app.use(cors());
    
     app.listen(port, () => {
          console.log(`⚡ Server is running at http://localhost:${port}`);
        });
    
    app.use('', APIRouter);
}

AppDataSource.initialize()
    .then(()=> {
        main();
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


