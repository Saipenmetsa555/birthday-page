// import React from "react";

// const Home = () => {
//   return <div>Home</div>;
// };

// export default Home;

// import React from "react";
// import Confetti from "react-confetti";
// import Slider from "react-slick";
// import "./Home.css"; // Create this file for styling
// import h1 from "../assets/h1.jpg";
// import h2 from "../assets/h2.jpg";
// import h3 from "../assets/h3.avif";

// const Home = () => {
//   // Settings for the React Slick carousel
//   const settings = {
//     dots: true,
//     infinite: true,
//     fade: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   const images = [
//     h1,
//     h2,
//     h3,
//     // "https://via.placeholder.com/600/FF5733", // Placeholder image 1
//     // "https://via.placeholder.com/600/33FF57", // Placeholder image 2
//     // "https://via.placeholder.com/600/5733FF", // Placeholder image 3
//     // "https://via.placeholder.com/600/F53C1A", // Placeholder image 4
//   ];

//   return (
//     <div className="birthday-container">
//       <Confetti />
//       <div className="content">
//         <h1>Happy Birthday! 🎉</h1>
//         <p>
//           Wishing you a day filled with joy, laughter, and wonderful memories!
//         </p>
//         <div className="image-carousel">
//           <Slider {...settings}>
//             {images.map((img, index) => (
//               <div key={index}>
//                 <img
//                   src={img}
//                   alt={`Birthday moment ${index + 1}`}
//                   className="carousel-image"
//                 />
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect, useRef } from "react";
// import "./Home.css";

// const Home = () => {
//   const targetDate = useRef(new Date("September 8, 2025 00:00:00").getTime());
//   const [countdown, setCountdown] = useState("⏳ Loading countdown...");
//   const [isBirthday, setIsBirthday] = useState(false);
//   const countdownInterval = useRef(null);
//   const fireworksCanvas = useRef(null);
//   const confettiCanvas = useRef(null);
//   const burstEmojis = ["🎉", "✨", "💖", "💗", "🎊"];
//   const pastelCycle = ["#FF6FA7", "#FF6B6B", "#C8B6FF", "#FFB199"];

//   useEffect(() => {
//     countdownInterval.current = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = targetDate.current - now;

//       if (distance <= 0) {
//         clearInterval(countdownInterval.current);
//         setIsBirthday(true);
//         launchFireworks();
//         boostConfetti(4500);
//         return;
//       }

//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor(
//         (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       const idx = Math.floor((Date.now() / 1000) % pastelCycle.length);
//       const color = pastelCycle[idx];

//       setCountdown(
//         <span style={{ color: color }}>
//           ⏳ Time left: {days} days, {hours} hours, {minutes} minutes, {seconds}{" "}
//           seconds
//         </span>
//       );
//     }, 1000);

//     // Initial setup for canvases and event listeners
//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);
//     document.addEventListener("pointerdown", handlePointerDown);

//     return () => {
//       clearInterval(countdownInterval.current);
//       window.removeEventListener("resize", resizeCanvas);
//       document.removeEventListener("pointerdown", handlePointerDown);
//     };
//   }, []);

//   const resizeCanvas = () => {
//     if (fireworksCanvas.current) {
//       fireworksCanvas.current.width = window.innerWidth;
//       fireworksCanvas.current.height = window.innerHeight;
//     }
//     if (confettiCanvas.current) {
//       confettiCanvas.current.width = window.innerWidth;
//       confettiCanvas.current.height = window.innerHeight;
//     }
//   };

//   const handlePointerDown = (e) => {
//     for (let i = 0; i < 5; i++) {
//       const s = document.createElement("span");
//       s.className = "burst";
//       s.textContent =
//         burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
//       s.style.left = `${e.clientX + (Math.random() * 24 - 12)}px`;
//       s.style.top = `${e.clientY + (Math.random() * 16 - 8)}px`;
//       s.style.fontSize = `${18 + Math.random() * 10}px`;
//       document.body.appendChild(s);
//       setTimeout(() => s.remove(), 1000);
//     }
//   };

//   // Fireworks animation
//   const launchFireworks = () => {
//     const canvas = fireworksCanvas.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     let fireworks = [];
//     const hueSet = [330, 340, 350, 300, 20, 25];

