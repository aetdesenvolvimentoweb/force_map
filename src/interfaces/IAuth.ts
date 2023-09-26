import { IMilitaryDTO } from "./IMilitary";

export interface IAuthLoginDTO {
  rg: number;
  password: string;
}

export interface IAuthCreateSessionDTO {
  militaryId: string;
  ip: string;
  sessionToken: string;
  expires: Date;
}

export interface IAuthSessionDTO extends IAuthCreateSessionDTO {
  id: string;
  military?: IMilitaryDTO;
}

export interface IAuthRepositoryDTO {
  login(data: IAuthCreateSessionDTO): Promise<IAuthSessionDTO>;
  verifySession(sessionId: string): Promise<IAuthSessionDTO | null>;
  logout(sessionId: string): Promise<void>;
}
