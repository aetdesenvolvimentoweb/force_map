import { IMilitaryDTO, IMilitaryRepositoryDTO } from "@/interfaces/IMilitary";

export class ServiceGetAllMilitary {
  constructor(private militaryRepository: IMilitaryRepositoryDTO) {}

  public execute = async (): Promise<IMilitaryDTO[]> => {
    return await this.militaryRepository.getAll();
  };
}