//     class Firework {
//       constructor(x, y, hue) {
//         this.x = x;
//         this.y = y;
//         this.hue = hue;
//         this.particles = [];
//         const count = 110;
//         for (let i = 0; i < count; i++) {
//           const angle = Math.random() * Math.PI * 2;
//           const speed = Math.random() * 3.6 + 1.8;
//           this.particles.push({
//             x,
//             y,
//             vx: Math.cos(angle) * speed,
//             vy: Math.sin(angle) * speed,
//             life: 80 + Math.random() * 30,
//             alpha: 1,
//             size: 2,
//           });
//         }
//       }
//       update() {
//         this.particles.forEach((p) => {
//           p.x += p.vx;
//           p.y += p.vy;
//           p.vx *= 0.985;
//           p.vy = p.vy * 0.985 + 0.05;
//           p.life -= 1;
//           p.alpha = Math.max(0, p.life / 110);
//         });
//       }
//       draw(ctx) {
//         this.particles.forEach((p) => {
//           if (p.life > 0) {
//             ctx.fillStyle = `hsla(${this.hue}, 90%, 70%, ${p.alpha})`;
//             ctx.fillRect(p.x, p.y, p.size, p.size);
//           }
//         });
//       }
//       done() {
//         return this.particles.every((p) => p.life <= 0);
//       }
//     }

//     const animate = () => {
//       ctx.globalCompositeOperation = "source-over";
//       ctx.fillStyle = "rgba(0, 0, 0, 0.20)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//       ctx.globalCompositeOperation = "lighter";

//       if (Math.random() < 0.06) {
//         fireworks.push(
//           new Firework(
//             Math.random() * canvas.width,
//             Math.random() * canvas.height * 0.45 + 40,
//             hueSet[Math.floor(Math.random() * hueSet.length)]
//           )
//         );
//       }

//       for (let i = fireworks.length - 1; i >= 0; i--) {
//         const fw = fireworks[i];
//         fw.update();
//         fw.draw(ctx);
//         if (fw.done()) fireworks.splice(i, 1);
//       }
//       requestAnimationFrame(animate);
//     };
//     animate();
//   };

//   // Confetti animation
//   const boostConfetti = (ms = 3000) => {
//     const canvas = confettiCanvas.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     const colors = ["#FF6FA7", "#FF6B6B", "#C8B6FF", "#FFB199"];
//     let pieces = [];
//     let spawnRate = 0.018;

//     const addPiece = (force = false) => {
//       if (!force && Math.random() > spawnRate) return;
//       const size = Math.random() * 6 + 4;
//       pieces.push({
//         x: Math.random() * canvas.width,
//         y: -20,
//         vx: (Math.random() - 0.5) * 0.6,
//         vy: Math.random() * 0.7 + 0.6,
//         sway: Math.random() * 0.6 + 0.2,
//         s: size,
//         color: colors[Math.floor(Math.random() * colors.length)],
//         shape: Math.random() < 0.5 ? "rect" : "tri",
//       });
//     };

//     const drawPiece = (p) => {
//       ctx.save();
//       ctx.translate(p.x, p.y);
//       ctx.fillStyle = p.color;
//       if (p.shape === "rect") {
//         ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s);
//       } else {
//         ctx.beginPath();
//         ctx.moveTo(0, -p.s / 1.4);
//         ctx.lineTo(p.s / 1.2, p.s / 1.2);
//         ctx.lineTo(-p.s / 1.2, p.s / 1.2);
//         ctx.closePath();
//         ctx.fill();
//       }
//       ctx.restore();
//     };

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       for (let i = 0; i < 3; i++) addPiece();
//       for (let i = pieces.length - 1; i >= 0; i--) {
//         const p = pieces[i];
//         p.x += p.vx + Math.sin(p.y / 22) * p.sway;
//         p.y += p.vy;
//         p.vy += 0.0025;
//         if (p.y > canvas.height + 40) pieces.splice(i, 1);
//         else drawPiece(p);
//       }
//       requestAnimationFrame(animate);
//     };

//     window.boostConfetti = (ms = 3000) => {
//       const end = performance.now() + ms;
//       const prev = spawnRate;
//       spawnRate = 0.09;
//       const pump = () => {
//         for (let i = 0; i < 18; i++) addPiece(true);
//         if (performance.now() < end) requestAnimationFrame(pump);
//         else spawnRate = prev;
//       };
//       pump();
//     };
//     animate();
//   };

