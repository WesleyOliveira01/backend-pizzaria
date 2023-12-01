import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { db } from "../prisma/DbConnect";

type authData = {
  email: string;
  password: string;
};

class AuthService {
  static async execute({ email, password }: authData) {
    if (!email) throw new Error("E-mail is required");
    if (!password) throw new Error("Password is required");

    const user = await db.user.findFirst({ where: { email } });
    if (!user) throw new Error("E-mail/password invalid");
    const validatePassword = await compare(password, user.password);
    if (!validatePassword) throw new Error("E-mail/password invalid");

    const token = sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
        subject: user.id,
      }
    );

    return {
        name:user.name,
        email:user.email,
        token
    }
  }
}

export {AuthService}