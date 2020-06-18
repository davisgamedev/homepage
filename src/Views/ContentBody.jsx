
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import Featured from './Projects/Featured';
import Audio from './Projects/Audio'
import Games from './Projects/Games';
import Web from './Projects/Web';
import Graphics from './Projects/Graphics';
import Contact from './Contact';
import CloudinaryContext from 'cloudinary-react/lib/components/CloudinaryContext/CloudinaryContext';

const useStyles = makeStyles({
    content: {  
        display: 'inline-block',
        margin: '0 2% 0 2%',
        textAlign: 'center',
    }
});

export default function ContentBody(props) {

    const classes = useStyles();


    return (<CloudinaryContext cloudName={'dyzmnhqpr'} className={classes.content}>
        <Featured></Featured>
        <Audio></Audio>
        <Games></Games>
        <Web></Web>
        <Graphics></Graphics>

        <Contact></Contact>
</CloudinaryContext>);
}