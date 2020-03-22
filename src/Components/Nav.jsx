import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import Icon from '@material-ui/core/Icon';
import './Nav.css';
import { Button, Menu, MenuItem } from '@material-ui/core';

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
        setPageTitle(
            getPageTitle((pageNum < 0)? 0 : pageNum));
    });

    const PageLinks = Pages.map((p, i) => {
        return (
            <MenuItem onClick={close}>
        <Link 
            className="dropdown-link"
            to={p.route} key={`${i+1}: ${p.name}`}
            >{p.name}
        </Link>
        </MenuItem>);
    });

        
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = event => {
        setAnchorEl(event.currentTarget);
    };

    const close = () => {
        setAnchorEl(null);
    };

    return (
        <div className="dropdown"
            onMouseExit={close}
            onMouseEnter={open}
        >
            <Button 
                className="dropbtn hoverable" 
            >
                    {pageTitle}
                    <Icon className="fa fa-caret-down"></Icon>
            </Button>

            <Menu 
            className="dropdown-content"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={close}
            style={{padding: 0}}
            >
                <span 
                style={{width: '101%', height:'101%'}}
                onMouseLeave={close}
                >
                    {PageLinks}
                </span>
            </Menu>


        </div>
)};

/*

        <div className="dropdown">
            <button className="dropbtn hoverable">
                    {pageTitle}
                    <Icon className="fa fa-caret-down"></Icon>
            </button>

            <div className="dropdown-content">
                {PageLinks}
            </div>
        </div>
*/

export default withRouter(Nav);