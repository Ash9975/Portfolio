import React from 'react';
import { useNavbarTypewriter } from "../hook/useNavbarTypewriter";
import './Loader.css';

const Loader = () => {

  const typedText = useNavbarTypewriter();
  return (
    <div className='container'>
      <span className="typing-text">{typedText}</span>
    </div>
  );
};

export default Loader;

