import React, { useRef } from 'react';
import PostMount from 'Tech/PostMount';
import Image from 'cloudinary-react/lib/components/Image';







export default function TextureURL(props) {

    const imgRef = useRef();

    function onMount() {

    }


    return <PostMount callback={onMount} placeholder={null}>
        <Image src={props.src} ref={imgRef} style={{display: 'none !important'}}>

        </Image>
    </PostMount>

}
