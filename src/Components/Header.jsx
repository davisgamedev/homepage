import React, { useEffect } from 'react';

import { NativeSelect, Grid } from '@material-ui/core';
import './Header.css';
import Nav from './Nav';

export default function Header(props){

    const { ...rest } = props;

    const event = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const dropLabelId = 'dropLabel';
    

    useEffect(() => {
        // let title = document.getElementById(titleId);
        // title.style.fontFamily = 'Playfair Display';
    });

    // will have to add an img tag
    return (
        <div className="container">
            <div className="headerWrapper">
                <div className="title">
                    The Davis Report
                </div>   

                <Grid container className="subtitle">

                    <Grid item xs={4} className="dropdown" style={{textAlign: "left"}}>

                        <Nav></Nav>

                    </Grid>

                    <Grid item xs={4}>
                        <div className="date">
                            {event.toLocaleDateString('en-US', options)}
                        </div>
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
        );
}
