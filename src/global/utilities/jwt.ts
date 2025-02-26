import jwt from "jsonwebtoken";
import "dotenv/config";

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

export const generateToken = (payload: object): TokenResponse => {
  const accessToken = jwt.sign(payload, secretKey, {
    expiresIn: accessTokenExpire,
  });
  const refreshToken = jwt.sign(payload, secretKey, {
    expiresIn: refreshTokenExpire,
  });

  return {
    accessToken,
    refreshToken,
  };
};
