import React from "react";
import { cn } from "@/lib/utils";

interface GlowBackgroundProps {
  className?: string;
  intensity?: "low" | "medium" | "high";
  color?: "pink" | "red" | "dual" | "purple";
  position?: "top-center" | "top-right" | "top-left" | "center" | "bottom-center";
}

export const GlowBackground: React.FC<GlowBackgroundProps> = ({
  className,
  intensity = "medium",
  color = "dual",
  position = "center",
}) => {
  const opacityMap = {
    low: "opacity-20",
    medium: "opacity-35",
    high: "opacity-50",
  };

  const positionMap = {
    "top-center": "top-[-15%] left-1/2 -translate-x-1/2",
    "top-right": "top-[-10%] right-[-10%]",
    "top-left": "top-[-10%] left-[-10%]",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "bottom-center": "bottom-[-15%] left-1/2 -translate-x-1/2",
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute select-none overflow-hidden -z-10",
        positionMap[position],
        className
      )}
      aria-hidden="true"
    >
      {color === "dual" && (
        <div className="relative w-[320px] sm:w-[550px] lg:w-[850px] h-[320px] sm:h-[550px] lg:h-[850px]">
          <div
            className={cn(
              "absolute w-3/4 h-3/4 rounded-full bg-brand-pink blur-[90px] sm:blur-[140px] animate-pulse-glow",
              opacityMap[intensity]
            )}
            style={{ top: "0%", left: "10%" }}
          />
          <div
            className={cn(
              "absolute w-3/4 h-3/4 rounded-full bg-brand-red blur-[90px] sm:blur-[140px]",
              opacityMap[intensity]
            )}
            style={{ bottom: "0%", right: "10%" }}
          />
        </div>
      )}

      {color === "pink" && (
        <div
          className={cn(
            "w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] rounded-full bg-brand-pink blur-[100px] sm:blur-[150px]",
            opacityMap[intensity]
          )}
        />
      )}

      {color === "red" && (
        <div
          className={cn(
            "w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] rounded-full bg-brand-red blur-[100px] sm:blur-[150px]",
            opacityMap[intensity]
          )}
        />
      )}

      {color === "purple" && (
        <div
          className={cn(
            "w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] rounded-full bg-purple-600 blur-[100px] sm:blur-[150px]",
            opacityMap[intensity]
          )}
        />
      )}
    </div>
  );
};

