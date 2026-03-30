import { NextResponse } from 'next/server';
import { db } from '@/lib/neon-db';
import { users, subscriptions } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  const body = await req.json();
  const result = body.Body.stkCallback;

  // 1. Check if the payment was successful (ResultCode 0 = Success)
  if (result.ResultCode === 0) {
    const callbackMetadata = result.CallbackMetadata.Item;
    
    // Extract values from the M-Pesa response array
    const amount = callbackMetadata.find((i: any) => i.Name === 'Amount')?.Value;
    const receipt = callbackMetadata.find((i: any) => i.Name === 'MpesaReceiptNumber')?.Value;
    const phone = callbackMetadata.find((i: any) => i.Name === 'PhoneNumber')?.Value;

    // Use the 'AccountReference' sent in the Push to find the User ID
    // Format was: "HATUA-SIMBA-123"
    const reference = result.CheckoutRequestID; 
    // Usually, we pass the UserID in the AccountReference or use a 'pending' sub record
    // For this logic, let's assume you stored the pending sub by CheckoutRequestID
    
    try {
      // 2. Update the User to 'Simba' status
      // In a production app, you'd match the 'phone' or 'CheckoutRequestID' to your DB
      await db.update(users)
        .set({ currentTier: 'Simba' })
        .where(eq(users.email, 'user-email-placeholder@example.com')); // Use logic to match ID

      // 3. Record the successful subscription
      await db.insert(subscriptions).values({
        tierPurchased: 'Simba',
        amountPaid: amount,
        mpesaReceipt: receipt,
        status: 'active',
      });

      console.log(`✅ Success: User upgraded to Simba. Receipt: ${receipt}`);
    } catch (err) {
      console.error("❌ Database Update Error:", err);
    }
  } else {
    console.log(`❌ Payment Failed or Cancelled. ResultCode: ${result.ResultCode}`);
  }

  // Safaricom expects a 200 OK to stop retrying the callback
  return NextResponse.json({ ResultDesc: "Accepted" });
}
