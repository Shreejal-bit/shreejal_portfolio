"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const particleCount = 50;
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient orbs
      const time = Date.now() * 0.001;

      // Large purple orb - top left
      const orb1 = ctx.createRadialGradient(
        canvas.width * 0.2 + Math.sin(time * 0.3) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.2) * 50,
        0,
        canvas.width * 0.2 + Math.sin(time * 0.3) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.2) * 50,
        400
      );
      orb1.addColorStop(0, "rgba(192, 132, 252, 0.15)");
      orb1.addColorStop(0.5, "rgba(192, 132, 252, 0.05)");
      orb1.addColorStop(1, "rgba(192, 132, 252, 0)");
      ctx.fillStyle = orb1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pink orb - bottom right
      const orb2 = ctx.createRadialGradient(
        canvas.width * 0.8 + Math.cos(time * 0.25) * 80,
        canvas.height * 0.7 + Math.sin(time * 0.35) * 60,
        0,
        canvas.width * 0.8 + Math.cos(time * 0.25) * 80,
        canvas.height * 0.7 + Math.sin(time * 0.35) * 60,
        350
      );
      orb2.addColorStop(0, "rgba(232, 121, 249, 0.12)");
      orb2.addColorStop(0.5, "rgba(232, 121, 249, 0.04)");
      orb2.addColorStop(1, "rgba(232, 121, 249, 0)");
      ctx.fillStyle = orb2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cyan orb - middle
      const orb3 = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(time * 0.4) * 150,
        canvas.height * 0.5 + Math.cos(time * 0.3) * 100,
        0,
        canvas.width * 0.5 + Math.sin(time * 0.4) * 150,
        canvas.height * 0.5 + Math.cos(time * 0.3) * 100,
        300
      );
      orb3.addColorStop(0, "rgba(34, 211, 238, 0.08)");
      orb3.addColorStop(0.5, "rgba(34, 211, 238, 0.03)");
      orb3.addColorStop(1, "rgba(34, 211, 238, 0)");
      ctx.fillStyle = orb3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192, 132, 252, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      ctx.strokeStyle = "rgba(192, 132, 252, 0.1)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
