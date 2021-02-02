const GaussianBottomUp = 
`
uniform vec2 iResolution;
uniform sampler2D iChannel0;

uniform float GaussianDepth;
uniform float GaussianRingSamples;
uniform float GammaAdjust;

#define TAU 6.28318530718


vec4 RotateBlur(vec2 fragCoord, float GaussianSize) {
    
    float total = GaussianDepth * GaussianRingSamples;
    
    vec2 uvCoord = fragCoord/iResolution.xy;
    vec4 avgs = texture(iChannel0, uvCoord);
  
    // start larger, otherwise we tend to miss an angle
    //	(it looked like a small gap at a big enough bokeh)
    float angle = TAU/GaussianRingSamples;
    
    vec2 radStep = GaussianSize/iResolution.xy;
    vec2 rad = radStep;
    
    vec2 uvOffset = vec2(0.);
    
    
    for(float i = 0.; i < total; ++i) {
        
        uvOffset = vec2(cos(angle), sin(angle)) * rad;
      
        avgs += texture(iChannel0, uvCoord + uvOffset);
        
        // we wrap to zero if we're bigger than 2PI
        angle += (-TAU * float(angle > TAU));
        
        // otherwise we add
        angle += (TAU/GaussianRingSamples);
        
        // we increment if we went full circle
        rad += float(angle > TAU) * (radStep);
    }
    
    
    // tiny adjust seems to fix it, weird 
    // needs adjust based on effect amount
    return avgs / total - GammaAdjust;
    
}

void main() {
    gl_FragColor = RotateBlur(gl_FragCoord.xy, mix(1., 6., 1. - gl_FragCoord.y/iResolution.y));
}

`;
export default GaussianBottomUp;