import React, {useRef, useEffect } from 'react';
import { Image, Transformation } from 'cloudinary-react'
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';
import EasyImage from '../../Tech/EasyImage'

const styles = makeStyles({
    hide: {
        display: 'none',
        height: 500,
    },
    container: {
        height: 500
    },
    imgSkel: {
        width: '100%',
        height: 500,
    }
})

function PreviewImg(props) {
    /*
<div className="imgContainer">
        <Image publicId={props.src}>
                <Transformation quality="10" width="600" height="500" crop="fill" />
        </Image>
        
    </div>
    */

    return (<div></div>)

    return(
        <EasyImage
            className="imgContainer"
            src={props.src}
            width="600"
            height="500"
            etc={{quality: "10"}}
        >
        </EasyImage>
    );
}

// todo <PostMount> pattern
export default function Preview(props) {
    const childRef = useRef();
    const img = useRef();

    const classes = styles();

    const [hidden, hide] = React.useState(true);

    useEffect(() => {
        if(hidden) {
            const nodeList = childRef.current.querySelectorAll('h1');
            if(nodeList.length > 0) {
                nodeList[0].after(img.current);
                hide(false);
            }
        }
    }, [hidden]);

    return (
    <div>

        <div ref={childRef}>{props.children}</div>

        <div ref={img} className={hidden? classes.hide : classes.container}>
            {
                hidden? <Skeleton className={classes.imgSkel}/> : undefined
            }        
            <PreviewImg src={props.src}></PreviewImg>
        </div>

    </div>);
}