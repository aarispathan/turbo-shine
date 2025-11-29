import React, { useEffect, useRef } from 'react';
import './scrollbar.css'

function ScrollBar({ height = '75vh', width = '25vw', children }) {
    const boxRef = useRef(null);

    useEffect(() => {
        const ua = navigator.userAgent;
        const isWebKit =
            (/Chrome/.test(ua) && /Google Inc/.test(navigator.vendor)) ||
            (/Safari/.test(ua) && /Apple Computer/.test(navigator.vendor));

        if (!isWebKit && boxRef.current) {
            boxRef.current.innerHTML =
                '<p style="padding:1rem;">Your browser does not support WebKit scrollbars.</p>';
        }
    }, []);
    return (
        <div
            ref={boxRef}
            className="scrollbar"
            style={{ height, width, minWidth: 150 }}
        >
            <div className="overflow">{children}</div>
        </div>
    )
}

export default ScrollBar
