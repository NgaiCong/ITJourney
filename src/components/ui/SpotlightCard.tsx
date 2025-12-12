'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import './SpotlightCard.css';

interface SpotlightCardProps extends React.PropsWithChildren {
    className?: string;
    spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
    children,
    className = '',
    spotlightColor = 'rgba(255, 255, 255, 0.25)'
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(0);
    const isHoveredRef = useRef(false);

    const animate = useCallback(() => {
        if (divRef.current && !isHoveredRef.current) {
            const time = Date.now() / 2000; // Speed factor
            const width = divRef.current.offsetWidth;
            const height = divRef.current.offsetHeight;

            // Swaying logic: Figure-8 or simple sway
            // X: Center +/- 40% of width
            const x = width / 2 + Math.cos(time) * (width * 0.4);
            // Y: Center +/- 20% of height (gentle bobbing)
            const y = height / 2 + Math.sin(time * 0.8) * (height * 0.2);

            divRef.current.style.setProperty('--mouse-x', `${x}px`);
            divRef.current.style.setProperty('--mouse-y', `${y}px`);
            divRef.current.style.setProperty('--spotlight-color', spotlightColor);
        }
        requestRef.current = requestAnimationFrame(animate);
    }, [spotlightColor]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(requestRef.current);
        };
    }, [animate]);

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
        if (!divRef.current) return;
        isHoveredRef.current = true;

        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        divRef.current.style.setProperty('--mouse-x', `${x}px`);
        divRef.current.style.setProperty('--mouse-y', `${y}px`);
        divRef.current.style.setProperty('--spotlight-color', spotlightColor);
    };

    const handleMouseEnter = () => {
        isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
        isHoveredRef.current = false;
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`card-spotlight ${className}`}
        >
            {children}
        </div>
    );
};

export default SpotlightCard;