//   return (
//     <>
//       <div className="bunting-wrap">
//         <div className="bunting">
//           <svg
//             viewBox="0 0 1200 120"
//             preserveAspectRatio="none"
//             aria-hidden="true"
//           >
//             <path
//               d="M0,30 C200,80 400,0 600,50 C800,100 1000,20 1200,70"
//               fill="none"
//               stroke="rgba(255,255,255,0.6)"
//               strokeWidth="4"
//             />
//             <polygon
//               className="flag"
//               points="80,40 120,40 100,95"
//               fill="#FF6FA7"
//             />
//             <polygon
//               className="flag"
//               points="140,30 180,30 160,85"
//               fill="#C8B6FF"
//             />
//             <polygon
//               className="flag"
//               points="200,50 240,50 220,105"
//               fill="#FFB199"
//             />
//             <polygon
//               className="flag"
//               points="260,35 300,35 280,90"
//               fill="#FF6B6B"
//             />
//             <polygon
//               className="flag"
//               points="320,55 360,55 340,110"
//               fill="#FF6FA7"
//             />
//             <polygon
//               className="flag"
//               points="380,40 420,40 400,95"
//               fill="#C8B6FF"
//             />
//             <polygon
//               className="flag"
//               points="440,30 480,30 460,85"
//               fill="#FFB199"
//             />
//             <polygon
//               className="flag"
//               points="500,50 540,50 520,105"
//               fill="#FF6B6B"
//             />
//             <polygon
//               className="flag"
//               points="560,35 600,35 580,90"
//               fill="#FF6FA7"
//             />
//             <polygon
//               className="flag"
//               points="620,55 660,55 640,110"
//               fill="#C8B6FF"
//             />
//             <polygon
//               className="flag"
//               points="680,40 720,40 700,95"
//               fill="#FFB199"
//             />
//             <polygon
//               className="flag"
//               points="740,30 780,30 760,85"
//               fill="#FF6B6B"
//             />
//             <polygon
//               className="flag"
//               points="800,50 840,50 820,105"
//               fill="#FF6FA7"
//             />
//             <polygon
//               className="flag"
//               points="860,35 900,35 880,90"
//               fill="#C8B6FF"
//             />
//             <polygon
//               className="flag"
//               points="920,55 960,55 940,110"
//               fill="#FFB199"
//             />
//             <polygon
//               className="flag"
//               points="980,40 1020,40 1000,95"
//               fill="#FF6B6B"
//             />
//             <polygon
//               className="flag"
//               points="1040,30 1080,30 1060,85"
//               fill="#FF6FA7"
//             />
//             <polygon
//               className="flag"
//               points="1100,50 1140,50 1120,105"
//               fill="#C8B6FF"
//             />
//           </svg>
//         </div>
//       </div>

//       <div className="edge-ribbon edge-left"></div>
//       <div className="edge-ribbon edge-right"></div>

//       <h1 style={{ marginTop: 150 }}>🎉Happy Birthday 🎉</h1>
//       <div className="name-line">Swetha</div>

//       <div className="panel">
//         <div id="countdown" style={{ display: isBirthday ? "none" : "block" }}>
//           {countdown}
//         </div>
//       </div>

//       <div
//         id="message"
//         className="sparkle"
//         style={{ display: isBirthday ? "inline-block" : "none" }}
//       >
//         🎂 Happy Birthday Swetha! 🎂
//       </div>
//       <div id="balloons" style={{ display: isBirthday ? "block" : "none" }}>
//         🎈💗🎊🎉🎀🎉🎊💗🎈
//       </div>

//       <canvas ref={fireworksCanvas} id="fireworks"></canvas>
//       <canvas ref={confettiCanvas} id="confetti"></canvas>

