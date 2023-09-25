export interface ICreateGraduationDTO {
  order: number;
  name: string;
}

export interface IGraduationDTO extends ICreateGraduationDTO {
  id: string;
}

export interface IGraduationRepositoryDTO {
  add(data: ICreateGraduationDTO): Promise<IGraduationDTO>;
  getAll(): Promise<IGraduationDTO[]>;
  getById(id: string): Promise<IGraduationDTO | null>;
  getByName(name: string): Promise<IGraduationDTO | null>;
  update(data: IGraduationDTO): Promise<IGraduationDTO>;
  delete(id: string): Promise<void>;
}
