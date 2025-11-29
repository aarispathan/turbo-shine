import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import "./mainloader.css";

function MainLoader() {
    const preloaderRef = useRef(null);
    const progressRef = useRef(null);
    const percRef = useRef(null);

    const loadInitRef = useRef(null);
    const loadDoneRef = useRef(null);

    const contentRef = useRef(null);
    const titleRef = useRef(null);
    const paraRef = useRef(null);

    useEffect(() => {
        const initChars = new SplitType(loadInitRef.current, { types: "chars" });
        const doneChars = new SplitType(loadDoneRef.current, { types: "chars" });
        const titleChars = new SplitType(titleRef.current, { types: "chars" });
        const paraChars = new SplitType(paraRef.current, { types: "chars" });

        gsap.set(loadDoneRef.current, { y: "100%" });
        gsap.set([...initChars.chars, ...doneChars.chars], { opacity: 0, y: 100 });
        const stages = [
            { bg: "#E9F1FF", fg: "#222222" } // dark text on light bg
        ];

        const updateColours = p => {
            const s = Math.min(stages.length - 1, Math.floor(p / 25));
            preloaderRef.current.style.background = stages[s].bg;
            progressRef.current.style.backgroundColor = stages[s].fg;
            [...preloaderRef.current.querySelectorAll(".char"), percRef.current]
                .forEach(el => (el.style.color = stages[s].fg));
        };

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.to(initChars.chars, { opacity: 1, y: 0, duration: .5, stagger: .05 })

            .to(progressRef.current, {
                width: "100%",
                duration: 5,
                ease: "power1.inOut",
                onUpdate() {
                    const percent = Math.round(this.progress() * 100);
                    percRef.current.textContent = percent;
                    updateColours(percent);
                }
            })

            .to(loadInitRef.current, { y: "-100%", duration: .5 }, "+=0.2")
            .to(loadDoneRef.current, { y: "0%", duration: .5 }, "<")
            .to(doneChars.chars, { opacity: 1, y: 0, stagger: .03 }, "<0.2")

            .to(preloaderRef.current, { y: "-100vh", duration: 1, ease: "power2.inOut", delay: .8 })

            .set(contentRef.current, { visibility: "visible" }, "<")
            .to([...titleChars.chars, ...paraChars.chars],
                { opacity: 1, y: 0, stagger: .02, duration: 1 }, "-=0.5")

            .set(preloaderRef.current, { display: "none" });

        return () => {
            tl.kill();
            initChars.revert();
            doneChars.revert();
            titleChars.revert();
            paraChars.revert();
        };
    }, []);

    return (
        <>
            <div className="preloader" ref={preloaderRef}>
                <div className="progress-container">
                    <div className="progress-bar" ref={progressRef} />
                </div>

                <div className="text-container">
                    <div className="loading-text initial" ref={loadInitRef}>Loading</div>
                    <div className="loading-text complete" ref={loadDoneRef}>Complete</div>
                </div>

                <div className="percentage" ref={percRef}>0</div>
            </div>

            <div className="content" ref={contentRef}>
                <h1 ref={titleRef}>Welcome to the Website</h1>
                <p ref={paraRef}>This content appears after the preloader finishes.</p>
            </div>
        </>
    );
}

export default MainLoader;
