import { IRootModel } from "./rootModel";

export interface IUserKycModel extends IRootModel {
  userKycId: number;
  userKycUserId: number;
  userKycKtpImage: string;
  userKycSelfieImage: string;
  userKycRealName: string;
  userKycAddress: string;
  userKycDateOfBirth: Date;
}
