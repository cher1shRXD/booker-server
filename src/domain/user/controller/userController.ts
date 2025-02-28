import {UserService} from "../service/userService.js";
import {Response} from "express";
import {AuthRequest} from "../../../global/middleware/jwtProvider.js";
import {internalServerError, notFoundError} from "../../../global/error/errors.js";
import {CustomException} from "../../../global/error/exceptions.js";

export class UserController {
  private readonly userService: UserService;
  
  constructor() {
    this.userService = new UserService();
  }
  
  public getMe = async (req: AuthRequest, res: Response) => {
    try{
      console.log(req.user);
      if (!req.user) {
        throw CustomException.notFound();
      }
      const user = await this.userService.getMe(req.user);
      
      return res.status(200).json(user);
    }catch(error) {
      const err = error as Error
      if(err.message === "404") {
        return notFoundError(res);
      }
      internalServerError(res, error);
    }
  }
}