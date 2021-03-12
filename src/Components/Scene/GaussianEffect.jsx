import * as Three from 'three';

import GaussianBottomUp from './Shaders/GaussianBottomUp';
import React, { useMemo } from "react";
import { Pass } from 'three/examples/jsm/postprocessing/Pass';
import { extend } from 'react-three-fiber';
import { MeshBasicMaterial } from 'three';
import WindowDimensions from 'Tech/WindowDimensions';

extend({Pass})

export class GaussianMaterial extends Three.ShaderMaterial {
    constructor() {

		super({

			type: "GaussianMaterial",

            transparent: true,
            depthTest: false,
            fragmentShader: GaussianBottomUp,

		});

	}
}


const GaussUniforms = {
    iChannel0: { 
        value: null 
    },
    GaussianDepth: { value:
        2
    },
    GaussianRingSamples: { value: 
        12
    },
    GammaAdjust: { value: 
        0
    },
};

export class GaussianEffectPass extends Pass {


	constructor() {
        super();
        this.uniforms = GaussUniforms;

        this.material = new GaussianMaterial();
        this.quad = new Pass.FullScreenQuad(this.material);

        this.bufferTarget  = new Three.WebGLRenderTarget(
            window.innerWidth * window.pixelRatio, window.innerHeight * window.pixelRatio,
            {
                depthBuffer: false,
                stencilBuffer: false, 
                format: Three.RGBAFormat,
                minFilter: Three.LinearFilter, 
                magFilter: Three.LinearFilter,
                generateMipmaps: false,
            });
        for(let key in this.uniforms) {
            this.material.uniforms[key] = this.uniforms[key];
        }
    }


	render(renderer, writeBuffer, readBuffer) {

		const material = this.getFullscreenMaterial();
		//material.uniforms.iChannel0.value = inputBuffer.texture;

		//renderer.setRenderTarget(this.renderToScreen ? null : outputBuffer);
        renderer.render(this.scene, this.camera);
        
        this.renderer.setRenderTarget(writeBuffer);
        this.uniforms.iChannel0.value = readBuffer;
        this.quad.render(renderer);
        

    }
    
    setSize(width, height) {
        this.bufferTarget.setSize(width * window.pixelRatio, height * window.pixelRatio);
    }

}