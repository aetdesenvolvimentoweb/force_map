import {
  IGraduationDTO,
  IGraduationRepositoryDTO,
} from "@/interfaces/IGraduation";
import { ObjectId } from "mongodb";

export class ServiceUpdateGraduation {
  constructor(private graduationRepository: IGraduationRepositoryDTO) {}

  public execute = async (data: IGraduationDTO): Promise<void> => {
    if (!data.id) {
      throw new Error("Identificador da graduação não encontrado.");
    }

    if (!ObjectId.isValid(data.id)) {
      throw new Error("Identificador da graduação inválido.");
    }

    if (!data.name) {
      throw new Error("Preencha o campo nome.");
    }

    if (!data.order) {
      throw new Error("Preencha o campo ordem.");
    }

    const graduationExist = await this.graduationRepository.getById(data.id);

    if (!graduationExist) {
      throw new Error("Graduação não encontrada.");
    }

    const nameAlreadyRegistered = await this.graduationRepository.getByName(
      data.name
    );

    if (nameAlreadyRegistered && nameAlreadyRegistered.id !== data.id) {
      throw new Error("Já existe uma graduação registrada com esse nome.");
    }

    await this.graduationRepository.update(data);
  };
}
