import React, {Suspense} from 'react';
import { makeStyles } from '@material-ui/core';
import ComponentDimensions from './ComponentDimensions';
import EasyImage from './EasyImage';
import PostMount from './PostMount';
import { Transformation } from 'cloudinary-react';
import { DebugDir } from './DebugLog';
import DebugLog from './DebugLog';

const useStyles = makeStyles({
    resize: {
        display: 'block',
        width: '100%',
        height: 'auto',
        minHeight: '100%'
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

    DebugLog('width ' + width + ' height ' + height)

    return (
    <div 
    className={classes.resize} 
    ref={sizeRef}>
        <PostMount>
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
        </PostMount>
    </div>);
}