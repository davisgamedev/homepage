import React from 'react';
import { withRouter } from 'react-router-dom';

import HeaderHeight from './HeaderHeight';
import DebugLog from './DebugLog';

import { Pages } from '../Components/Nav';

// modified from https://stackoverflow.com/a/56250408

const ScrollHandler = ({ location, history }) => {

    const height = HeaderHeight();
    
    function getElementFromPath() {
      const id = location.pathname.replace("/", "");
      return document.getElementById(id);
    }


    React.useEffect(
      () => {
        const element = getElementFromPath();
        let scrollTarget =  element ? element.offsetTop : 0;
        scrollTarget -= height;

        setTimeout(() => {

          DebugLog(`Scrolling to ${scrollTarget}, which is ${scrollTarget - window.scrollY} lower.`);

          window.scrollTo({
            //behavior: element ? "smooth" : "auto",
            behavior: "smooth",
            top: scrollTarget
          });

        }, 100);


      }, [location]);
  
    return(<span></span>);
  };

export default withRouter(ScrollHandler);