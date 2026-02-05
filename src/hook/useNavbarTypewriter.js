import { useEffect, useState } from "react";

export const useNavbarTypewriter = () => {
  const [text, setText] = useState("");
  const [step, setStep] = useState(0);
  const [index, setIndex] = useState(0);

  const messages = [
    "Hello, World..",
    "I’m Ashish...",
  ];

  useEffect(() => {
    let timeout;

    // Typing forward
    if (index < messages[step].length) {
      timeout = setTimeout(() => {
        setText(messages[step].slice(0, index + 1));
        setIndex(index + 1);
      }, 70);
    }
    // Pause after first message
    else if (step === 0) {
      timeout = setTimeout(() => {
        setIndex(0);
        setText("");
        setStep(1);
      }, 1200); // pause duration
    }

    return () => clearTimeout(timeout);
  }, [index, step]);

  return text;
};
