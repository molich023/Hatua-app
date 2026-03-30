import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { phone, amount, userId } = await req.json();

  // 1. Get Access Token from Safaricom
  const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
  
  const tokenRes = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
    headers: { Authorization: `Basic ${auth}` }
  });
  const { access_token } = await tokenRes.json();

  // 2. Generate Timestamp and Password
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

  // 3. Initiate STK Push
  const stkRes = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/mpesa/callback`,
      AccountReference: `HATUA-SIMBA-${userId}`,
      TransactionDesc: "Upgrade to Simba Tier"
    }),
  });

  return NextResponse.json(await stkRes.json());
}
