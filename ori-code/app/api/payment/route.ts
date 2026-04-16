import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { archetype_id } = body;

    // MOCK: Simulando delay da API de pagamento (PushinPay)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Usando a API nativa do Node/Browser para gerar o ID, zero dependências externas
    const paymentId = crypto.randomUUID();

    // MOCK: Dados de pagamento fake
    const paymentData = {
      payment_id: paymentId,
      archetype_id: archetype_id,
      pix_code: "00020101021226870014br.gov.bcb.pix256569614-490-ori-code-fake-pix",
      qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=fake_pix_ori_code", // QR Code gerado na hora
      amount: "R$ 4,90"
    };

    return NextResponse.json(paymentData);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao gerar pagamento" }, { status: 500 });
  }
}