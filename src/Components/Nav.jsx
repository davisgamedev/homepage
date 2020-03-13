import React from 'react';

import Icon from '@material-ui/core/Icon';
import './Nav.css';

export default function Nav() { 
    return (
        <div>
            <button className="dropbtn hoverable">
                <span>Page &mdash; 1A: Headlines<Icon className="fa fa-caret-down"></Icon></span>
            </button>

            <div className="dropdown-content">
                <a className="dropdown-link" href="#">1A: Headlines</a>
                <a className="dropdown-link" href="#">2A: Game Projects</a>
                <a className="dropdown-link" href="#">2B: Audio Projects</a>
                <a className="dropdown-link" href="#">2C: Web Projects</a>
                <a className="dropdown-link" href="#">2D: Graphics &amp; Misc</a>
                <a className="dropdown-link" href="#">3A: Write to the Editor</a>
            </div>
        </div>
)};

