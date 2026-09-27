import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MoveLeft, LoaderCircle, CalendarDays } from "lucide-react";
import { getBlogSlug } from "./blogUtils";
import './BlogDetail.css';
import ReactMarkdown from "react-markdown"; 
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

function BlogDetail() {

    const { slug } = useParams();

    const [blogs, setBlogs] = useState(null);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        let isCurrent = true;
        async function fetchBlogs() {
            try {
                setBlogs(null);
                setHasError(false);
                const response = await fetch("/api/cms/blog/loadBlog?search=");
                if (!response.ok) {
                    throw new Error("Unable to load blog posts");
                } const data = await response.json();
                if (isCurrent) {
                    setBlogs(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error("Load blog error:", error);
                if (isCurrent) {
                    setHasError(true);
                }
            }
        }
        fetchBlogs();
        return () => {
            isCurrent = false;
        };
    }, [slug]);

    if (!blogs) {
        return <LoaderCircle className="loading" size={24} />;
    }
    const blog = blogs?.find((item) => {
        return getBlogSlug(item) === slug;
    });

    return (
        <div className="blogDetailContainer">
            <Link to=".." className="backButton">
                <MoveLeft />
                Blog / {blog.title}
            </Link>
            <div className="blogDetailContent">
                <h1> {blog.title} </h1>
                <div className="blogDate">
                    <CalendarDays size={14} />
                    {new Date(blog.updated_at).toLocaleDateString("vi-VN")}
                </div>
                <div className = "blogSumary">
                    <p> {blog.sumary} </p>
                </div>
                <div className="blogArticleLayout"> 
                    <div className="blogMarkdown"> 
                        { blog.content ? ( 
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}
                                rehypePlugins={[rehypeKatex]}
                            >
                            {String(blog.content)} 
                            </ReactMarkdown> ) : ( 
                                <p className="blogNoContent"> This blog is empty </p> )} 
                    </div> 
                </div>
            </div>
        </div>
    );
}
export default BlogDetail;