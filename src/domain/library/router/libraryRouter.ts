import express from "express";
import {LibraryController} from "../controller/libraryController.js";
import {jwtProvider} from "../../../global/middleware/jwtProvider.js";

const libraryRouter =  express.Router();
const controller = new LibraryController();

libraryRouter.get('/library/my', jwtProvider, async (req, res) => {
  await controller.getMyLibrary(req, res);
});

export default libraryRouter;
