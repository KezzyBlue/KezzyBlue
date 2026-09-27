export function getBlogSlug(blog) {
    const title = String(blog.title ?? blog.sumary ?? "blog")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    const slug = title || "blog";

    return blog.id == null ? slug : `${slug}-${blog.id}`;
}