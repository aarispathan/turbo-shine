import React, { useRef, useEffect } from "react";
import { TbChevronsUp } from "react-icons/tb";

import "./scroll.css";

export default function Scroll() {
  const scrollProgressRef = useRef(null);

  useEffect(() => {
    const calcScrollValue = () => {
      const scrollProgress = scrollProgressRef.current;

      if (!scrollProgress) return;

      let pos = document.documentElement.scrollTop;
      let calcHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      let scrollValue = Math.round((pos * 100) / calcHeight);

      if (pos > 100) {
        scrollProgress.style.display = "grid";
      } else {
        scrollProgress.style.display = "none";
      }

      scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
      });

      scrollProgress.style.background = `conic-gradient(
        #a78bfa 0%,
        #6f93fa ${scrollValue * 0.}%,
        #a78bfa ${scrollValue}%,
        #000000 ${scrollValue}%,
        #000000 100%
      )`;

    };

    window.addEventListener("scroll", calcScrollValue);
    window.addEventListener("load", calcScrollValue);

    return () => {
      window.removeEventListener("scroll", calcScrollValue);
      window.removeEventListener("load", calcScrollValue);
    };
  }, [scrollProgressRef]);

  return (
    <>
      <div id="progress" className="cursor-hover" ref={scrollProgressRef}>
        <span id="progress-value"><TbChevronsUp /></span>
      </div>
    </>
  );
}
