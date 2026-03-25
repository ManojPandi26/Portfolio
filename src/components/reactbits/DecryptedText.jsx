import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * DecryptedText — text that starts as random glitch characters
 * and resolves into the actual text, character by character.
 * Inspired by React Bits DecryptedText component.
 */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export default function DecryptedText({
  text = '',
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  characters = CHARS,
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'view',    // 'view' | 'hover'
  style = {},
}) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const iterRef = useRef(0);
  const intervalRef = useRef(null);

  const randomChar = useCallback(() => {
    return characters[Math.floor(Math.random() * characters.length)];
  }, [characters]);

  const startDecrypt = useCallback(() => {
    if (isAnimating || hasAnimated) return;
    setIsAnimating(true);
    iterRef.current = 0;

    const revealed = new Array(text.length).fill(false);
    let revealIndex = revealDirection === 'start' ? 0 : text.length - 1;

    intervalRef.current = setInterval(() => {
      iterRef.current++;

      if (sequential) {
        // Reveal one character at a time
        if (revealDirection === 'start') {
          if (revealIndex < text.length) {
            revealed[revealIndex] = true;
            revealIndex++;
          }
        } else {
          if (revealIndex >= 0) {
            revealed[revealIndex] = true;
            revealIndex--;
          }
        }
      }

      const newText = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (sequential && revealed[i]) return char;
          if (!sequential && iterRef.current > maxIterations * ((i + 1) / text.length)) return char;
          return randomChar();
        })
        .join('');

      setDisplayText(newText);

      const allRevealed = newText === text;
      if (allRevealed || iterRef.current > maxIterations * 2) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsAnimating(false);
        setHasAnimated(true);
      }
    }, speed);
  }, [text, speed, maxIterations, sequential, revealDirection, randomChar, isAnimating, hasAnimated]);

  // Auto-animate on view
  useEffect(() => {
    if (animateOn !== 'view') {
      setDisplayText(text.split('').map(c => c === ' ' ? ' ' : randomChar()).join(''));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startDecrypt();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animateOn, startDecrypt]);

  return (
    <span
      ref={ref}
      className={parentClassName}
      onMouseEnter={animateOn === 'hover' ? startDecrypt : undefined}
      style={{
        display: 'inline-block',
        ...style,
      }}
    >
      {displayText.split('').map((char, i) => (
        <span
          key={i}
          className={char !== text[i] ? encryptedClassName : className}
          style={{
            opacity: char !== text[i] ? 0.4 : 1,
            transition: 'opacity 0.15s ease',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
