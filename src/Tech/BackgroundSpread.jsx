import React, {Suspense} from 'react';
import { makeStyles } from '@material-ui/core';
import ComponentDimensions from './ComponentDimensions';
import EasyImage from './EasyImage';
import PostMount from './PostMount';
import { Transformation } from 'cloudinary-react';
import { DebugList } from './DebugLog';
import WindowDimensions from './WindowDimensions';
import { DebugColorLog } from './DebugLog';
import Image from 'cloudinary-react/lib/components/Image';
import { DebugDir } from './DebugLog';
import { findDOMNode } from 'react-dom';

class BackgroundImage extends React.Component {

    constructor(props){
        super(props);
        this.imgRef = React.createRef();
    }

    componentDidMount() {
        DebugColorLog(this.imgRef.current.src, 'brown');
        document.body.style.minHeight=this.imgRef.current.src;
        document.body.style.backgroundImage=this.props.src;
    }

    render() {
        return(
            <Image
                style={{display: "none"}}
                publicId={"sample"}//this.props.src}
                ref={this.imgRef}
                >
                    <Transformation 
                        width={this.props.width} height={this.props.height} crop={"fill"} 
                    />
                    <Transformation effect="blur:10000"></Transformation>
                    <Transformation opacity="90"></Transformation>
            </Image>
        );
    }

}



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
            publicId={props.src}
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