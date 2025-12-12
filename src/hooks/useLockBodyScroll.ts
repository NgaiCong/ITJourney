import { useEffect } from 'react';
import { useLenis } from '@studio-freight/react-lenis';

export default function useLockBodyScroll(isLocked: boolean) {
    const lenis = useLenis();

    useEffect(() => {
        // 1. Handle Lenis (Smooth Scroll)
        if (lenis) {
            if (isLocked) {
                lenis.stop();
            } else {
                lenis.start();
            }
        }

        // 2. Handle Document Style (HTML + Body)
        if (isLocked) {
            // Save original values
            const originalStyle = window.getComputedStyle(document.body).overflow;
            const originalHtmlStyle = window.getComputedStyle(document.documentElement).overflow;
            const originalPaddingRight = document.body.style.paddingRight;

            // Calculate scrollbar width
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            // Lock standard scroll
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';

            // Compensate for scrollbar to avoid layout shift
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }

            // Cleanup function
            return () => {
                document.body.style.overflow = originalStyle;
                document.documentElement.style.overflow = originalHtmlStyle;
                document.body.style.paddingRight = originalPaddingRight;

                // Ensure Lenis resumes on unmount/unlock
                if (lenis) lenis.start();
            };
        }
    }, [isLocked, lenis]);
}