//       <div className="floaters" aria-hidden="true">
//         <span
//           className="floater"
//           style={{ left: "6%", "--x": "40px", "--dur": "14s" }}
//         >
//           💗
//         </span>
//         <span
//           className="floater"
//           style={{
//             left: "18%",
//             "--x": "-30px",
//             "--dur": "16s",
//             animationDelay: "1s",
//           }}
//         >
//           ✨
//         </span>
//         <span
//           className="floater"
//           style={{
//             left: "30%",
//             "--x": "60px",
//             "--dur": "13s",
//             animationDelay: "2.5s",
//           }}
//         >
//           🌟
//         </span>
//         <span
//           className="floater"
//           style={{
//             left: "44%",
//             "--x": "-50px",
//             "--dur": "15s",
//             animationDelay: "0.8s",
//           }}
//         >
//           💖
//         </span>
//         <span
//           className="floater"
//           style={{
//             left: "58%",
//             "--x": "35px",
//             "--dur": "14s",
//             animationDelay: "1.8s",
//           }}
//         >
//           🎀
//         </span>
//         <span
//           className="floater"
//           style={{
//             left: "70%",
//             "--x": "-40px",
//             "--dur": "17s",
//             animationDelay: "0.3s",
//           }}
//         >
//           💞
//         </span>
//         <span
//           className="floater"
//           style={{
//             left: "83%",
//             "--x": "55px",
//             "--dur": "12.5s",
//             animationDelay: "2s",
//           }}
//         >
//           ✨
//         </span>
//       </div>

//       {/* <div className="note">Let the celebrations begin early ✨</div> */}
//     </>
//   );
// };

// export default Home;

// import React, { useState, useEffect, useRef } from "react";
// import "./Home.css";

// const Home = () => {
//   const [isBirthday, setIsBirthday] = useState(false);
//   const fireworksCanvas = useRef(null);
//   const confettiCanvas = useRef(null);
//   const burstEmojis = ["🎉", "✨", "💖", "💗", "🎊"];

//   useEffect(() => {
//     // Initial setup for canvases and event listeners
//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);
//     document.addEventListener("pointerdown", handlePointerDown);

//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//       document.removeEventListener("pointerdown", handlePointerDown);
//     };
//   }, []);

//   const resizeCanvas = () => {
//     if (fireworksCanvas.current) {
//       fireworksCanvas.current.width = window.innerWidth;
//       fireworksCanvas.current.height = window.innerHeight;
//     }
//     if (confettiCanvas.current) {
//       confettiCanvas.current.width = window.innerWidth;
//       confettiCanvas.current.height = window.innerHeight;
//     }
//   };

//   const handlePointerDown = (e) => {
//     for (let i = 0; i < 5; i++) {
//       const s = document.createElement("span");
//       s.className = "burst";
//       s.textContent =
//         burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
//       s.style.left = `${e.clientX + (Math.random() * 24 - 12)}px`;
//       s.style.top = `${e.clientY + (Math.random() * 16 - 8)}px`;
//       s.style.fontSize = `${18 + Math.random() * 10}px`;
//       document.body.appendChild(s);
//       setTimeout(() => s.remove(), 1000);
//     }
//   }; // Manually trigger birthday effects

//   const startCelebration = () => {
//     setIsBirthday(true);
//     launchFireworks();
//     boostConfetti(4500);
//   }; // Fireworks animation

//   const launchFireworks = () => {
//     const canvas = fireworksCanvas.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     let fireworks = [];
//     const hueSet = [330, 340, 350, 300, 20, 25];

//     class Firework {
//       constructor(x, y, hue) {
//         this.x = x;
//         this.y = y;
//         this.hue = hue;
//         this.particles = [];
//         const count = 110;
//         for (let i = 0; i < count; i++) {
//           const angle = Math.random() * Math.PI * 2;
//           const speed = Math.random() * 3.6 + 1.8;
//           this.particles.push({
//             x,
//             y,
//             vx: Math.cos(angle) * speed,
//             vy: Math.sin(angle) * speed,
//             life: 80 + Math.random() * 30,
//             alpha: 1,
//             size: 2,
//           });
//         }
//       }
//       update() {
//         this.particles.forEach((p) => {
//           p.x += p.vx;
//           p.y += p.vy;
//           p.vx *= 0.985;
//           p.vy = p.vy * 0.985 + 0.05;
//           p.life -= 1;
//           p.alpha = Math.max(0, p.life / 110);
//         });
//       }
//       draw(ctx) {
//         this.particles.forEach((p) => {
//           if (p.life > 0) {
//             ctx.fillStyle = `hsla(${this.hue}, 90%, 70%, ${p.alpha})`;
//             ctx.fillRect(p.x, p.y, p.size, p.size);
//           }
//         });
//       }
//       done() {
//         return this.particles.every((p) => p.life <= 0);
//       }
//     }

