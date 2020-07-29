import {React, useEffect, useState} from 'react';
import { DebugDir } from './DebugLog';
import DebugLog from './DebugLog';

// https://stackoverflow.com/a/59989768 and https://stackoverflow.com/a/60978633

export default function ComponentDimensions(componentRef) {
    const getDimensions = () => ({
        width: componentRef.current.offsetWidth,
        height: componentRef.current.offsetHeight
      })
    
      const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    
      useEffect(() => {
        const handleResize = () => {
          setTimeout(() => setDimensions(getDimensions()), 1000);
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