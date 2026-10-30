import React from "react";
import { useNavbarTypewriter } from "../hook/useNavbarTypewriter";

const Loader = () => {
  const typedText = useNavbarTypewriter();
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-ink-950">
      <span className="text-lg tracking-wide text-white/90">
        {typedText}
        <span className="ml-1 inline-block h-5 w-0.5 animate-pulse bg-primary align-middle" />
      </span>
    </div>
  );
};

export default Loader;
