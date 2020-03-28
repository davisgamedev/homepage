import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import Icon from '@material-ui/core/Icon';
import './Nav.css';
import { Button, Menu, MenuItem } from '@material-ui/core';
import DebugLog, {Debug} from 'Tech/DebugLog';

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
        - URL changes with scroll view, without updating RouteUpdateHandler
*/

function Nav(props) { 

    function getPageTitle(i) {
        return `Page ${i+1} — ${Pages[i].name}`;
    }

    const [pageTitle, setPageTitle] = React.useState(getPageTitle(0));
    
    React.useEffect(() => {
        const pageNum = Pages.findIndex(p => p.route === props.location.pathname);
        setPageTitle(
            getPageTitle((pageNum < 0)? 0 : pageNum));
    });

    const PageLinks = Pages.map((p, i) => {
        return (
        <MenuItem 
        className={"dropdown-link"}
        onClick={()=> {
            close();
            props.history.push(p.route)
        }} 
        key={`${i+1}: ${p.name}`}
        >
            <Link 
                to={p.route}
                >{p.name}
            </Link>
        </MenuItem>);
    });

        
    const [anchorEl, setAnchorEl] = React.useState(null);

    let bb;
    let btnbb;
    let bbSet = false;

    function checkMouseBB(e, bb) {
        return(
            e.clientX < bb.x ||
            e.clientX > bb.w ||
            e.clientY < bb.y ||
            e.clientY > bb.h);
    }

    function setBB(bb) {
        bb.w = bb.right + bb.x;
        bb.h = bb.bottom + bb.y;
        bb.y -= 10;
    }

    const checkMouse = (e) => {
        if(!bbSet) {
            const els = document.getElementById('dropdown-menu')
                                .getElementsByTagName('div');
            const el = els[2];

            bb = el.getBoundingClientRect();
            
            btnbb = document.getElementById('dropdown-btn')
                                     .getBoundingClientRect();

            // DebugLog(el);
            // DebugLog(btnbb);

            setBB(bb);
            setBB(btnbb);

            bbSet=true;

            // DebugDir(bb);
        }

        if(checkMouseBB(e, btnbb) && checkMouseBB(e, bb)) {
            close();

            return; //comment out to debug nav closing
            if(Debug) {
                if(e.clientX < bb.x) DebugLog('x min');
                if(e.clientX > bb.w) DebugLog('x max');
                if(e.clientY < bb.y) DebugLog('y min');
                if(e.clientY > bb.h) DebugLog('y max');
    
                DebugLog(`
                mouseX: ${e.clientX}
                mouseY: ${e.clientY}
                `);
            }
        }
    }

    const open = event => {
        setAnchorEl(event.currentTarget);
        window.addEventListener('mousemove', checkMouse);
        DebugLog("%cMenu Opened", "color: green");
    };

    const close = () => {
        setAnchorEl(null);
        window.removeEventListener('mousemove', checkMouse);
        bbSet=false;
        DebugLog("%cMenu Closed", "color: green");
    };

    return (
        <div className="dropdown">
            <Button 
            id="dropdown-btn"
            className="dropbtn hoverable" 
            onMouseEnter={open} 
            onClick={open}
            >
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