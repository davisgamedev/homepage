import React, {Suspense} from 'react';
import { makeStyles } from '@material-ui/core';
import ComponentDimensions from './ComponentDimensions';
import EasyImage from './EasyImage';
import PostMount from './PostMount';
import { Transformation } from 'cloudinary-react';
import { DebugList } from './DebugTools';
import WindowDimensions from './WindowDimensions';
import { DebugColorLog } from './DebugTools';
import Image from 'cloudinary-react/lib/components/Image';
import { DebugDir } from './DebugTools';
import { findDOMNode } from 'react-dom';

/**
 * Smart Image
 *  - waits for didmount to load
 *  - autosizes to fit + transparency
 * 
 */
export default function BackgroundSpread(props) {

    const {windowWidth, windowHeight} = WindowDimensions();
    const imgRef = React.useRef();

    React.useEffect(() => {

        const img = findDOMNode(imgRef.current);

        DebugColorLog(img.src, 'brown');
        DebugDir(img);


        document.body.style.minHeight=windowHeight*2.
        document.body.style.backgroundImage=`url(${img.src})`;

    }, [imgRef.current]);

    return (
        <Image
            style={{display: "none"}}
            publicId={"sample"}//{props.src}
            ref={imgRef}
        >
            <Transformation 
                width={windowWidth} height={windowHeight*2} crop={"scale"} 
            />
            <Transformation effect="blur:10000"></Transformation>
            {/* <Transformation opacity="90"></Transformation> */}
        </Image>
    );
}