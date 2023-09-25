import {
  ICreateGraduationDTO,
  IGraduationRepositoryDTO,
} from "@/interfaces/IGraduation";

export class ServiceAddGraduation {
  constructor(private graduationRepository: IGraduationRepositoryDTO) {}

  public execute = async (data: ICreateGraduationDTO): Promise<void> => {
    if (!data.name) {
      throw new Error("Preencha o campo nome.");
    }

    if (!data.order) {
      throw new Error("Preencha o campo ordem.");
    }

    const nameAlreadyRegistered = await this.graduationRepository.getByName(
      data.name
    );

    if (nameAlreadyRegistered) {
      throw new Error("Já existe uma graduação registrada com esse nome.");
    }

    await this.graduationRepository.add(data);
  };
}
