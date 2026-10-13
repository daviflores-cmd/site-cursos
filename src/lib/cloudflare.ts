const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

/**
 * Solicita à Cloudflare uma URL de Direct Upload para envio do vídeo direto do navegador
 */
export async function getStreamUploadUrl() {
  if (!ACCOUNT_ID || !API_TOKEN) {
    throw new Error("Credenciais da Cloudflare não configuradas no .env.local");
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/stream/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        maxDurationSeconds: 14400, // Limite máximo de 4 horas por aula
        requireSignedURLs: true, // Segurança de reprodução
      }),
    },
  );

  const data = await response.json();

  if (!data.success) {
    throw new Error(
      `Erro na API Cloudflare Stream: ${JSON.stringify(data.errors)}`,
    );
  }

  return {
    uploadUrl: data.result.uploadURL,
    videoId: data.result.uid,
  };
}
