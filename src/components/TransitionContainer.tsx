import React, { useEffect, useRef, useState } from 'react';

interface TransitionContainerProps {
  children: React.ReactNode;
}

export default function TransitionContainer({ children }: TransitionContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const containerElement = containerRef.current;
    if (containerElement && isMounted) {
      containerElement.style.opacity = '1';
    }
  }, [isMounted]);

  return (
    <div
      style={{
        opacity: isMounted ? 1 : 0,
        transition: 'opacity 0.6s ease-in-out',
        WebkitTransition: 'opacity 0.6s ease-in-out',
      }}
      ref={containerRef}
    >
      {children}
    </div>
  );
}
