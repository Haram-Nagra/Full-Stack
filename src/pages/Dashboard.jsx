import React, { useEffect, useState } from 'react';
import gsap from "gsap";

const Dashboard = () => {
  const [isGradient, setIsGradient] = useState(false);

  useEffect(() => {
    // GSAP for other animations
    gsap.fromTo("#red-box", {
      x: 0,
      rotation: 0,
      scale: 1,
    }, {
      x: -150,
      y:-200,
      rotation: 720,
      scale: 2,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      onComplete: () => setIsGradient(true), // Add gradient class when animation completes
    });
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-primary">
      <h1
        id="red-box"
        className={`text-orange-200 text-4xl mb-8 ${isGradient ? "orange-text-gradient" : ""}`}
      >
        Dashboard
      </h1>
    </div>
  );
};

export default Dashboard;
