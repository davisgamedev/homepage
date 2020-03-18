import React from 'react';
import { withRouter } from 'react-router-dom';

import HeaderHeight from './HeaderHeight';

// modified from https://stackoverflow.com/a/56250408

const ScrollHandler = ({ location, headerId }) => {

    const height = HeaderHeight();

    React.useEffect(
      () => {

        const id = location.pathname.replace("/", "");
        //if(id === "") id = "featured";
        const element = document.getElementById(id);


        setTimeout(() => {
          console.log(height);
          window.scrollTo({
            //behavior: element ? "smooth" : "auto",
            behavior: "smooth",
            top: element ? (element.offsetTop - height) : -height
          });
        }, 100);


      }, [location]);
  
    return(<span></span>);
  };

export default withRouter(ScrollHandler);