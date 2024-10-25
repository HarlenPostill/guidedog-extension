import React, { useEffect } from "react";
import './Confetti.css';

const Confetti = () => {
    useEffect(() => {
        const confettiCount = 20;
        const canvas = document.getElementById(
            "confettiCanvas"
        ) as HTMLCanvasElement | null;

        if (!canvas) return; // Ensure canvas is not null
        const ctx = canvas.getContext("2d");

        if (!ctx) return; // Ensure context is available

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = [
            { front: "#7b5cff", back: "#6245e0" },
            { front: "#b3c7ff", back: "#8fa5e5" },
            { front: "#5c86ff", back: "#345dd1" },
        ];

        interface ConfettoProps {
            color: { front: string; back: string };
            dimensions: { x: number; y: number };
            position: { x: number; y: number };
            rotation: number;
            scale: { x: number; y: number };
            velocity: { x: number; y: number };
            update: () => void;
        }

        const confetti: ConfettoProps[] = [];
        let animationFrameId: number;

        function randomRange(min: number, max: number): number {
            return Math.random() * (max - min) + min;
        }

        function Confetto(): ConfettoProps {
            const color = colors[Math.floor(randomRange(0, colors.length))];
            const dimensions = { x: randomRange(5, 9), y: randomRange(8, 15) };
            const position = {
                x: randomRange(0, canvas?.width || 0),
                y: randomRange(0, canvas?.height || 0 / 2),
            };
            const rotation = randomRange(0, 2 * Math.PI);
            const scale = { x: 1, y: 1 };
            const velocity = { x: randomRange(-9, 9), y: randomRange(6, 11) };

            return {
                color,
                dimensions,
                position,
                rotation,
                scale,
                velocity,
                update() {
                    this.velocity.x *= 0.99;
                    this.velocity.y *= 0.99;
                    this.position.x += this.velocity.x;
                    this.position.y += this.velocity.y;
                    this.scale.y = Math.cos(this.position.y * 0.09);
                },
            };
        }

        function renderConfetti() {
            ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);

            confetti.forEach((confetto, index) => {
                const width = confetto.dimensions.x * confetto.scale.x;
                const height = confetto.dimensions.y * confetto.scale.y;

                ctx?.translate(confetto.position.x, confetto.position.y);
                ctx?.rotate(confetto.rotation);
                confetto.update();
                ctx!.fillStyle =
                    confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
                ctx?.fillRect(-width / 2, -height / 2, width, height);
                ctx?.setTransform(1, 0, 0, 1, 0, 0);

                if (canvas?.height && confetto.position.y > canvas.height)
                    confetti.splice(index, 1);
            });

            // Generate new confetti when array becomes empty
            if (confetti.length === 0) {
                for (let i = 0; i < confettiCount; i++) {
                    confetti.push(Confetto());
                }
            }

            animationFrameId = requestAnimationFrame(renderConfetti);
        }

        for (let i = 0; i < confettiCount; i++) {
            confetti.push(Confetto());
        }

        renderConfetti();

        return () => {
            cancelAnimationFrame(animationFrameId);
            ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
        };
    }, []);

    return (
        <canvas
            id="confettiCanvas"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 9999,
            }}
        />
    );
};

export default Confetti;
