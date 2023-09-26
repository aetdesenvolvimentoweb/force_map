import { MilitaryRepository } from "@/repositories/military";
import { ServiceChangePassword } from "@/services/military/changePassword";
import { ServiceDeleteMilitary } from "@/services/military/delete";
import { ServiceGetMilitaryById } from "@/services/military/getById";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;

    const militaryRepository = new MilitaryRepository();
    const serviceDeleteMilitary = new ServiceDeleteMilitary(militaryRepository);

    await serviceDeleteMilitary.execute(id);

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

    const militaryRepository = new MilitaryRepository();
    const serviceGetMilitaryById = new ServiceGetMilitaryById(
      militaryRepository
    );

    const military = await serviceGetMilitaryById.execute(id);

    return NextResponse.json({ success: true, military }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const data = await req.json();

    const militaryRepository = new MilitaryRepository();
    const serviceChangePassword = new ServiceChangePassword(militaryRepository);

    await serviceChangePassword.execute({
      id,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
};
