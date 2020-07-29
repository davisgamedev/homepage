import React from 'react';
import { Image, Placeholder, Transformation } from 'cloudinary-react'
import { DebugDir } from './DebugLog';

class EasyImage extends React.Component {

    constructor(props){
        super(props);

        this.w = this.props.width || 1;
        this.h = this.props.height || 1;
        this.c = this.props.crop || 'lfill';
        this.g = this.props.gravity || 'auto';
        
        this.etc = this.props.etc;

        DebugDir(this.props);
    }

    render(){
        return(
            <Image
                publicId={this.props.src}
                // loading="lazy"
                >
                    <Placeholder type="blur"></Placeholder>
                    <Transformation 
                        width={this.w} height={this.h}
                        crop={this.c} 
                        {...this.etc}
                    />
                    {this.props.children}
            </Image>
        );
    }
}

export default EasyImage;
