import prisma from "../lib/prisma.js";

const toggleCity = async () => {
    try {
        const postId = "66348731d254a42ac26fda7a"; // Replace with your actual post ID

        // Fetch the current post
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            console.error("Post not found");
            return;
        }

        // Toggle the city between "Mumbai" and "Thane"
        const newCity = post.city === "Mumbai" ? "Thane" : "Mumbai";

        // Update the post
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { city: newCity },
        });

        console.log("Post updated successfully:", updatedPost);
    } catch (error) {
        console.error("Error toggling city:", error);
    }
};

export default toggleCity;
