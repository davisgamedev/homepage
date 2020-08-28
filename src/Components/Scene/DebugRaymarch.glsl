#define MAX_STEPS 64
#define MIN 1.
#define MAX 100.
#define EPSILON 0.005
#define SMOOTHFACTOR 2.


float NumSpheres = 15.;
vec3 Spheres[15];
float SphereRadius = 0.1;

vec3 Eye = vec3(0., 0., -15.);
vec3 Resolution = vec3(600., 800., 0);

uniform vec3 AmbientLight;

uniform vec3 DirectionLightPosition;
uniform vec3 DirectionLightColor;
uniform float DirectionLightIntensity;

uniform vec3 SpecularColor;
uniform float SpecularAlpha;


// (r, g, b, colorDist)
uniform vec4 GradientColorSteps[4];


vec3 DirectionLight;



float SmoothMinSDF( float a, float b )
{
    float h = max( SMOOTHFACTOR-abs(a-b), 0.0 )/SMOOTHFACTOR;
    return min( a, b ) - h*h*h*SMOOTHFACTOR*(1.0/6.0);
}


float SphereSDF(vec3 point) {
    return length(point) - SphereRadius;
}


float Scene(vec3 point) {

    float dist = SphereSDF(point + Spheres[0]);

    for(float i = 1.; i < NumSpheres; ++i) {
        float distA = SphereSDF(point + Spheres[int(i)]);
        dist = SmoothMinSDF(dist, distA);
    }

    return dist;
}


// Gets the direction vector from the eye point for a resolved pixel
vec3 GetRayDirection(float fov, vec2 res, vec2 fragCoord) {
    vec2 xy = fragCoord - res/2.;
    float z = res.y / tan(radians(fov/2.));
    return normalize(vec3(xy, -z));
}


// better normal https://www.iquilezles.org/www/articles/normalsSDF/normalsSDF.htm
vec3 EstimateNormal(vec3 p) {
    #define ZERO (min(iFrame,0)) // non-constant zero
    const vec2 k = vec2(1,-1);
    return normalize( k.xyy * Scene( p + k.xyy * EPSILON ) + 
                      k.yyx * Scene( p + k.yyx * EPSILON ) + 
                      k.yxy * Scene( p + k.yxy * EPSILON ) + 
                      k.xxx * Scene( p + k.xxx * EPSILON ) );
}


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

vec3 PhongDirectionLightContribution(
    vec3 diffuseColor,
    vec3 specularColor,
    float alpha, 
    vec3 point, 
    vec3 eye
){
 	vec3 N = EstimateNormal(point);
    vec3 L = normalize(DirectionLightPosition);
    vec3 V = normalize(eye - point);
    vec3 R = normalize(reflect(-L, N));
    
    float dotLN = dot(L, N);
    float dotRV = dot(R, V);
    
    if (dotLN < 0.) return vec3(0.);
   
    if (dotRV < 0.) {
        
        return DirectionLight * (diffuseColor * dotLN);
    }
    return DirectionLight * (diffuseColor * dotLN + specularColor * pow(dotRV, alpha));
}


vec3 ScenePhongIllumination(
    vec3 diffuseColor,
    vec3 specularColor,
    float alpha,
    vec3 point,
    vec3 eye
	) {
	
    vec3 color = AmbientLight * 
        PhongDirectionLightContribution(diffuseColor, specularColor, alpha, point, eye);
   
    return color;
}


vec3 mixGrad(vec4 grad1, vec4 grad2, float l) {
    return mix(grad1, grad2, (l - grad1.a)/(grad2.a - grad1.a)).xyz;
}


vec3 GetDiffuseColor(float l) {

    bvec4 dist = lessThan(
        vec4(l), 
        vec4(
            GradientColorSteps[0].a,
            GradientColorSteps[1].a,
            GradientColorSteps[2].a,
            GradientColorSteps[3].a
        ));

    if      (dist.x) return GradientColorSteps[0].xyz;
    else if (dist.y) return mixGrad(GradientColorSteps[0], GradientColorSteps[1], l);
    else if (dist.z) return mixGrad(GradientColorSteps[1], GradientColorSteps[2], l);
    else if (dist.a) return mixGrad(GradientColorSteps[2], GradientColorSteps[3], l);
    else             return GradientColorSteps[3].xyz;

}


float March(vec3 eye, vec3 dir, float start, float end) {
    
	float depth = start;
  
    for(int i = 0; i < MAX_STEPS; ++i) {
        
     	float dist = Scene(eye + depth * dir);
        
        if(dist < EPSILON) return depth;
        
        depth += dist;
        
        if(depth >= end) return end;
    }
    
    return end;
}
    
void main() {

    DirectionLight = DirectionLightColor * DirectionLightIntensity;

    vec3 viewDir = GetRayDirection(45., vec2(Resolution.xy), vec2(gl_FragCoord));
    
    mat4 worldViewMatrix = GetViewMatrix(Eye, vec3(0.), vec3(0., 1., 0.));
    vec3 worldDir = (worldViewMatrix * vec4(viewDir, 0.)).xyz;
    
    float dist = March(Eye, worldDir, MIN, MAX);
    
    if(dist > MAX - EPSILON) {
        //gl_FragColor = vec4(0.);
        gl_FragColor = vec4(0., 0., 0., 0.5);
        return;
    }

    vec3 surfacePoint = Eye + dist * worldDir;

    gl_FragColor = vec4(0., 1.0, 0., 1.0);


    vec3 ObjectDiffuseColor = GetDiffuseColor(length(surfacePoint));

    
    vec3 surfaceColor = ScenePhongIllumination(
        ObjectDiffuseColor, 
        SpecularColor, 
        SpecularAlpha,
        surfacePoint,
        Eye);
    
    gl_FragColor = vec4(surfaceColor, 1.);
}