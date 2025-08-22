import React, { useEffect, useRef, useState } from "react";

export interface Slide {
    src: string;        // 图片地址（通过 import 得到的 url）
    alt?: string;       // 无障碍文本
    caption?: string;   // 可选图注
}

interface Props {
    slides: Slide[];              // 轮播图片数组
    interval?: number;            // 自动切换间隔（毫秒），默认 3500
    height?: number | string;     // 容器高度，默认 360（可传 "320px" / "40vh"）
    rounded?: boolean;            // 是否圆角，默认 true
    fit?: "contain" | "cover";    // 图片适配方式，默认 contain(完整显示)
}

const Carousel: React.FC<Props> = ({
    slides,
    interval = 3500,
    height = 360,
    rounded = true,
    fit = "contain",
}) => {
    // 过滤可能的空项，防止产生“空白页”
    const safeSlides = slides.filter((s) => s && s.src);
    const total = safeSlides.length || 1;

    const [index, setIndex] = useState(0);
    const timer = useRef<number | null>(null);
    const paused = useRef(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const startX = useRef<number | null>(null);

    // —— 控制函数（使用函数式更新 + 取模，避免越界导致空白）——
    const next = () => setIndex((i) => (i + 1) % total);
    const prev = () => setIndex((i) => (i - 1 + total) % total);
    const go = (i: number) => setIndex(((i % total) + total) % total);

    // —— 自动播放：只构建一次计时器（或在 interval/total 变更时）——
    useEffect(() => {
        const tick = () => { if (!paused.current && total > 1) next(); };
        timer.current = window.setInterval(tick, interval);
        return () => { if (timer.current) window.clearInterval(timer.current); };
    }, [interval, total]);

    // —— 悬停暂停 / 离开继续（用事件而非重建计时器）——
    const handleMouseEnter = () => (paused.current = true);
    const handleMouseLeave = () => (paused.current = false);

    // —— 触摸滑动（移动端）——
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onStart = (e: TouchEvent) => (startX.current = e.touches[0].clientX);
        const onEnd = (e: TouchEvent) => {
            if (startX.current == null) return;
            const dx = e.changedTouches[0].clientX - startX.current;
            if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
            startX.current = null;
        };

        el.addEventListener("touchstart", onStart, { passive: true });
        el.addEventListener("touchend", onEnd);
        return () => {
            el.removeEventListener("touchstart", onStart);
            el.removeEventListener("touchend", onEnd);
        };
    }, [total]);

    // —— 键盘左右键支持 —— 
    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    };

    return (
        <section className="carousel" aria-label="featured dishes">
            <div
                ref={containerRef}
                className={`carousel-viewport ${rounded ? "rounded" : ""}`}
                style={{ height: typeof height === "number" ? `${height}px` : height }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                {/* 轨道：用 flex，子项 min-width:100%，不会产生第 N+1 屏 */}
                <div
                    className="carousel-track"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {safeSlides.map((s, i) => (
                        <figure className="carousel-slide" key={i}>
                            <img
                                src={s.src}
                                alt={s.alt || `slide ${i + 1}`}
                                style={{
                                    // 默认完整显示（contain）；想要横幅裁切可以把 fit 传入 "cover"
                                    objectFit: fit,
                                    maxWidth: fit === "contain" ? "100%" : "none",
                                    maxHeight: fit === "contain" ? "100%" : "none",
                                    width: fit === "cover" ? "100%" : "auto",
                                    height: fit === "cover" ? "100%" : "auto",
                                    display: "block",
                                }}
                            />
                            {s.caption && (
                                <figcaption className="carousel-caption">{s.caption}</figcaption>
                            )}
                        </figure>
                    ))}
                </div>

                {/* 左右箭头 */}
                {total > 1 && (
                    <>
                        <button
                            className="carousel-arrow left"
                            aria-label="Previous slide"
                            onClick={prev}
                        >
                            ‹
                        </button>
                        <button
                            className="carousel-arrow right"
                            aria-label="Next slide"
                            onClick={next}
                        >
                            ›
                        </button>
                    </>
                )}

                {/* 圆点指示 */}
                {total > 1 && (
                    <div className="carousel-dots" role="tablist" aria-label="slides">
                        {safeSlides.map((_, i) => (
                            <button
                                key={i}
                                role="tab"
                                aria-selected={i === index}
                                className={`dot ${i === index ? "active" : ""}`}
                                onClick={() => go(i)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Carousel;
