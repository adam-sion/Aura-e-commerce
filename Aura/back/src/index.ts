import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source"; // Import your data source
import { APIRouter } from "./routes/api";
import { AUTHRouter } from "./routes/auth";
import { errorHandler } from "./middlewares/error.middleware";


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
    try {
        await AppDataSource.initialize();
        console.log("Database connection established.");
    } catch (error) {
        console.error("Error during Data Source initialization", error);
        throw error; 
    }
};


export default async (req: Request, res: Response) => {
    
    if (process.env.NODE_ENV === "production") {
        // await initializeDatabase();
    }
    app(req, res);
};

if (process.env.NODE_ENV !== "production") {
    app.listen(port, async () => {
        await initializeDatabase();
        console.log(`⚡ Server is running at http://localhost:${port}`);
    });
}
