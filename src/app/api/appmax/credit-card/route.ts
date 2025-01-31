import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = "https://admin.appmax.com.br/api/v3/tokenize/card";
    const data = {
      "access-token": process.env.APPMAX_API_KEY,
      card: body,
    };
    const response = await axios.post(url, data);

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data || "Error processing request" },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
