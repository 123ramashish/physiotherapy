"use client";
import { ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale";

interface RevealProps {
    children: ReactNode;
    delay?: number;
    direction?: Direction;
    className?: string;
    threshold?: number;
}

const transforms: Record<Direction, string> = {
    up: "translateY(60px)",
    down: "translateY(-40px)",
    left: "translateX(-60px)",
    right: "translateX(60px)",
    fade: "translateY(0)",
    scale: "scale(0.88)",
};

export default function Reveal({
    children,
    delay = 0,
    direction = "up",
    className = "",
    threshold = 0.1,
}: RevealProps) {
    const { ref, visible } = useScrollReveal(threshold);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : transforms[direction],
                transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
                willChange: "opacity, transform",
            }}
        >
            {children}
        </div>
    );
}