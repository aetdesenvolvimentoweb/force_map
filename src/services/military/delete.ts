import { IMilitaryRepositoryDTO } from "@/interfaces/IMilitary";
import { ObjectId } from "mongodb";

export class ServiceDeleteMilitary {
  constructor(private militaryRepository: IMilitaryRepositoryDTO) {}

  public execute = async (id: string): Promise<void> => {
    if (!id) {
      throw new Error("Identificador do militar não foi encontrado.");
    }

    if (!ObjectId.isValid(id)) {
      throw new Error("Identificador do militar inválido.");
    }

    await this.militaryRepository.delete(id);
  };
}
