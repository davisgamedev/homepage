
uniform float SampleSize;

uniform vec2 Resolution;

uniform float GaussianDepth;
uniform float GaussianRingSamples ;

uniform float BlurTileDist;
uniform float BokehMult;
uniform float GammaAdjust;

uniform sampler2D iChannel0;
uniform sampler2D iChannel1;

#define TAU 6.28318530718


vec4 RotateBlur(vec2 fragCoord, float GaussianSize) {
    
    float total = GaussianDepth * GaussianRingSamples;
    
    vec2 uvCoord = fragCoord/Resolution.xy;
    vec4 avgs = texture(iChannel1, uvCoord);
  
    // start larger, otherwise we tend to miss an angle
    //	(it looked like a small gap at a big enough bokeh)
    float angle = TAU/GaussianRingSamples;
    
    vec2 radStep = GaussianSize/Resolution.xy;
    vec2 rad = radStep;
    
    vec2 uvOffset = vec2(0.);
    
    
    for(float i = 0.; i < total; ++i) {
        
        uvOffset = vec2(cos(angle), sin(angle)) * rad;
      
        
        avgs += texture(iChannel1, uvCoord + uvOffset);
        
        
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



void main()
{  
    
    //fragColor = texture(iChannel0, fragCoord.xy/iResolution.xy); return;
    
    vec2 floorst = floor(gl_FragCoord.xy/SampleSize) * SampleSize;
    
    // take a step back;
    vec2 currentTile = floorst - vec2(SampleSize * floor(BlurTileDist/2.));
    
    vec4 distColor = vec4(0.);
    
    float bokehAcc = 0.;
    float bokehCount = 1.;
    
    // this should unroll
    // we need to check additional tiles to prevent hard edges on smoothing
    for(float i = 0.; i < pow(BlurTileDist, 2.); ++i) {
     	vec2 offset = vec2(mod(i, BlurTileDist), floor(i / BlurTileDist)) * SampleSize;
        vec4 color = texture(iChannel0, (currentTile + offset)/Resolution.xy);
        
        bokehAcc += color.b;
        bokehCount += float(color.a > 0.1);
            
        distColor += color;
    }
    
    // this tile nor nearest have any data, no blur pass
    if(length(distColor) <= 0.1) {
        gl_FragColor = texture(iChannel1, gl_FragCoord.xy/Resolution.xy);
        return;
    }
    
    
    vec2 nearestTile = vec2(
        float(gl_FragCoord.x - floorst.x > SampleSize/2.),
        float(gl_FragCoord.y - floorst.y > SampleSize/2.)
	) * SampleSize;
    
    nearestTile += floorst;
    
   
    float BokehDist = bokehAcc/bokehCount;
    vec4 color = RotateBlur(gl_FragCoord.xy, mix(0., 8., BokehDist * BokehMult));
    
    //vec4 color = texture(iChannel1, fragCoord/iResolution.xy);
  
    
    gl_FragColor = vec4(color.xyz, 1.);
    
}
