import { GraduationRepository } from "@/repositories/graduation";
import { ServiceDeleteGraduation } from "@/services/graduation/delete";
import { ServiceGetGraduationById } from "@/services/graduation/getById";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;

    const graduationRepository = new GraduationRepository();
    const serviceDeleteGraduation = new ServiceDeleteGraduation(
      graduationRepository
    );

    await serviceDeleteGraduation.execute(id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;

    const graduationRepository = new GraduationRepository();
    const serviceGetGraduationById = new ServiceGetGraduationById(
      graduationRepository
    );

    const graduation = await serviceGetGraduationById.execute(id);

    return NextResponse.json({ success: true, graduation }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
};
