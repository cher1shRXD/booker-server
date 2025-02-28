import { Request } from 'express';

export interface ReissueRequest extends Request {
  body: {
    refreshToken: string;
  }
}