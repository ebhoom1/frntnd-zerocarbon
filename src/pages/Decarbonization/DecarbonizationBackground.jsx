import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "@tsparticles/slim"; // Correct import path

const DecarbonizationBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log("Particles engine loaded:", engine);
    await loadSlim(engine); // Proper initialization
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Particles
        init={particlesInit}
        options={{
          background: {
            color: "#2E7D32", // Green eco-friendly theme
          },
          particles: {
            number: { value: 100, density: { enable: true, area: 800 } },
            color: { value: ["#ffffff", "#b3e5fc", "#80deea"] }, // White and blue-green particles
            shape: { type: "circle" },
            opacity: { value: 0.7, random: true },
            size: { value: { min: 2, max: 6 }, random: true },
            move: {
              enable: true,
              speed: 1.5,
              direction: "top",
              outModes: { default: "out" },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>Your Path to Net Zero</h1>
        <p style={{ maxWidth: "600px", fontSize: "1.2rem" }}>
          Reduce carbon emissions with personalized roadmaps and real-time monitoring.
        </p>
      </div>
    </div>
  );
};

export default DecarbonizationBackground;
