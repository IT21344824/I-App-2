import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export const PUT = auth(async (req) => {
  if (!req.auth) {
    return new Response("Not authenticated", { status: 401 });
  }

  const currentUser = req.auth.user;
  if (!currentUser || !currentUser.id) {
    return new Response("Invalid user", { status: 401 });
  }

  try {
    const { id, Name, Views, Description } = await req.json(); // Ensure id is extracted
   
    if (!id) {
      return new Response("Blog ID is required", { status: 400 });
    }

    const blog = await prisma.blog.update({
      where: {
        id: id,
        userId: currentUser.id, // Ensure the blog belongs to the current user
      },
      data: {
        Name: Name,
        Views: Views,
        Description: Description,
      },
    });

    return new Response(JSON.stringify(blog), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return new Response(`Internal server error: ${error.message}`, { status: 500 });
  }
});
