import React, {Suspense} from 'react';
import { makeStyles } from '@material-ui/core';
import ComponentDimensions from './ComponentDimensions';
import EasyImage from './EasyImage';
import PostMount from './PostMount';
import { Transformation } from 'cloudinary-react';
import { DebugList } from './DebugTools';

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
    const {componentWidth, componentHeight} = ComponentDimensions(sizeRef);

    return (
    <div 
    className={classes.resize} 
    ref={sizeRef}
    width={componentWidth} height={componentHeight}
    >
        <PostMount
        width={componentWidth} height={componentHeight}
        >
            <EasyImage 
                src={props.src}
                width={componentWidth} height={componentHeight}
                crop={"fill"}
                >
                    <Transformation effect="blur:10000"></Transformation>
                    <Transformation opacity="90"></Transformation>
                    <Transformation 
                    overlay={props.src}
                    width={componentWidth} height={componentHeight}
                    crop="fit"
                    />
            </EasyImage>
        </PostMount>
    </div>);
}