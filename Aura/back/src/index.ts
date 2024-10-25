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

app.use(express.json());
app.use(cors());
app.use('/images', express.static('upload/images')); // Serve static files


app.use('/api', APIRouter);
app.use('/auth', AUTHRouter);


app.use(errorHandler);


const startServer = async () => {
    try {

        await AppDataSource.initialize();
        console.log("Database connection established.");

        app.listen(port, () => {
            console.log(`⚡ Server is running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error during Data Source initialization", error);
        process.exit(1); 
    }
};


export default async (req: Request, res: Response) => {

    if (process.env.NODE_ENV !== "production") {
        await startServer();
    } else {

        try {
            if (!AppDataSource.isInitialized) {
                await AppDataSource.initialize();
                console.log("Database connection established.");
            }
            app(req, res); 
        } catch (error) {
            console.error("Error during Data Source initialization", error);
            res.status(500).send("Internal Server Error");
        }
    }
};


if (process.env.NODE_ENV !== "production") {
    startServer();
}