//     const animate = () => {
//       ctx.globalCompositeOperation = "source-over";
//       ctx.fillStyle = "rgba(0, 0, 0, 0.20)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//       ctx.globalCompositeOperation = "lighter";

//       if (Math.random() < 0.06) {
//         fireworks.push(
//           new Firework(
//             Math.random() * canvas.width,
//             Math.random() * canvas.height * 0.45 + 40,
//             hueSet[Math.floor(Math.random() * hueSet.length)]
//           )
//         );
//       }

//       for (let i = fireworks.length - 1; i >= 0; i--) {
//         const fw = fireworks[i];
//         fw.update();
//         fw.draw(ctx);
//         if (fw.done()) fireworks.splice(i, 1);
//       }
//       requestAnimationFrame(animate);
//     };
//     animate();
//   }; // Confetti animation

//   const boostConfetti = (ms = 3000) => {
//     const canvas = confettiCanvas.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     const colors = ["#FF6FA7", "#FF6B6B", "#C8B6FF", "#FFB199"];
//     let pieces = [];
//     let spawnRate = 0.018;

//     const addPiece = (force = false) => {
//       if (!force && Math.random() > spawnRate) return;
//       const size = Math.random() * 6 + 4;
//       pieces.push({
//         x: Math.random() * canvas.width,
//         y: -20,
//         vx: (Math.random() - 0.5) * 0.6,
//         vy: Math.random() * 0.7 + 0.6,
//         sway: Math.random() * 0.6 + 0.2,
//         s: size,
//         color: colors[Math.floor(Math.random() * colors.length)],
//         shape: Math.random() < 0.5 ? "rect" : "tri",
//       });
//     };

//     const drawPiece = (p) => {
//       ctx.save();
//       ctx.translate(p.x, p.y);
//       ctx.fillStyle = p.color;
//       if (p.shape === "rect") {
//         ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s);
//       } else {
//         ctx.beginPath();
//         ctx.moveTo(0, -p.s / 1.4);
//         ctx.lineTo(p.s / 1.2, p.s / 1.2);
//         ctx.lineTo(-p.s / 1.2, p.s / 1.2);
//         ctx.closePath();
//         ctx.fill();
//       }
//       ctx.restore();
//     };

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       for (let i = 0; i < 3; i++) addPiece();
//       for (let i = pieces.length - 1; i >= 0; i--) {
//         const p = pieces[i];
//         p.x += p.vx + Math.sin(p.y / 22) * p.sway;
//         p.y += p.vy;
//         p.vy += 0.0025;
//         if (p.y > canvas.height + 40) pieces.splice(i, 1);
//         else drawPiece(p);
//       }
//       requestAnimationFrame(animate);
//     };

//     window.boostConfetti = (ms = 3000) => {
//       const end = performance.now() + ms;
//       const prev = spawnRate;
//       spawnRate = 0.09;
//       const pump = () => {
//         for (let i = 0; i < 18; i++) addPiece(true);
//         if (performance.now() < end) requestAnimationFrame(pump);
//         else spawnRate = prev;
//       };
//       pump();
//     };
//     animate();
//   };

