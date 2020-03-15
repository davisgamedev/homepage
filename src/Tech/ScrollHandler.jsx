import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';



// modified from https://stackoverflow.com/a/56250408


const ScrollHandler = ({ location, history }) => {
    React.useEffect(
      () => {
        // Link navigates to #frag to stay on the page, frag is replaced

        const id = location.pathname.replace("/", "");
        const element = document.getElementById(id);
        //history.push(`/${id}`);
  
        setTimeout(() => {
          window.scrollTo({
            behavior: element ? "smooth" : "auto",
            top: element ? element.offsetTop : 0
          });
        }, 100);


      }, [location]);
  
    return(<span></span>);
  };
  
ScrollHandler.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.any,
      key: PropTypes.string
    }).isRequired
};

export default withRouter(ScrollHandler);