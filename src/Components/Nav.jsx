import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import Icon from '@material-ui/core/Icon';
import './Nav.css';
import { Button, Menu, MenuItem, Paper } from '@material-ui/core';
import DebugLog from 'Tech/DebugLog';

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
        <MenuItem onClick={close} key={`${i+1}: ${p.name}`}>
            <Link 
                className="dropdown-link"
                to={p.route}
                >{p.name}
            </Link>
        </MenuItem>);
    });

        
    const [anchorEl, setAnchorEl] = React.useState(null);

    const bb = {minx: 0, miny: 0, maxx:0, maxy:0};
    let bbSet = false;

    const checkMouse = (e) => {
        if(!bbSet) {
            try{
                const ul = document.getElementById('dropdown-menu').getElementsByTagName('ul')[0];
    
                bb.minx = ul.offsetLeft;
                bb.miny = ul.offsetTop;
                bb.maxx = bb.minx + ul.offsetWidth;
                bb.maxy = bb.miny + ul.offsetHeight;

                bbSet=true;

                console.dir(bb);
            }
            catch(e) {
                DebugLog("Can't find element");
            }
        }

        if(
            e.clientX < bb.minx ||
            e.clientX > bb.maxx ||
            e.clientY < bb.miny ||
            e.clientY > bb.maxy
        ){

            console.log(`
            mouseX: ${e.clientX}
            mouseY: ${e.clientY}
            `);

            close();
        }
    }

    function watchMouse(){
        window.addEventListener('mousemove', checkMouse);
    }

    const open = event => {
        setAnchorEl(event.currentTarget);
        watchMouse();
        DebugLog("%cMenu Opened", "color: green");
    };

    const close = () => {
        setAnchorEl(null);
        window.removeEventListener('mousemove', checkMouse);
        bbSet=false;
        DebugLog("%cMenu Closed", "color: green");
    };

    return (
        <div className="dropdown"
            onMouseEnter={open}
            onMouseLeave={close}
        >
            <Button className="dropbtn hoverable" >
                {pageTitle}
                <Icon className="fa fa-caret-down"></Icon>
            </Button>

            <Menu 
            id="dropdown-menu"
            className="dropdown-content"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={close}
            style={{padding: 0}}
            >
                {PageLinks}
            </Menu>


        </div>
)};

export default withRouter(Nav);