//   return (
//     <>
//            {" "}
//       <div className="bunting-wrap">
//                {" "}
//         <div className="bunting">
//                    {" "}
//           <svg
//             viewBox="0 0 1200 120"
//             preserveAspectRatio="none"
//             aria-hidden="true"
//           >
//                        {" "}
//             <path
//               d="M0,30 C200,80 400,0 600,50 C800,100 1000,20 1200,70"
//               fill="none"
//               stroke="rgba(255,255,255,0.6)"
//               strokeWidth="4"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="80,40 120,40 100,95"
//               fill="#FF6FA7"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="140,30 180,30 160,85"
//               fill="#C8B6FF"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="200,50 240,50 220,105"
//               fill="#FFB199"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="260,35 300,35 280,90"
//               fill="#FF6B6B"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="320,55 360,55 340,110"
//               fill="#FF6FA7"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="380,40 420,40 400,95"
//               fill="#C8B6FF"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="440,30 480,30 460,85"
//               fill="#FFB199"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="500,50 540,50 520,105"
//               fill="#FF6B6B"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="560,35 600,35 580,90"
//               fill="#FF6FA7"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="620,55 660,55 640,110"
//               fill="#C8B6FF"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="680,40 720,40 700,95"
//               fill="#FFB199"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="740,30 780,30 760,85"
//               fill="#FF6B6B"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="800,50 840,50 820,105"
//               fill="#FF6FA7"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="860,35 900,35 880,90"
//               fill="#C8B6FF"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="920,55 960,55 940,110"
//               fill="#FFB199"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="980,40 1020,40 1000,95"
//               fill="#FF6B6B"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="1040,30 1080,30 1060,85"
//               fill="#FF6FA7"
//             />
//                        {" "}
//             <polygon
//               className="flag"
//               points="1100,50 1140,50 1120,105"
//               fill="#C8B6FF"
//             />
//                      {" "}
//           </svg>
//                  {" "}
//         </div>
//              {" "}
//       </div>
//             <div className="edge-ribbon edge-left"></div>     {" "}
//       <div className="edge-ribbon edge-right"></div>     {" "}
//       <h1 style={{ marginTop: 150 }}>🎉Happy Birthday 🎉</h1>     {" "}
//       <div className="name-line">Swetha</div>     {" "}
//       <div className="panel">
//                 {/* The button to manually trigger the celebration */}       {" "}
//         <button
//           onClick={startCelebration}
//           className="celebration-button"
//           style={{ display: isBirthday ? "none" : "block" }}
//         >
//                     ✨ Click to Begin! ✨        {" "}
//         </button>
//              {" "}
//       </div>
//            {" "}
//       <div
//         id="message"
//         className="sparkle"
//         style={{ display: isBirthday ? "inline-block" : "none" }}
//       >
//                 🎂 Happy Birthday Swetha! 🎂      {" "}
//       </div>
//            {" "}
//       <div id="balloons" style={{ display: isBirthday ? "block" : "none" }}>
//                 🎈💗🎊🎉🎀🎉🎊💗🎈      {" "}
//       </div>
//             <canvas ref={fireworksCanvas} id="fireworks"></canvas>     {" "}
//       <canvas ref={confettiCanvas} id="confetti"></canvas>     {" "}
//       <div className="floaters" aria-hidden="true">
//                {" "}
//         <span
//           className="floater"
//           style={{ left: "6%", "--x": "40px", "--dur": "14s" }}
//         >
//                     💗        {" "}
//         </span>
//                {" "}
//         <span
//           className="floater"
//           style={{
//             left: "18%",
//             "--x": "-30px",
//             "--dur": "16s",
//             animationDelay: "1s",
//           }}
//         >
//                     ✨        {" "}
//         </span>
//                {" "}
//         <span
//           className="floater"
//           style={{
//             left: "30%",
//             "--x": "60px",
//             "--dur": "13s",
//             animationDelay: "2.5s",
//           }}
//         >
//                     🌟        {" "}
//         </span>
//                {" "}
//         <span
//           className="floater"
//           style={{
//             left: "44%",
//             "--x": "-50px",
//             "--dur": "15s",
//             animationDelay: "0.8s",
//           }}
//         >
//                     💖        {" "}
//         </span>
//                {" "}
//         <span
//           className="floater"
//           style={{
//             left: "58%",
//             "--x": "35px",
//             "--dur": "14s",
//             animationDelay: "1.8s",
//           }}
//         >
//                     🎀        {" "}
//         </span>
//                {" "}
//         <span
//           className="floater"
//           style={{
//             left: "70%",
//             "--x": "-40px",
//             "--dur": "17s",
//             animationDelay: "0.3s",
//           }}
//         >
//                     💞        {" "}
//         </span>
//                {" "}
//         <span
//           className="floater"
//           style={{
//             left: "83%",
//             "--x": "55px",
//             "--dur": "12.5s",
//             animationDelay: "2s",
//           }}
//         >
//                     ✨        {" "}
//         </span>
//              {" "}
//       </div>
//          {" "}
//     </>
//   );
// };

// export default Home;

import React, { useState, useEffect, useRef } from "react";
import "./Home.css";

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
                🎂 Happy Birthday Swetha! 🎂      {" "}
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
