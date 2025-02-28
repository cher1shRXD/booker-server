import jwt from "jsonwebtoken";
import "dotenv/config";
import {redisClient} from "../database/redis.js";

const secretKey = process.env.JWT_SECRET || "testsecretkey";

const accessTokenExpire = process.env.JWT_ACCESS_TOKEN_EXPIRE
  ? parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRE)
  : 60;
const refreshTokenExpire = process.env.JWT_REFRESH_TOKEN_EXPIRE
  ? parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRE)
  : 60;

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const generateToken = async (payload: string): Promise<TokenResponse> => {
  const accessToken = jwt.sign({ username: payload }, secretKey, {
    expiresIn: accessTokenExpire,
  });
  const refreshToken = jwt.sign({ username: payload }, secretKey, {
    expiresIn: refreshTokenExpire,
  });

  await redisClient.set(refreshToken, payload);
  
  return {
    accessToken,
    refreshToken,
  };
};
