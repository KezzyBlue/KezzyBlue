import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, LoaderCircle, MoveLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "./DiaryDetail.css";

function DiaryDetail()
{
    const { slug } = useParams();
    const [diaries, setDiaries] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isCurrent = true;

        async function fetchDiaries() {
            try {
                setDiaries(null);
                setHasError(false);
                const response = await fetch("/api/cms/diary/loadDiary");
                if (!response.ok) {
                    throw new Error("Unable to load diary entries");
                }

                const data = await response.json();
                if (isCurrent) {
                    setDiaries(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error("Load diary error:", error);
                if (isCurrent) {
                    setHasError(true);
                    setDiaries([]);
                }
            }
        }

        fetchDiaries();
        return () => {
            isCurrent = false;
        };
    }, [slug]);

    if (!diaries && !hasError) {
        return <LoaderCircle className="loading" size={24} />;
    }

    const diary = diaries?.find((entry) => String(entry.created_at) === slug);

    return (
        <div className="diaryDetailContainer">
            <Link to=".." className="diaryBackButton">
                <MoveLeft size={18} />
                Diary
            </Link>

            {hasError ? (
                <p className="diaryMessage">Unable to load this diary entry.</p>
            ) : diary ? (
                <article className="diaryDetailContent">
                    <h1>{new Date(diary.created_at).toLocaleDateString("vi-VN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    })}</h1>
                    <div className="diaryDate">
                        <CalendarDays size={15} />
                        <time dateTime={diary.created_at}>
                            {new Date(diary.created_at).toLocaleDateString("vi-VN")}
                        </time>
                    </div>
                    <div className="diaryMarkdown">
                        {diary.content ? (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}
                                rehypePlugins={[rehypeKatex]}
                            >
                                {String(diary.content)}
                            </ReactMarkdown>
                        ) : (
                            <p className="diaryMessage">This diary entry is empty.</p>
                        )}
                    </div>
                </article>
            ) : (
                <p className="diaryMessage">Diary entry not found.</p>
            )}
        </div>
    );
}

export default DiaryDetail;