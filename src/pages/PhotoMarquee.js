import React, { useEffect, useRef, useState } from "react";
import photo1 from './photos/photo1.JPG';
import photo2 from './photos/photo2.JPG';
import photo3 from './photos/photo3.JPG';
import photo4 from './photos/photo4.JPG';
import photo5 from './photos/photo5.JPG';


const photos = [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
];

export default function PhotoMarqueePingPong() {
    const [offset, setOffset] = useState(0); // translateX %
    const directionRef = useRef(-1);
    const speed = 0.03; // % per frame, adjust speed

    // Width is tricky here because we use percent, so we’ll pick -50% as max offset (half container width)
    // Adjust -50% if you want different sliding range

    useEffect(() => {
        let animationFrameId;

        const animate = () => {
            setOffset((prev) => {
                let next = prev + directionRef.current * speed;
                if (next <= -50) {
                    directionRef.current = 1; // reverse to right
                    next = -50;
                } else if (next >= 0) {
                    directionRef.current = -1; // reverse to left
                    next = 0;
                }
                return next;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div
            style={{
                overflow: "hidden",
                width: "100%",
                backgroundColor: "#111",
                height: 350,
                position: "relative",
                userSelect: "none",
            }}
        >
            <div
                style={{
                    display: "flex",
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    transform: `translate3d(${offset}%, -50%, 0)`,
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                    transition: "transform 0s",
                    gap: "15px",
                }}
            >
                {photos.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`Photo ${i + 1}`}
                        style={{
                            width: 400,
                            height: 500,
                            objectFit: "cover",
                            borderRadius: 10,
                            border: "2px solid #FFD700",
                            flexShrink: 0,
                            pointerEvents: "none",
                            userSelect: "none",
                            draggable: false,
                        }}
                        draggable={false}
                    />
                ))}
            </div>
        </div>
    );
}
