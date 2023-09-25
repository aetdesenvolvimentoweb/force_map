import {
  ICreateGraduationDTO,
  IGraduationDTO,
  IGraduationRepositoryDTO,
} from "@/interfaces/IGraduation";
import db from "@/lib/prismaClient";

export class GraduationRepository implements IGraduationRepositoryDTO {
  add = async (data: ICreateGraduationDTO): Promise<IGraduationDTO> => {
    return await db.graduation.create({ data });
  };

  getAll = async (): Promise<IGraduationDTO[]> => {
    return await db.graduation.findMany({
      orderBy: [
        {
          order: "asc",
        },
        {
          name: "asc",
        },
      ],
    });
  };

  getById = async (id: string): Promise<IGraduationDTO | null> => {
    return await db.graduation.findFirst({ where: { id } });
  };

  getByName = async (name: string): Promise<IGraduationDTO | null> => {
    return await db.graduation.findUnique({ where: { name } });
  };

  update = async (data: IGraduationDTO): Promise<IGraduationDTO> => {
    return await db.graduation.update({
      where: { id: data.id },
      data: {
        name: data.name,
        order: data.order,
      },
    });
  };

  delete = async (id: string): Promise<void> => {
    await db.graduation.delete({ where: { id } });
  };
}
