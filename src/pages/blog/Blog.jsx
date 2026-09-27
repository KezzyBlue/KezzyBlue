import { useEffect, useState } from "react";
import { Link, useMatch, useOutlet } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarDays, ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { getBlogSlug } from "./blogUtils.js";
import "./Blog.css";

function Blog() {
    const blogsPerPage = 12;
    const [blogs, setBlogs] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const outlet = useOutlet();
    const isBlogDetail = Boolean(useMatch("/blog/:slug"));

    useEffect(() => {
        if (isBlogDetail) {
            return;
        }

        async function fetchBlogs() {
            const response = await fetch("/api/cms/blog/loadBlog?search=");
            const data = await response.json();
            setBlogs(Array.isArray(data) ? data : []);
        }

        fetchBlogs();
    }, [isBlogDetail]);

    if (outlet) {
        return outlet;
    }

    if (!blogs) {
        return <LoaderCircle className="loading" size={24} />;
    }

    const totalPages = Math.max(1, Math.ceil(blogs.length / blogsPerPage));
    const visibleBlogs = blogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

    return (
        <div className="blogMain">
            <div className="blogHeader">
                <div className="blogHeaderTitle">
                    <BookOpen className="blogHeaderIcon" />
                    <h1>My blog</h1>
                </div>
                <p>This place is where I will post something about everything!</p>
            </div>

            <div className="blogContainer">
                <div className="blogGrid">
                    {visibleBlogs.map((blog) => (
                        <article className="blogCard" key={blog.id ?? `${blog.title}-${blog.updated_at}`}>
                            <div className="blogCoverImg">
                                {blog.img_url && <img src={blog.img_url} alt="" loading="lazy" />}
                            </div>
                            <div className="blogCardInfo">
                                <div className="blogDate">
                                    <CalendarDays size={14} />
                                    {new Date(blog.updated_at).toLocaleDateString("vi-VN")}
                                </div>
                                <h2>{blog.title}</h2>
                                <p>{blog.sumary}</p>
                                <Link className="readMore" to={`/blog/${getBlogSlug(blog)}`}>
                                    Read more <ArrowRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {blogs.length === 0 && <p className="emptyBlog">No blog posts yet.</p>}
                {blogs.length > blogsPerPage && (
                    <nav className="pagination" aria-label="Blog pagination">
                        <button type="button" aria-label="Previous page" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)}>
                            <ChevronLeft size={18} />
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <button className={page === currentPage ? "active" : ""} type="button" key={page} aria-label={`Page ${page}`} aria-current={page === currentPage ? "page" : undefined} onClick={() => setCurrentPage(page)}>
                                {page}
                            </button>
                        ))}
                        <button type="button" aria-label="Next page" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => page + 1)}>
                            <ChevronRight size={18} />
                        </button>
                    </nav>
                )}
            </div>
        </div>
    );
}

export default Blog;
