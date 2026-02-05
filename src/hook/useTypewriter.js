import { useEffect, useState } from "react";

export const useTypewriter = (
  text,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseTime = 1500
) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (!isDeleting && index < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, index + 1));
        setIndex(index + 1);
      }, typingSpeed);
    } 
    else if (!isDeleting && index === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } 
    else if (isDeleting && index > 0) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, index - 1));
        setIndex(index - 1);
      }, deletingSpeed);
    } 
    else if (isDeleting && index === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [text, index, isDeleting]);

  return displayText;
};
