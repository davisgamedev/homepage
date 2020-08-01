import React, { useEffect } from 'react';
import { Image, Placeholder, Transformation } from 'cloudinary-react'
import { DebugDir } from './DebugLog';
import DebugLog from './DebugLog';

export default function EasyImage(props){

    useEffect(() => {}, [props.width, props.height]);

    return(
        <Image
            publicId={props.src}
            loading="lazy"
            >
                <Placeholder type="blur"></Placeholder>
                <Transformation 
                    width={props.width} height={props.height}
                    crop={props.crop} 
                    {...props.etc}
                />
                {props.children}
        </Image>
    );
}