import {
  ICreateMilitaryDTO,
  IMilitaryRepositoryDTO,
} from "@/interfaces/IMilitary";
import { ObjectId } from "mongodb";

export class ServiceAddMilitary {
  constructor(private militaryRepository: IMilitaryRepositoryDTO) {}

  public execute = async (data: ICreateMilitaryDTO): Promise<void> => {
    if (!data.graduationId) {
      throw new Error("Informe o identificador da Graduação.");
    }

    if (!ObjectId.isValid(data.graduationId)) {
      throw new Error("Graduação inválida.");
    }

    if (!data.rg) {
      throw new Error("Preencha o campo RG.");
    }

    if (!data.name) {
      throw new Error("Preencha o campo nome.");
    }

    const rgAlreadyRegistered = await this.militaryRepository.getByRg(data.rg);

    if (rgAlreadyRegistered) {
      throw new Error("Já existe um militar cadastrado com esse RG.");
    }

    const nameAlreadyRegistered = await this.militaryRepository.getByName(
      data.name
    );

    if (nameAlreadyRegistered) {
      throw new Error("Já existe um militar cadastrado com esse nome.");
    }

    await this.militaryRepository.add(data);
  };
}
