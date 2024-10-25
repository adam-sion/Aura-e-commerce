import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "../src/data-source";
import { APIRouter } from "../src/routes/api";
import { AUTHRouter } from "../src/routes/auth";
import { errorHandler } from "../src/middlewares/error.middleware";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Aura server!');
});

app.use(express.json());
app.use(cors());
app.use('/images', express.static('upload/images')); 

app.use('/api', APIRouter);
app.use('/auth', AUTHRouter);
app.use(errorHandler);


const initializeDatabase = async () => {
    if (!AppDataSource.isInitialized) {
        try {
            await AppDataSource.initialize();
            console.log("Database connection established.");
        } catch (error) {
            console.error("Error during Data Source initialization", error);
            throw error; 
        }
    } else {
        console.log("Database connection already established.");
    }
};


const startServer = async () => {
    await initializeDatabase();
    
    if (process.env.NODE_ENV !== "production") {
        app.listen(port, () => {
            console.log(`⚡ Server is running at http://localhost:${port}`);
        });
    } else {
        app.listen(port, () => {
            console.log(`⚡ Server is running in production mode.`);
        });
    }
};


export default async (req: Request, res: Response) => {
    if (process.env.NODE_ENV === "production") {
        await initializeDatabase();
    }
    app(req, res);
};

if (process.env.NODE_ENV !== "production") {
    startServer();
}
