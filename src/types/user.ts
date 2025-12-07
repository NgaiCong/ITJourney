import { User as PrismaUser, Role } from '@prisma/client';
import { DefaultSession } from "next-auth";

export type User = PrismaUser;

export interface SafeUser extends Omit<User, 'password'> {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
}

export type UserRole = Role;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"]
  }
}
