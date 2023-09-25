import { IGraduationRepositoryDTO } from "@/interfaces/IGraduation";
import { ObjectId } from "mongodb";

export class ServiceDeleteGraduation {
  constructor(private graduationRepository: IGraduationRepositoryDTO) {}

  public execute = async (id: string): Promise<void> => {
    if (!id) {
      throw new Error("Identificador da graduação não foi encontrado.");
    }

    if (!ObjectId.isValid(id)) {
      throw new Error("Identificador da graduação inválido.");
    }

    await this.graduationRepository.delete(id);
  };
}
