import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{ params }: { params: { id: string } }) {
    const searchParams = request.nextUrl.searchParams;
  try {
    const key = searchParams.get("key");

    if (typeof key === "string"  && key  == 'mypassword' ) {
        setCookie("key", key , { cookies });
        setCookie("url", 'http://localhost:3000' , { cookies });
        return NextResponse.json({message:"WebSocket подключен", key})
    } else {
      return new Response("Не верный ключ", { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return new Response(`Произошла ошибка ${error}`, { status: 500 });
  }
}
