import { NotebookPen, LoaderCircle } from "lucide-react";
import "./Diary.css";
import { useEffect, useState } from "react";
import { Link, useOutlet } from "react-router-dom";

function Diary() {
    const [diaries, setDiaries] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function fetchDiaries() {
            try {
                const response = await fetch("/api/cms/diary/loadDiary");
                if (!response.ok) {
                    throw new Error("Unable to load diary entries");
                }

                const data = await response.json();
                setDiaries(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Load diary error:", error);
                setHasError(true);
                setDiaries([]);
            }
        }

        fetchDiaries();
    }, []);

    const outlet = useOutlet();

    if (outlet) {
        return outlet;
    }

    if (!diaries) {
        return <LoaderCircle className="loading" size={24} />;
    }

    return (
        <div className="diaryContainer">
            <div className="diaryHeader">
                <div className="diaryHeaderTitle">
                    <NotebookPen className="diaryHeaderIcon" />
                    <h1>Diary</h1>
                </div>

                <p>
                    This will be the place where I write about daily life!
                </p>
            </div>

            <div className="diaryContent">
                {diaries.map((diary, index) => (
                    <Link
                        className="diaryBar"
                        key={`${diary.created_at}-${index}`}
                        to={`/diary/${encodeURIComponent(diary.created_at)}`}
                    >
                        <time dateTime={diary.created_at}>
                            {new Date(diary.created_at).toLocaleDateString("vi-VN")}
                        </time>
                        <p>{String(diary.content ?? "").replace(/\s+/g, " ").trim()}</p>
                    </Link>
                ))}
                {hasError && <p className="diaryMessage">Unable to load diary entries.</p>}
                {!hasError && diaries.length === 0 && (
                    <p className="diaryMessage">No diary entries yet.</p>
                )}
            </div>
        </div>
    );
}

export default Diary;