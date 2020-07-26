import React, {Suspense} from 'react';
import { Image } from 'cloudinary-react'
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ComponentDimensions from './ComponentDimensions';
import PostMount from './PostMount';

const useStyles = makeStyles({
    resize: {
        width: '100%',
        height: '100%'
    }
});

/**
 * Smart Image
 *  - waits for didmount to load
 *  - autosizes to fit + transparency
 * 
 */
export default function SmartImage(props) {

    const classes = useStyles();

    const sizeRef = React.useRef();
    const {width, height} = ComponentDimensions(sizeRef);

    return (
    <PostMount 
        className={classes.resize} 
        ref={sizeRef}
    >
        <Image publicId={props.src} width={width} height={height}>
            {props.children} 
        </Image>
    </PostMount>);
}