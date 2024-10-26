import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../errors/BadRequest";
import { StatusCodes } from "http-status-codes";
import multer from "multer";
import fs from 'fs';
import path from 'path';
const port = process.env.PORT||3000;


const storage = multer.memoryStorage();  // Store files in memory
const upload = multer({ storage });  // Set multer storage to memory

// Save file from memory to temporary location if supported
async function saveFileTemporarily(buffer: Buffer, filename: string): Promise<string> {
    const tmpDir = './tmp/images';  // Temporary writable directory in some serverless envs

    // Ensure directory exists
    if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
    }

    const filePath = path.join(tmpDir, filename);
    await fs.promises.writeFile(filePath, buffer);  // Write file to tmp directory

    return filePath;
}

// Updated upload handler
const uploadImageHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.file) {
        throw new BadRequest("No image uploaded");
    }

    try {
        const uniqueFilename = `${req.file.fieldname}_${Date.now()}_${Math.round(Math.random() * 1e9)}${path.extname(req.file.originalname)}`;

        // If your environment allows /tmp usage, save temporarily and send the file path
        const imagePath = await saveFileTemporarily(req.file.buffer, uniqueFilename);

        res.status(StatusCodes.OK).json({
            image_url: `${process.env.SERVER_URL}/images/${uniqueFilename}`
        });
    } catch (error) {
        next(error);
    }
};

export { uploadImageHandler, upload };
