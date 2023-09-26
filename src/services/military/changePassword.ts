import { IMilitaryRepositoryDTO } from "@/interfaces/IMilitary";
import { comparePassword, hashPassword } from "@/lib/bcrypt";
import { ObjectId } from "mongodb";

interface IData {
  id: string;
  oldPassword: string;
  newPassword: string;
}

export class ServiceChangePassword {
  constructor(private militaryRepository: IMilitaryRepositoryDTO) {}

  public execute = async (data: IData): Promise<void> => {
    if (!data.id) {
      throw new Error("Identificador do militar não encontrado.");
    }

    if (!ObjectId.isValid(data.id)) {
      throw new Error("Identificador do militar inválido.");
    }

    if (!data.oldPassword) {
      throw new Error("Preencha o campo senha antiga.");
    }

    if (!data.newPassword) {
      throw new Error("Preencha o campo nova senha.");
    }

    const militaryExist = await this.militaryRepository.getById(data.id);

    if (!militaryExist) {
      throw new Error("Militar não encontrado.");
    }

    const isValidOldPassword = await comparePassword(
      data.oldPassword,
      militaryExist.password
    );

    if (!isValidOldPassword) {
      throw new Error("Senha antiga inválida.");
    }

    const hashedNewPassword = await hashPassword(data.newPassword);

    await this.militaryRepository.changePassword(data.id, hashedNewPassword);
  };
}
