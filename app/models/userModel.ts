import { IRootModel } from "./rootModel";

export interface IUserModel extends IRootModel {
  userId: string;
  userName: string;
  userPassword: string;
  userContact: string;
  userRole: "SuperAdmin" | "Admin" | "User";
  userLevel: "Silver" | "Gold" | "Platinum";
}

export interface IUserUpdateRequestModel {
  userId: string;
  userName?: string;
  userContact?: string;
  userPassword?: string;
  userRole?: "SuperAdmin" | "Admin" | "User";
  userLevel?: "Silver" | "Gold" | "Platinum";
}

export interface IUserCreateRequestModel {
  userName: string;
  userContact: string;
  userPassword: string;
  userRole: "SuperAdmin" | "Admin" | "User";
  userLevel: "Silver" | "Gold" | "Platinum";
}

export interface IUserLoginRequestModel {
  userName: string;
  userPassword: string;
}
