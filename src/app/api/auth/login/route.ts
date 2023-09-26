import { IAuthLoginDTO } from "@/interfaces/IAuth";
import { AuthRepository } from "@/repositories/auth";
import { MilitaryRepository } from "@/repositories/military";
import { ServiceLogin } from "@/services/auth/login";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data: IAuthLoginDTO = await req.json();

    const authRepository = new AuthRepository();
    const militaryRepository = new MilitaryRepository();
    const serviceLogin = new ServiceLogin(authRepository, militaryRepository);

    const token = await serviceLogin.execute(data);

    return NextResponse.json({ success: true, token }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 401 }
    );
  }
};
