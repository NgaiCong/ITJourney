// import { ReactLenis } from '@studio-freight/react-lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    // Lenis temporarily disabled due to scroll locking issues.
    // We are using native CSS scroll-behavior: smooth + custom webkit scrollbar in globals.css
    return (
        <>{children}</>
    )
}
