import {LibraryService} from "../service/libraryService.js";
import {AuthRequest} from "../../../global/middleware/jwtProvider.js";
import {Response} from "express";
import {internalServerError, notFoundError} from "../../../global/error/errors.js";
import {CustomException} from "../../../global/error/exceptions.js";

export class LibraryController {
  private readonly libraryService;
  
  constructor() {
    this.libraryService = new LibraryService()
  }
  
  public getMyLibrary = async (req: AuthRequest, res: Response) => {
    try{
      if(!req.user){
        throw CustomException.notFound();
      }
      const library = await this.libraryService.getMyLibrary(req.user);
      res.status(200).send(library);
    }catch(error){
      const err = error as Error
      if(err.message === "404") {
        return notFoundError(res);
      }
      return internalServerError(res, error);
    }
  }
}