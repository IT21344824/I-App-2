import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export const DELETE = auth(async (req) => {
  if (!req.auth) {
    return new Response("Not authenticated", { status: 401 });
  }

  const currentUser = req.auth.user;
  if (!currentUser || !currentUser.id) {
    return new Response("Invalid user", { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response("Blog ID is required", { status: 400 });
    }

    // Find the blog post by ID and ensure it belongs to the current user
    const blog = await prisma.blog.findFirst({
      where: {
        id: id,
        userId: currentUser.id,
      },
    });

    if (!blog) {
      return new Response("Blog not found or not authorized", { status: 404 });
    }

    // Delete the blog post
    await prisma.blog.delete({
      where: { id: id },
    });

    return new Response("Blog deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return new Response(`Internal server error: ${error.message}`, { status: 500 });
  }
});
