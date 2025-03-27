import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use your secret key from .env

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Received checkout request:', body);

    const { cartItems } = body;

    if (!cartItems || cartItems.length === 0) {
      return new Response(JSON.stringify({ error: "Cart is empty" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Convert cart items into Stripe line items
    const lineItems = cartItems.map((item) => {
      console.log('Processing item with image:', item.productImage);
      
      return {
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.name,
            description: `Beautiful ${item.name} for your special occasion`,
            images: [item.productImage],
            metadata: {
              productId: item.name.toLowerCase().replace(/\s+/g, '-')
            }
          },
          unit_amount: Math.round(item.price * 100), // Convert price to pence
        },
        quantity: item.quantity,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10,
        },
      };
    });

    console.log('Creating Stripe session with line items:', lineItems);

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/product`,
      shipping_address_collection: {
        allowed_countries: ['GB'], // Allow shipping to United Kingdom
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 500, // £5.00 in pence
              currency: 'gbp',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 5,
              },
            },
          },
        },
      ],
      allow_promotion_codes: true,
    });

    console.log('Stripe session created:', session.id);

    return new Response(JSON.stringify({ id: session.id }), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred during checkout'
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}
