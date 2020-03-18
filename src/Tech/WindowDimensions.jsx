import { useState, useEffect } from 'react';


// from https://stackoverflow.com/a/36862446

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function WindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

/* USE:

const Component = () => {
  const { height, width } = WindowDimensions();

  return (
    <div>
      width: {width} ~ height: {height}
    </div>
  );
}

*/
