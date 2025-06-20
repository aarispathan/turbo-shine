import React, { useEffect } from 'react';
import './customcursor.css';

const CustomCursor = () => {
    useEffect(() => {
        const follower = document.querySelector('.follower');
        const round = document.querySelector('.round');

        let posX = 0;
        let posY = 0;

        let mouseX = 0;
        let mouseY = 0;

        const speed = 0.1;

        const moveCursor = (e) => {
            mouseX = e.pageX - 10;
            mouseY = e.pageY - 10;
        };

        const animate = () => {
            posX += (mouseX - posX) * speed;
            posY += (mouseY - posY) * speed;

            if (follower) {
                follower.style.left = `${posX}px`;
                follower.style.top = `${posY}px`;
            }

            requestAnimationFrame(animate);
        };

        const showCursor = () => follower && (follower.style.display = 'block');
        const hideCursor = () => follower && (follower.style.display = 'none');

        const addHover = () => round?.classList.add('hover');
        const removeHover = () => round?.classList.remove('hover');

        document.addEventListener('mousemove', moveCursor);
        document.documentElement.addEventListener('mouseenter', showCursor);
        document.documentElement.addEventListener('mouseleave', hideCursor);

        const handleMouseOver = (e) => {
            if (e.target.closest('.cursor-hover')) {
                addHover();
            }
        };

        const handleMouseOut = (e) => {
            if (e.target.closest('.cursor-hover')) {
                removeHover();
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        animate();

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            document.documentElement.removeEventListener('mouseenter', showCursor);
            document.documentElement.removeEventListener('mouseleave', hideCursor);

            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <>
            <div className="separation"></div>
            <div className="follower"><div className="round"></div></div>
        </>
    );
};

export default CustomCursor;
