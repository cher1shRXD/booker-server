import { Response } from "express";
import { AuthService } from "../service/authService.js";
import { SignupRequest } from "../dto/request/signupRequest.js";
import { conflictError, internalServerError, notFoundError, unauthorizedError } from "../../../global/error/errors.js";
import { LoginRequest } from "../dto/request/loginRequest.js";
import { ReissueRequest } from "../dto/request/reissueRequest.js";

export class AuthController {
  private readonly authService: AuthService;
  
  constructor() {
    this.authService = new AuthService();
  }
  
  public signup = async (req: SignupRequest, res: Response) => {
    const { username, password } = req.body;
    
    try {
      const token = await this.authService.signup(username, password);
      return res.status(201).json(token);
    } catch (error) {
      const err = error as Error
      if (err.message === "409") {
        return conflictError(res);
      }
      return internalServerError(res, error);
    }
  };
  
  public login = async (req: LoginRequest, res: Response) => {
    const { username, password } = req.body;
    
    try {
      const token = await this.authService.login(username, password);
      return res.status(200).json(token);
    } catch (error) {
      const err = error as Error
      if (err.message === "404") {
        return notFoundError(res);
      }
      if (err.message === "401") {
        return unauthorizedError(res);
      }
      return internalServerError(res, error);
    }
  };
  
  public reissue = async (req: ReissueRequest, res: Response) => {
    const { refreshToken } = req.body;
    
    try {
      const token = await this.authService.reissue(refreshToken);
      return res.status(200).json(token);
    } catch (error) {
      const err = error as Error
      if (err.message === "404") {
        return notFoundError(res);
      }
      return internalServerError(res, error);
    }
  };
}
