import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { signin, signup } from "../services/customer.service";
import { ExistsError } from "../errors/ExistsError";


const signupHandler = async (req:Request, res:Response, next:NextFunction)=> {
    try {
      await signup(req.body);
     res.status(StatusCodes.OK).json('You have successfully signed up')
    
    } catch (error:any)  {
        if (error instanceof ExistsError) {
            next(error);
        } else {
         next(new Error("couldn't sign up"));
        }
    }
}

const signinHandler = async (req:Request, res:Response, next:NextFunction)=> {
    try {
     const data = await signin(req.body);
     res.status(StatusCodes.OK).json(data);
    } catch (error:any) {
        if (error instanceof ExistsError) {
            next(error);
        } else {
         next(new Error("couldn't sign in"));
        }
    }
}

export {signupHandler, signinHandler}