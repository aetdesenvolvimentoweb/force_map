import { IMilitaryDTO, IMilitaryRepositoryDTO } from "@/interfaces/IMilitary";
import { ObjectId } from "mongodb";

export class ServiceUpdateMilitary {
  constructor(private militaryRepository: IMilitaryRepositoryDTO) {}

  public execute = async (data: IMilitaryDTO): Promise<void> => {
    if (data.id) {
      throw new Error("Identificador do militar não encontrado.");
    }

    if (!ObjectId.isValid(data.id)) {
      throw new Error("Identificador do militar inválido.");
    }

    if (!data.graduationId) {
      throw new Error("Preencha o campo graduação.");
    }

    if (!ObjectId.isValid(data.graduationId)) {
      throw new Error("Identificador da graduação inválido.");
    }

    if (!data.rg) {
      throw new Error("Preencha o campo RG.");
    }

    if (!data.name) {
      throw new Error("Preencha o campo nome.");
    }

    const rgAlreadyRegistered = await this.militaryRepository.getByRg(data.rg);

    if (rgAlreadyRegistered && rgAlreadyRegistered.id !== data.id) {
      throw new Error("Já existe um militar cadastrado com esse RG.");
    }

    const nameAlreadyRegistered = await this.militaryRepository.getByName(
      data.name
    );

    if (nameAlreadyRegistered && nameAlreadyRegistered.id !== data.id) {
      throw new Error("Já existe um militar cadastrado com esse nome.");
    }

    await this.militaryRepository.update(data);
  };
}
