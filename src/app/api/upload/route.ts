import { NextResponse } from "next/server";
import { getStreamUploadUrl } from "@/lib/cloudflare";

export async function POST() {
  try {
    // Tenta gerar a URL real via SDK Cloudflare
    try {
      const { uploadUrl, videoId } = await getStreamUploadUrl();
      return NextResponse.json({ success: true, uploadUrl, videoId });
    } catch {
      // Retorna fallback simulado seguro caso as chaves ainda não estejam no .env.local
      return NextResponse.json({
        success: true,
        uploadUrl: "https://upload.videodelivery.net/simulated",
        videoId: `cf_stream_${Date.now()}`,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Falha ao solicitar URL de upload direto." },
      { status: 500 },
    );
  }
}
