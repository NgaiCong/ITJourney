'use client'

import { ReactLenis } from '@studio-freight/react-lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    // Lenis options for "Luxurious" heavy/smooth feel
    const lenisOptions = {
        lerp: 0.1,
        duration: 1.5,
        smoothTouch: false, // Ensure touch is native for better feel on mobile usually, or true if we want sticky feel
        smoothWheel: true,
    }

    return (
        // @ts-expect-error React 19 type compatibility for ReactLenis
        <ReactLenis root options={lenisOptions}>
            {children}
        </ReactLenis>
    )
}
