import {
  IGraduationDTO,
  IGraduationRepositoryDTO,
} from "@/interfaces/IGraduation";
import { ObjectId } from "mongodb";

export class ServiceGetGraduationById {
  constructor(private graduationRepository: IGraduationRepositoryDTO) {}

  public execute = async (id: string): Promise<IGraduationDTO> => {
    if (!id) {
      throw new Error("Identificador da graduação não foi encontrado.");
    }

    if (!ObjectId.isValid(id)) {
      throw new Error("Identificador da graduação inválido.");
    }

    const graduation = await this.graduationRepository.getById(id);

    if (!graduation) {
      throw new Error("Graduação não encontrada.");
    }

    return graduation;
  };
}
