import { ICreateGraduationDTO, IGraduationDTO } from "@/interfaces/IGraduation";
import { GraduationRepository } from "@/repositories/graduation";
import { ServiceAddGraduation } from "@/services/graduation/add";
import { ServiceGetAllGraduations } from "@/services/graduation/getAll";
import { ServiceUpdateGraduation } from "@/services/graduation/update";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const graduationRepository = new GraduationRepository();
    const serviceGetAllGraduations = new ServiceGetAllGraduations(
      graduationRepository
    );

    const graduations = await serviceGetAllGraduations.execute();

    return NextResponse.json({ success: true, graduations }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const data: ICreateGraduationDTO = await req.json();

    const graduationRepository = new GraduationRepository();
    const serviceAddGraduation = new ServiceAddGraduation(graduationRepository);

    await serviceAddGraduation.execute(data);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const data: IGraduationDTO = await req.json();

    const graduationRepository = new GraduationRepository();
    const serviceUpdateGraduation = new ServiceUpdateGraduation(
      graduationRepository
    );

    await serviceUpdateGraduation.execute(data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
};
