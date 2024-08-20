import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export const GET = auth(async (req) => {
  if (!req.auth) {
    return new Response("Not authenticated", { status: 401 });
  }

  const currentUser = req.auth.user;
  if (!currentUser || !currentUser.id) {
    return new Response("Invalid user", { status: 401 });
  }

  const url = new URL(req.url);
  const blogId = url.pathname.split("/").pop(); // Extracts the last part of the path as the blogId

  if (!blogId) {
    return new Response("Blog ID is required", { status: 400 });
  }

  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
        userId: currentUser.id, // Ensure the blog belongs to the current user
      },
    });

    if (!blog) {
      return new Response("Blog not found", { status: 404 });
    }

    return new Response(JSON.stringify(blog), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error retrieving blog:", error);
    return new Response(`Internal server error: ${error.message}`, { status: 500 });
  }
});
