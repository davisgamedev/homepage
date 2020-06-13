import {React, useRef} from 'react';
import {makeStyles} from '@material-ui/core';
import ComponentDimensions from '../Tech/ComponentDimensions';

import { Image, Transformation } from 'react-clo'

const styles = makeStyles({
    previewImage: {
        transition: 'all 7s',
        filter: 'grayscale(100%)',
        width: '100%',
        height: '',
        '&hover': {
            filter: 'grascale(0%)'
        }
    },
    sizeCheckDiv: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1000
    }

});

export default function Preview({src}) {
    
    const classes = useStyles();

    const contRef = useRef();
    const {width, columnHeight} = ComponentDimensions(contRef);
    const height = columnHeight * (width / (4/3) );

    const imgRef = useRef();

    return (
        <span>
            <div ref={contRef} className={classes.sizeCheckDiv}></div>
            <Image 
            ref={imgRef} 
            className={classes.previewImage} 
            style={{width: width, height: height}}
            publicId={src}
            >
                <Transformation width="0.5" crop="fill" />
            </Image>
        </span>
    );


}