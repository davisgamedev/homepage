const RaymarchPrepass =
`

#define MAX_STEPS 16
#define MIN 25.
#define MAX 125.
#define EPSILON 0.5

uniform float NumSpheres;
uniform vec4 Spheres[15];
uniform float SphereRadius;

uniform float SmoothFactor;

uniform vec3 Center;
uniform vec3 Eye;
uniform vec2 Resolution;
uniform float Overdraw;

uniform float SampleSize;

uniform float BokehStart;
uniform float BokehEnd;
uniform float BokehAdjust;



float SmoothMinSDF( float a, float b, float smoothFactor )
{
    float h = max( smoothFactor-abs(a-b), 0.0 )/smoothFactor;
    return min( a, b ) - h*h*h*smoothFactor*(1.0/6.0);
}


float SphereSDF(vec3 point, float rad) {
    return length(point) - rad;
}



float SceneSDF(vec3 point) {

    float dist = SphereSDF(point + Spheres[0].xyz, SphereRadius);
    
    for(float i = 1.; i < NumSpheres; ++i) {
        vec4 sphere = Spheres[int(i)];
        float distA = SphereSDF(point + sphere.xyz, SphereRadius);
        dist = SmoothMinSDF(dist, distA, sphere.a * SmoothFactor);
    }

    return dist;
}


vec3 GetRayDirection(float fov, vec2 res, vec2 fragCoord) {
    vec2 xy = fragCoord - res/2.;
    float z = res.y / tan(radians(fov/2.));
    return normalize(vec3(xy, -z));
}


/**
 * Calculates a transformatino matrix for world coordinates
 */
mat4 GetViewMatrix(vec3 eye, vec3 center, vec3 up) {
	vec3 f = normalize(center - eye);
	vec3 s = normalize(cross(f, up));
	vec3 u = cross(s, f);
	return mat4(
		vec4(s, 0.),
		vec4(u, 0.),
		vec4(-f, 0.),
		vec4(0., 0., 0., 1.)
	);
}


float March(vec3 eye, vec3 dir, float start, float end) {
    
	float depth = start;
   
    int i = 0;
    do {

     	float dist = SceneSDF(eye + depth * dir);
        
        if(dist < EPSILON) return depth;
        
        depth += dist;
        
        if(depth >= end) return end;

    }
    while(i++ < MAX_STEPS);

    return end;
}
    
void main(){

    //gl_FragColor = vec4(0., 1., 0., 1.); return;
    
    float isZero = floor(mod(gl_FragCoord.x, SampleSize)) + floor(mod(gl_FragCoord.y, SampleSize));

    if( isZero != 0.) return;
    
    vec2 originalRes = vec2(0.);// vec2(Resolution) - vec2(Resolution * (1./Overdraw));
    vec2 overdrawComp = vec2(gl_FragCoord) + originalRes/2.;
    vec3 viewDir = GetRayDirection(45., vec2(Resolution.xy), overdrawComp);
    
    mat4 worldViewMatrix = GetViewMatrix(Eye, Center, vec3(0., 1., 0.));
    vec3 worldDir = (worldViewMatrix * vec4(viewDir, 0.)).xyz;
    
    float dist = March(Eye, worldDir, MIN, MAX);
    
    if(dist > MAX - EPSILON) return;
    
    float bokeh = clamp(abs(dist - BokehStart)/BokehEnd, 0., 1.);
   
    gl_FragColor = vec4(1.0, 0.0, bokeh, 1.);
}

`;
export default RaymarchPrepass;