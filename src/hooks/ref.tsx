import React, { useRef, useEffect } from 'react';

const MyComponent: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.backgroundColor = 'yellow';
    }
  }, []);

  return (
    <div ref={divRef}>
      This div will have a yellow background after rendering.
    </div>
  );
};

export default MyComponent;
