import {React, useEffect, useState} from 'react';
import { DebugDir } from './DebugLog';

// https://stackoverflow.com/a/59989768 and https://stackoverflow.com/a/60978633

export default function ComponentDimensions(componentRef) {
    const getDimensions = () => ({
        width: componentRef.current.offsetWidth,
        height: componentRef.current.offsetHeight
      })

      DebugDir(componentRef);
    
      const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    
      useEffect(() => {
        const handleResize = () => {
          setDimensions(getDimensions())
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