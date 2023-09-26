import {
  IAuthCreateSessionDTO,
  IAuthRepositoryDTO,
  IAuthSessionDTO,
} from "@/interfaces/IAuth";
import db from "@/lib/prismaClient";

export class AuthRepository implements IAuthRepositoryDTO {
  login = async (data: IAuthCreateSessionDTO): Promise<IAuthSessionDTO> => {
    return await db.session.upsert({
      where: {
        militaryId: data.militaryId,
      },
      update: {
        militaryId: data.militaryId,
        ip: data.ip,
        sessionToken: data.sessionToken,
        expires: data.expires,
      },
      create: {
        militaryId: data.militaryId,
        ip: data.ip,
        sessionToken: data.sessionToken,
        expires: data.expires,
      },
    });
  };

  verifySession = async (
    sessionId: string
  ): Promise<IAuthSessionDTO | null> => {
    return await db.session.findFirst({
      where: { id: sessionId },
      include: {
        military: {
          include: {
            graduation: true,
          },
        },
      },
    });
  };

  logout = async (sessionId: string): Promise<void> => {
    await db.session.delete({ where: { id: sessionId } });
  };
}
