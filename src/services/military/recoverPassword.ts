import { IMilitaryRepositoryDTO } from "@/interfaces/IMilitary";
import { hashPassword } from "@/lib/bcrypt";

interface IData {
  rg: number;
}

export class ServiceRecoveryPassword {
  constructor(private militaryRepository: IMilitaryRepositoryDTO) {}

  public execute = async (data: IData): Promise<void> => {
    if (!data.rg) {
      throw new Error("Preencha o campo RG.");
    }

    const militaryExist = await this.militaryRepository.getByRg(data.rg);

    if (!militaryExist) {
      throw new Error("Militar não encontrado.");
    }

    const newPassword = await hashPassword("12345678");

    await this.militaryRepository.recoveryPassword(data.rg, newPassword);
  };
}
