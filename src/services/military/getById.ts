import { IMilitaryDTO, IMilitaryRepositoryDTO } from "@/interfaces/IMilitary";
import { ObjectId } from "mongodb";

export class ServiceGetMilitaryById {
  constructor(private militaryRepository: IMilitaryRepositoryDTO) {}

  public execute = async (id: string): Promise<IMilitaryDTO> => {
    if (!id) {
      throw new Error("Identificador do militar não foi encontrado.");
    }

    if (!ObjectId.isValid(id)) {
      throw new Error("Identificador do militar inválido.");
    }

    const military = await this.militaryRepository.getById(id);

    if (!military) {
      throw new Error("Militar não encontrado.");
    }

    return military;
  };
}
