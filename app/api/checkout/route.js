import { NextResponse } from "next/server";
import Stripe from "stripe";

const key = "sk_test_51QpVHxPNmoPysQ0GZYjraj4sDe4Q0r48nFDEgDupyRzMrlv50d0iUIcCd1TCn5dfJEpJENj0p5gUClNWlMIqroqh007jPCnJdv";
const stripe = new Stripe(key, {
  apiVersion: "2023-10-16",
});

export async function POST(req) {
  try {
    const { cartItems } = await req.json();
    console.log("Received cart items:", cartItems);

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      );
    }

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
          description: `Quantity: ${item.quantity} | Price: £${item.price}`,
          metadata: {
            quantity: item.quantity.toString(),
            price: item.price.toString()
          }
        },
        unit_amount: Math.round(item.price * 100), // Convert to pence
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/product`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_email: 'customer@example.com',
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error.message || "Error creating checkout session" },
      { status: 500 }
    );
  }
}
