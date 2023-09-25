import { ICreateMilitaryDTO, IMilitaryDTO } from "@/interfaces/IMilitary";
import { MilitaryRepository } from "@/repositories/military";
import { ServiceAddMilitary } from "@/services/military/add";
import { ServiceGetAllMilitary } from "@/services/military/getAll";
import { ServiceUpdateMilitary } from "@/services/military/update";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const militaryRepository = new MilitaryRepository();
    const serviceGetAllMilitary = new ServiceGetAllMilitary(militaryRepository);

    const military = await serviceGetAllMilitary.execute();

    return NextResponse.json({ success: true, military }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const data: ICreateMilitaryDTO = await req.json();

    const militaryRepository = new MilitaryRepository();
    const serviceAddMilitary = new ServiceAddMilitary(militaryRepository);

    await serviceAddMilitary.execute(data);

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
    const data: IMilitaryDTO = await req.json();

    const militaryRepository = new MilitaryRepository();
    const serviceUpdateMilitary = new ServiceUpdateMilitary(militaryRepository);

    await serviceUpdateMilitary.execute(data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
};
