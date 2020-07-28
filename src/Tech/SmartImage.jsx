import React, {Suspense} from 'react';
import { Image } from 'cloudinary-react'
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ComponentDimensions from './ComponentDimensions';
import EasyImage from './EasyImage';
import Transformation from 'cloudinary-react/lib/components/Transformation';
import PostMount from './PostMount';
import { Transform } from '@material-ui/icons';

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

    let loadImage = false;
    const callback = () => {loadImage = true;}

    return (
    <PostMount 
        className={classes.resize} 
        ref={sizeRef}
        callback={callback}
    >
        {
            loadImage?
            (
                <EasyImage 
                src={props.src}
                width={width}
                height={height}
                crop={"pad"}
                etc={{ background:"#00000000"}}
                >
                    {props.children}

                    <Transformation underlay={props.src}></Transformation>
                        <Transformation width={width} height={height} crop="mfit"></Transformation>
                        <Transformation blur="300"></Transformation>
                    <Transformation flags="layer_apply"></Transformation>

                </EasyImage>
            )
            : null
        }
    </PostMount>);
}