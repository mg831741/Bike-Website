import { useEffect, useRef } from "react";
import "../styles/dynamicBackground.css";

function DynamicBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    // Spark/ember color palette
    const colors = [
      "rgba(255, 60, 0, ",   // Brand Orange-Red
      "rgba(255, 166, 0, ",  // Warm Gold/Orange
      "rgba(255, 90, 0, ",   // Mid Orange
      "rgba(230, 0, 0, ",    // Intense Red
      "rgba(226, 232, 240, " // Slate White/Spark
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6; // Drift velocity
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1;
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.3;
        this.pulseDir = Math.random() > 0.5 ? 1 : -1;
        this.pulseSpeed = Math.random() * 0.005 + 0.002;
      }

      update() {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Bounce/Wrap borders
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Pulse opacity for dynamic sparkle feel
        this.opacity += this.pulseDir * this.pulseSpeed;
        if (this.opacity > 0.8) {
          this.opacity = 0.8;
          this.pulseDir = -1;
        } else if (this.opacity < 0.2) {
          this.opacity = 0.2;
          this.pulseDir = 1;
        }

        // Mouse gravity interaction
        const mouse = mouseRef.current;
        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          if (dist < maxDist) {
            // Gentle attraction force
            const force = (maxDist - dist) / maxDist;
            this.x += (dx / dist) * force * 0.4;
            this.y += (dy / dist) * force * 0.4;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // Emulated glow
        ctx.shadowBlur = this.radius * 3;
        ctx.shadowColor = this.colorBase + "1)";
        ctx.fillStyle = this.colorBase + this.opacity + ")";
        ctx.fill();
        
        // Reset shadow config to avoid slowing down line drawings
        ctx.shadowBlur = 0;
      }
    }

    const initParticles = () => {
      // Scale particle density relative to viewport size
      const particleDensity = 25000; 
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / particleDensity));
      
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const drawConnections = () => {
      const maxDistance = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Connecting line styling (soft gradient glow look)
            ctx.strokeStyle = `rgba(255, 90, 0, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    const drawMouseConnections = () => {
      const mouse = mouseRef.current;
      if (!mouse.active || mouse.x === null || mouse.y === null) return;

      const maxDistance = 150;
      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const alpha = (1 - distance / maxDistance) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 166, 0, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawConnections();
      drawMouseConnections();

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event listeners
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
      mouseRef.current.active = false;
    };

    const handleMouseEnter = () => {
      mouseRef.current.active = true;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Run setup
    resizeCanvas();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="dynamic-bg-wrapper">
      <div className="dynamic-bg-aura"></div>
      <canvas ref={canvasRef} className="dynamic-bg-canvas" />
    </div>
  );
}

export default DynamicBackground;
