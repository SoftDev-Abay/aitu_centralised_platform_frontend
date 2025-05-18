import React, { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for classNames

interface SectionProps {
  children: ReactNode;
  variant?: "default" | "wide" | "narrow" | "large"; // Variants for different max-width styles
  className?: string; // Allow additional custom classes
}

const Section: React.FC<SectionProps> = ({
  children,
  variant = "default",
  className,
}) => {
  const baseStyles = "w-full flex justify-center px-16"; // Base styles for centering
  const variantStyles = {
    default: "max-w-[1008px]", // Max width for default variant
    narrow: "max-w-[874px]", // Max width for narrow variant
    wide: "max-w-[1245px]", // Max width for wide variant
    large: "max-w-[1500px]", // Max width for wide variant
  };

  return (
    <section className={cn(baseStyles, className)}>
      <div className={cn("w-full", variantStyles[variant])}>{children}</div>
    </section>
  );
};

export default Section;
