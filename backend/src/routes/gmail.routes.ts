import { Router } from "express";

import {
  gmailAuthURLController,
  googleCallbackHandler,
} from "../controllers/gmail.controller";

const gmailRouter = Router();

gmailRouter.get("/auth", gmailAuthURLController);
gmailRouter.get("/callback", googleCallbackHandler);

export default gmailRouter;
