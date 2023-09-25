import {
  ICreateMilitaryDTO,
  IMilitaryDTO,
  IMilitaryRepositoryDTO,
} from "@/interfaces/IMilitary";
import db from "@/lib/prismaClient";

export class MilitaryRepository implements IMilitaryRepositoryDTO {
  add = async (data: ICreateMilitaryDTO): Promise<IMilitaryDTO> => {
    return await db.military.create({ data });
  };

  getAll = async (): Promise<IMilitaryDTO[]> => {
    return await db.military.findMany({
      include: {
        graduation: true,
      },
      orderBy: [
        {
          graduation: {
            order: "asc",
          },
        },
        {
          name: "asc",
        },
      ],
    });
  };

  getById = async (id: string): Promise<IMilitaryDTO | null> => {
    return await db.military.findFirst({ where: { id } });
  };

  getByRg = async (rg: number): Promise<IMilitaryDTO | null> => {
    return await db.military.findUnique({ where: { rg } });
  };

  getByName = async (name: string): Promise<IMilitaryDTO | null> => {
    return await db.military.findUnique({ where: { name } });
  };

  update = async (data: IMilitaryDTO): Promise<IMilitaryDTO> => {
    return await db.military.update({
      where: { id: data.id },
      data: {
        graduationId: data.graduationId,
        rg: data.rg,
        name: data.name,
      },
    });
  };

  delete = async (id: string): Promise<void> => {
    await db.military.delete({ where: { id } });
  };
}
