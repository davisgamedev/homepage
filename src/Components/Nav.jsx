import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import Icon from '@material-ui/core/Icon';
import './Nav.css';

export const Pages = [
    { route: "/"         , name: "Headlines", },
    { route: "/games"    , name: "Game Projects", },
    { route: "/audio"    , name: "Audio Projects", },
    { route: "/web"      , name: "Web Projects", },
    { route: "/graphics" , name: "Graphics & Misc Projects", },
    { route: "/contact"  , name: "Write to the Editor", },
];

/*
    - TODO:
        - Active nav link changes with scroll view
        - URL changes with scroll view, without updating ScrollHandler
*/

function Nav({location}) { 

    function getPageTitle(i) {
        return `Page ${i+1} — ${Pages[i].name}`;
    }

    const [pageTitle, setPageTitle] = React.useState(getPageTitle(0));
    
    React.useEffect(() => {
        const pageNum = Pages.findIndex(p => p.route === location.pathname);
        setPageTitle(getPageTitle(pageNum));
    });

    const PageLinks = Pages.map((p, i) => {
        return (
        <Link 
            className="dropdown-link"
            to={p.route} key={`${i+1}: ${p.name}`}
            >{p.name}
        </Link>);
    });

    return (
        <div className="dropdown">
            <button className="dropbtn hoverable">
                    {pageTitle}
                    <Icon className="fa fa-caret-down"></Icon>
            </button>

            <div className="dropdown-content">
                {PageLinks}
            </div>
        </div>
)};

export default withRouter(Nav);