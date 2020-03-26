
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import Featured from './Projects/Featured';
import Audio from './Projects/Audio'
import Games from './Projects/Games';
import Web from './Projects/Web';
import Graphics from './Projects/Graphics';
import Contact from './Contact';

const useStyles = makeStyles({
    content: {  
        display: 'inline-block',
        margin: '0 2% 0 2%',
        textAlign: 'center',
    }
});

export default function ContentBody(props) {

    const classes = useStyles();


    return (<div className={classes.content}>
        <Featured></Featured>
        <Audio></Audio>
        <Games></Games>
        <Web></Web>
        <Graphics></Graphics>

        <Contact></Contact>
</div>);
}