import { Router } from "express";
import { signinHandler, signupHandler } from "../controllers/auth.controller";

export const AUTHRouter = Router();

AUTHRouter.post('/signup', signupHandler);
AUTHRouter.post('/signin', signinHandler)