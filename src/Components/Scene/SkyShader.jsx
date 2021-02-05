import React from 'react';
import { Sky } from 'drei';
import { DebugDir } from 'Tech/DebugTools';
import DebugLog from 'Tech/DebugTools';



export default function SkyShader() {

    const ref = React.useRef();

    const uniforms = {
        turbidity: 1.5,
        rayleigh: 0.425,
        mieCoefficient: 0.034,
        mieDirectionalG: 0.7,
        inclination: 0.2, // elevation / inclination
        azimuth: 0.3, // Facing front,
    };

    let uniformsSet = false;


    React.useEffect(() => {

        if(ref.current.material.uniforms.sunPosition && !uniformsSet) {

            Object.keys(uniforms).forEach(k => {

                ref.current.material.uniforms[k]?.value = uniforms;
                
            });
            
            var theta = Math.PI * ( uniforms.inclination - 0.5 );
            var phi = 2 * Math.PI * ( uniforms.azimuth - 0.5 );

            let sun = {};

            sun.x = Math.cos( phi );
            sun.y = Math.sin( phi ) * Math.sin( theta );
            sun.z = Math.sin( phi ) * Math.cos( theta );

            ref.current.material.uniforms[ "sunPosition" ].value.copy( sun );

            uniformsSet = true;
        }
    }, ref.current);




    return(<Sky sunPosition={[0, 0, 0]} ref={ref} />)
}

