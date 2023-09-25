import { IGraduationDTO } from "./IGraduation";

export interface ICreateMilitaryDTO {
  graduationId: string;
  rg: number;
  name: string;
}

export interface IMilitaryDTO extends ICreateMilitaryDTO {
  id: string;
  graduation?: IGraduationDTO;
}

export interface IMilitaryRepositoryDTO {
  add(data: ICreateMilitaryDTO): Promise<IMilitaryDTO>;
  getAll(): Promise<IMilitaryDTO[]>;
  getById(id: string): Promise<IMilitaryDTO | null>;
  getByRg(rg: number): Promise<IMilitaryDTO | null>;
  getByName(name: string): Promise<IMilitaryDTO | null>;
  update(data: IMilitaryDTO): Promise<IMilitaryDTO>;
  delete(id: string): Promise<void>;
}
