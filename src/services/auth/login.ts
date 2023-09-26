import { IAuthLoginDTO, IAuthRepositoryDTO } from "@/interfaces/IAuth";
import { IMilitaryRepositoryDTO } from "@/interfaces/IMilitary";
import { comparePassword } from "@/lib/bcrypt";
import { sign } from "jsonwebtoken";

async function getIP() {
  const response = await fetch("https://api.db-ip.com/v2/free/self").then(
    async (res) => await res.json()
  );

  console.log("response getip", response);
  return response.ipAddress;
}

export class ServiceLogin {
  constructor(
    private authRepository: IAuthRepositoryDTO,
    private militaryRepository: IMilitaryRepositoryDTO
  ) {}

  public execute = async (data: IAuthLoginDTO): Promise<void> => {
    if (!data.rg) {
      throw new Error("Preencha o campo RG.");
    }

    if (!data.password) {
      throw new Error("Preencha o campo senha.");
    }

    const militaryExist = await this.militaryRepository.getByRg(data.rg);

    if (!militaryExist) {
      throw new Error("RG/Senha incorretos.");
    }

    const isValidPassword = await comparePassword(
      data.password,
      militaryExist.password
    );

    if (!isValidPassword) {
      throw new Error("RG/Senha incorretos.");
    }

    const expiresIn = new Date(Date.now() + 86400);
    const secret = process.env.AUTH_SECRET;

    if (!secret) {
      throw new Error("Variável de ambiente AUTH_SECRET não encontrada.");
    }

    const sessionToken = sign(
      { militaryId: militaryExist.id, expiresIn },
      secret,
      {
        algorithm: "HS256",
      }
    );

    const ip = await getIP();
    console.log("responseExecute", ip);

    const session = await this.authRepository.login({
      militaryId: militaryExist.id,
      ip,
      sessionToken,
      expires: expiresIn,
    });

    console.log("sessão gravada", session);

    //criar session cookie
  };
}
