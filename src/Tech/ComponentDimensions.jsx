import React, {useEffect, useState} from 'react';

// https://stackoverflow.com/a/59989768 and https://stackoverflow.com/a/60978633

export default function ComponentDimensions(componentRef) {
    const getDimensions = () => ({
        componentWidth: componentRef.current.offsetWidth,
        componentHeight: componentRef.current.offsetHeight
      })
    
      const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    
      useEffect(() => {
        const handleResize = () => {
          setTimeout(() => setDimensions(getDimensions()), 500);
        }
    
        if (componentRef.current) {
          setDimensions(getDimensions())
        }
    
        window.addEventListener("resize", handleResize)
    
        return () => {
          window.removeEventListener("resize", handleResize)
        }
      }, [componentRef])
    
      return dimensions;
  }