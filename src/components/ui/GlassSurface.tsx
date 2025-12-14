import React, { useEffect, useRef, useState, useId } from 'react';

export interface GlassSurfaceProps {
    children?: React.ReactNode;
    width?: number | string;
    height?: number | string;
    borderRadius?: number;
    borderWidth?: number;
    brightness?: number;
    opacity?: number;
    blur?: number;
    displace?: number;
    backgroundOpacity?: number;
    saturation?: number;
    distortionScale?: number;
    redOffset?: number;
    greenOffset?: number;
    blueOffset?: number;
    xChannel?: 'R' | 'G' | 'B';
    yChannel?: 'R' | 'G' | 'B';
    mixBlendMode?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity'
    | 'plus-darker'
    | 'plus-lighter';
    className?: string;
    style?: React.CSSProperties;
}

const useDarkMode = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return isDark;
};

const GlassSurface: React.FC<GlassSurfaceProps> = ({
    children,
    width = '100%',
    height = '100%',
    borderRadius = 20,
    opacity = 0.93,
    className = '',
    style = {}
}) => {
    return (
        <div
            className={`relative overflow-hidden group transition-all duration-300 ${className}`}
            style={{
                ...style,
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
                borderRadius: `${borderRadius}px`,
                background: `rgba(255, 255, 255, 0.03)`, // Very subtle background
                backdropFilter: `blur(12px)`, // Standard blur
                WebkitBackdropFilter: `blur(12px)`,
                boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`, // Subtle shadow
                border: `1px solid rgba(255, 255, 255, 0.1)`, // Glass border
            }}
        >
            {/* Hover Sheen Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none z-0" />

            <div className="w-full h-full relative z-10">
                {children}
            </div>

            {/* Optional: Subtle noise texture or gradient overlay could go here if needed, but staying minimal for perf */}
        </div>
    );
};

export default GlassSurface;
