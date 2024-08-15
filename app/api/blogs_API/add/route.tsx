import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export const POST = auth(async (req) => {
  if (!req.auth) {
    return new Response("Not authenticated", { status: 401 });
  }

  const currentUser = req.auth.user;
  if (!currentUser || !currentUser.id) {
    return new Response("Invalid user", { status: 401 });
  }

  try {
    const body = await req.json();
    const { Item_Name, Quantity, Description } = body;

    if (!Item_Name || !Quantity) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Log the incoming request data
    console.log("Request Data:", body);

    const product = await prisma.product.create({
      data: {
        Item_Name,
        Quantity,
        Description,
        userId: currentUser.id,
      },
    });

    return new Response(JSON.stringify(product), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return new Response(`Internal server error: ${error.message}`, { status: 500 });
  }
});
