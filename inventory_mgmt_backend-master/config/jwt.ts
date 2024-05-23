import jwt, { Secret } from "jsonwebtoken";
import User from "../model/user";
import dotenv from "dotenv";

dotenv.config();

interface DecodedToken {
  userId: string;
}

function generateAccessToken(userId: string) {
  console.log("Generating access token");
  const expiresIn = "1d";
  const payload = userId;
  const secret = process.env.JWT_SECRET_access;
  if (!secret) {
    throw new Error("JWT secret is not defined");
  }
  return jwt.sign(payload, secret as Secret, { expiresIn });
}

function verifyAccessToken(token: string, userID: string) {
  return jwt.verify(
    token,
    process.env.JWT_SECRET_access as Secret,
    (err, decoded) => {
      if (err) {
        console.log(err);
        return false;
      }
      if ((decoded as DecodedToken).userId == userID) {
        return true;
      }
      return false;
    }
  );
}

export { generateAccessToken, verifyAccessToken };
