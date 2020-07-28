import React, {Suspense} from 'react';
import { Image, Placeholder } from 'cloudinary-react'
import Transformation from 'cloudinary-react/lib/components/Transformation';

export default class EasyImage extends React.component {

    constructor(props){
        super(props);

        this.w = this.props.width;
        this.h = this.props.height;
        this.c = this.props.crop || 'lfill';
        this.g = this.props.gravity || 'auto';
        this.etc = this.props.etc;
    }

    render(){
        return(
            <Image
                public-id={this.props.src}
                loading="lazy"
                >
                    <Placeholder type="blur"></Placeholder>
                    <Transformation 
                        width={this.w} height={this.h}
                        crop={this.c} gravity={this.g}
                        {...this.etc}
                    />
                    {this.props.children}
            </Image>
        );
    }
}