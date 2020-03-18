import React from 'react';

import { Grid } from '@material-ui/core';
import './Header.css';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import DebugLog from 'Tech/DebugLog';


function DateComp() {
    const event = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div className="date">
            {event.toLocaleDateString('en-US', options)}
        </div>
        );
}


export default class Header extends React.Component{
    constructor(props) {
        super(props);
    }

    dispatchResizeOnMount() {
        let resizeEvent = window.document.createEvent('UIEvents'); 
        resizeEvent.initUIEvent('resize', true, false, window, 0); 
        window.dispatchEvent(resizeEvent);
        DebugLog("Header: Manually dispatched resize event.");
    }

    componentDidMount() {
        setTimeout(this.dispatchResizeOnMount, 100);
    }

    render() {
        return (
        <div className="headerContainer" id="header">
            <div className="headerWrapper">
                <Link to="">
                    <div  className="title">
                    The Davis Report
                    </div>
                </Link>   

                <Grid container className="subtitle">

                    <Grid item xs={4} className="dropdown" style={{textAlign: "left"}}>
                        <Nav></Nav>
                    </Grid>

                    <Grid item xs={4}>
                        <DateComp></DateComp>
                    </Grid>

                    <Grid item xs={4} style={{textAlign: "right"}}>
                        <div className="price-block">
                            <p>
                                <b>5&#162; &nbsp;</b>
                                | Rochester, NY
                                <br/>
                                ISSUED: 03-12-2020
                            </p>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
        );};
}
