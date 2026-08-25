import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      const target = event.target as HTMLElement | null;
      setIsHovering(Boolean(target?.closest('button, a, [role="button"]')));
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div aria-hidden="true" className="custom-cursor-layer hidden md:block">
      <span className={`custom-cursor-dot ${isHovering ? 'is-hovering' : ''}`} style={{ left: position.x, top: position.y }} />
      <span className={`custom-cursor-ring ${isHovering ? 'is-hovering' : ''}`} style={{ left: position.x, top: position.y }} />
    </div>
  );
};
