import React from 'react';
import {Link} from 'react-router-dom';

import Icon from '@material-ui/core/Icon';
import './Nav.css';

export default function Nav() { 
    return (
        <div>
            <button className="dropbtn hoverable">
                <span>Page &mdash; 1A: Headlines<Icon className="fa fa-caret-down"></Icon></span>
            </button>

            <div className="dropdown-content">
                <Link className="dropdown-link" to="/"          >1A: Headlines</Link>
                <Link className="dropdown-link" to="/games"     >2A: Game Projects</Link>
                <Link className="dropdown-link" to="/audio"     >2B: Audio Projects</Link>
                <Link className="dropdown-link" to="/web"       >2C: Web Projects</Link>
                <Link className="dropdown-link" to="/graphics"  >2D: Graphics &amp; Misc</Link>
                <Link className="dropdown-link" to="/contact"   >3A: Write to the Editor</Link>
            </div>
        </div>
)};

