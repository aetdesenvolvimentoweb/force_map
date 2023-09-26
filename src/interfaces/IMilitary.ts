import { IGraduationDTO } from "./IGraduation";

export interface ICreateMilitaryDTO {
  graduationId: string;
  rg: number;
  name: string;
  password: string;
}

export interface IMilitaryDTO extends ICreateMilitaryDTO {
  id: string;
  graduation?: IGraduationDTO;
}

export interface IMilitaryPublicDTO {
  graduationId: string;
  rg: number;
  name: string;
  graduation: IGraduationDTO;
}

export interface IMilitaryRepositoryDTO {
  add(data: ICreateMilitaryDTO): Promise<IMilitaryDTO>;
  getAll(): Promise<IMilitaryDTO[]>;
  getById(id: string): Promise<IMilitaryDTO | null>;
  getByRg(rg: number): Promise<IMilitaryDTO | null>;
  getByName(name: string): Promise<IMilitaryDTO | null>;
  update(data: IMilitaryDTO): Promise<IMilitaryDTO>;
  changePassword(id: string, newPassword: string): Promise<void>;
  recoveryPassword(rg: number, newPassword: string): Promise<void>;
  delete(id: string): Promise<void>;
}
