import {
  IGraduationDTO,
  IGraduationRepositoryDTO,
} from "@/interfaces/IGraduation";

export class ServiceGetAllGraduations {
  constructor(private graduationRepository: IGraduationRepositoryDTO) {}

  public execute = async (): Promise<IGraduationDTO[]> => {
    return await this.graduationRepository.getAll();
  };
}
