import React, { useState, useEffect, useRef } from "react";
import "./home.css";

const Home = () => {
  const [isBirthday, setIsBirthday] = useState(false);
  const fireworksCanvas = useRef(null);
  const confettiCanvas = useRef(null);
  const burstEmojis = ["🎉", "✨", "💖", "💗", "🎊"];

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const resizeCanvas = () => {
    if (fireworksCanvas.current) {
      fireworksCanvas.current.width = window.innerWidth;
      fireworksCanvas.current.height = window.innerHeight;
    }
    if (confettiCanvas.current) {
      confettiCanvas.current.width = window.innerWidth;
      confettiCanvas.current.height = window.innerHeight;
    }
  };

  const handlePointerDown = (e) => {
    for (let i = 0; i < 5; i++) {
      const s = document.createElement("span");
      s.className = "burst";
      s.textContent =
        burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
      s.style.left = `${e.clientX + (Math.random() * 24 - 12)}px`;
      s.style.top = `${e.clientY + (Math.random() * 16 - 8)}px`;
      s.style.fontSize = `${18 + Math.random() * 10}px`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1000);
    }
  };

  const startCelebration = () => {
    setIsBirthday(true);
    launchFireworks();
    boostConfetti(4500);
  }; // Fireworks animation

  const launchFireworks = () => {
    const canvas = fireworksCanvas.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let fireworks = [];
    const hueSet = [330, 340, 350, 300, 20, 25];

    class Firework {
      constructor(x, y, hue) {
        this.x = x;
        this.y = y;
        this.hue = hue;
        this.particles = [];
        const count = 110;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 3.6 + 1.8;
          this.particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 80 + Math.random() * 30,
            alpha: 1,
            size: 2, // Keep original size or slightly increase if needed
          });
        }
      }
      update() {
        this.particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.985;
          p.vy = p.vy * 0.985 + 0.05;
          p.life -= 1;
          p.alpha = Math.max(0, p.life / 110);
        });
      }
      draw(ctx) {
        this.particles.forEach((p) => {
          if (p.life > 0) {
            // MODIFIED: Increased Saturation from 90% to 100% and Lightness from 70% to 80%
            ctx.fillStyle = `hsla(${this.hue}, 100%, 80%, ${p.alpha})`;
            ctx.fillRect(p.x, p.y, p.size, p.size);
          }
        });
      }
      done() {
        return this.particles.every((p) => p.life <= 0);
      }
    }

    const animate = () => {
      ctx.globalCompositeOperation = "source-over"; // MODIFIED: Reduced the opacity of the fading trail (0.20 to 0.15) for a slightly crisper look
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      if (Math.random() < 0.06) {
        fireworks.push(
          new Firework(
            Math.random() * canvas.width,
            Math.random() * canvas.height * 0.45 + 40,
            hueSet[Math.floor(Math.random() * hueSet.length)]
          )
        );
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        fw.update();
        fw.draw(ctx);
        if (fw.done()) fireworks.splice(i, 1);
      }
      requestAnimationFrame(animate);
    };
    animate();
  }; // Confetti animation (no changes needed for brightness)

  const boostConfetti = (ms = 3000) => {
    const canvas = confettiCanvas.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const colors = ["#FF6FA7", "#FF6B6B", "#C8B6FF", "#FFB199"];
    let pieces = [];
    let spawnRate = 0.018;

    const addPiece = (force = false) => {
      if (!force && Math.random() > spawnRate) return;
      const size = Math.random() * 6 + 4;
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20,
        vx: (Math.random() - 0.5) * 0.6,
        vy: Math.random() * 0.7 + 0.6,
        sway: Math.random() * 0.6 + 0.2,
        s: size,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() < 0.5 ? "rect" : "tri",
      });
    };

    const drawPiece = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.fillStyle = p.color;
      if (p.shape === "rect") {
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s);
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -p.s / 1.4);
        ctx.lineTo(p.s / 1.2, p.s / 1.2);
        ctx.lineTo(-p.s / 1.2, p.s / 1.2);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 3; i++) addPiece();
      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];
        p.x += p.vx + Math.sin(p.y / 22) * p.sway;
        p.y += p.vy;
        p.vy += 0.0025;
        if (p.y > canvas.height + 40) pieces.splice(i, 1);
        else drawPiece(p);
      }
      requestAnimationFrame(animate);
    };

    window.boostConfetti = (ms = 3000) => {
      const end = performance.now() + ms;
      const prev = spawnRate;
      spawnRate = 0.09;
      const pump = () => {
        for (let i = 0; i < 18; i++) addPiece(true);
        if (performance.now() < end) requestAnimationFrame(pump);
        else spawnRate = prev;
      };
      pump();
    };
    animate();
  };

  return (
    <>
           {" "}
      <div className="bunting-wrap">
               {" "}
        <div className="bunting">
                   {" "}
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
                       {" "}
            <path
              d="M0,30 C200,80 400,0 600,50 C800,100 1000,20 1200,70"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="4"
            />
                       {" "}
            <polygon
              className="flag"
              points="80,40 120,40 100,95"
              fill="#FF6FA7"
            />
                       {" "}
            <polygon
              className="flag"
              points="140,30 180,30 160,85"
              fill="#C8B6FF"
            />
                       {" "}
            <polygon
              className="flag"
              points="200,50 240,50 220,105"
              fill="#FFB199"
            />
                       {" "}
            <polygon
              className="flag"
              points="260,35 300,35 280,90"
              fill="#FF6B6B"
            />
                       {" "}
            <polygon
              className="flag"
              points="320,55 360,55 340,110"
              fill="#FF6FA7"
            />
                       {" "}
            <polygon
              className="flag"
              points="380,40 420,40 400,95"
              fill="#C8B6FF"
            />
                       {" "}
            <polygon
              className="flag"
              points="440,30 480,30 460,85"
              fill="#FFB199"
            />
                       {" "}
            <polygon
              className="flag"
              points="500,50 540,50 520,105"
              fill="#FF6B6B"
            />
                       {" "}
            <polygon
              className="flag"
              points="560,35 600,35 580,90"
              fill="#FF6FA7"
            />
                       {" "}
            <polygon
              className="flag"
              points="620,55 660,55 640,110"
              fill="#C8B6FF"
            />
                       {" "}
            <polygon
              className="flag"
              points="680,40 720,40 700,95"
              fill="#FFB199"
            />
                       {" "}
            <polygon
              className="flag"
              points="740,30 780,30 760,85"
              fill="#FF6B6B"
            />
                       {" "}
            <polygon
              className="flag"
              points="800,50 840,50 820,105"
              fill="#FF6FA7"
            />
                       {" "}
            <polygon
              className="flag"
              points="860,35 900,35 880,90"
              fill="#C8B6FF"
            />
                       {" "}
            <polygon
              className="flag"
              points="920,55 960,55 940,110"
              fill="#FFB199"
            />
                       {" "}
            <polygon
              className="flag"
              points="980,40 1020,40 1000,95"
              fill="#FF6B6B"
            />
                       {" "}
            <polygon
              className="flag"
              points="1040,30 1080,30 1060,85"
              fill="#FF6FA7"
            />
                       {" "}
            <polygon
              className="flag"
              points="1100,50 1140,50 1120,105"
              fill="#C8B6FF"
            />
                     {" "}
          </svg>
                 {" "}
        </div>
             {" "}
      </div>
            <div className="edge-ribbon edge-left"></div>     {" "}
      <div className="edge-ribbon edge-right"></div>     {" "}
      <h1 className="birthday" style={{ marginTop: 150 }}>
        🎉Happy Birthday 🎉
      </h1>
            <div className="name-line">Swetha</div>     {" "}
      {/* <div className="panel"> */}       {" "}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={startCelebration}
          className="celebrate-btn"
          //   className="celebration-button"
          style={{ display: isBirthday ? "none" : "block" }}
        >
          ✨ Click Here! ✨
        </button>
      </div>
            {/* </div> */}     {" "}
      <div
        id="message"
        className="sparkle"
        style={{ display: isBirthday ? "inline-block" : "none" }}
      >
        {/*         🎂 Happy Birthday Swetha! 🎂      {" "} */}
        puttina roju jaijai luu chitti papaiii
      </div>
           {" "}
      <div id="balloons" style={{ display: isBirthday ? "block" : "none" }}>
                🎈💗🎊🎉🎀🎉🎊💗🎈      {" "}
      </div>
            <canvas ref={fireworksCanvas} id="fireworks"></canvas>     {" "}
      <canvas ref={confettiCanvas} id="confetti"></canvas>     {" "}
      <div className="floaters" aria-hidden="true">
               {" "}
        <span
          className="floater"
          style={{ left: "6%", "--x": "40px", "--dur": "14s" }}
        >
                    💗        {" "}
        </span>
               {" "}
        <span
          className="floater"
          style={{
            left: "18%",
            "--x": "-30px",
            "--dur": "16s",
            animationDelay: "1s",
          }}
        >
                    ✨        {" "}
        </span>
               {" "}
        <span
          className="floater"
          style={{
            left: "30%",
            "--x": "60px",
            "--dur": "13s",
            animationDelay: "2.5s",
          }}
        >
                    🌟        {" "}
        </span>
               {" "}
        <span
          className="floater"
          style={{
            left: "44%",
            "--x": "-50px",
            "--dur": "15s",
            animationDelay: "0.8s",
          }}
        >
                    💖        {" "}
        </span>
               {" "}
        <span
          className="floater"
          style={{
            left: "58%",
            "--x": "35px",
            "--dur": "14s",
            animationDelay: "1.8s",
          }}
        >
                    🎀        {" "}
        </span>
               {" "}
        <span
          className="floater"
          style={{
            left: "70%",
            "--x": "-40px",
            "--dur": "17s",
            animationDelay: "0.3s",
          }}
        >
                    💞        {" "}
        </span>
               {" "}
        <span
          className="floater"
          style={{
            left: "83%",
            "--x": "55px",
            "--dur": "12.5s",
            animationDelay: "2s",
          }}
        >
                    ✨        {" "}
        </span>
             {" "}
      </div>
         {" "}
    </>
  );
};

export default Home;
