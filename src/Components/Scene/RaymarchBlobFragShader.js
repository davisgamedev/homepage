const RaymarchBlobFragShader = //frag`
`
#define MAX_STEPS 128
#define MIN 25.
#define MAX 125.
#define EPSILON 0.01

uniform bool DebugLocation;

uniform float NumSpheres;
uniform vec4 Spheres[15];
uniform float SphereRadius;

uniform float SmoothFactor;

uniform vec3 Eye;
uniform vec2 Resolution;
uniform float Overdraw;

uniform vec3 AmbientLight;

uniform vec3 DirectionLightPosition;
uniform vec3 DirectionLightColor;
uniform float DirectionLightIntensity;

uniform vec3 SpecularColor;
uniform float SpecularAlpha;


// (r, g, b, colorDist)
uniform vec4 GradientColorSteps[4];


vec3 DirectionLight;



float SmoothMinSDF( float a, float b, float smoothFactor )
{
    float h = max( smoothFactor-abs(a-b), 0.0 )/smoothFactor;
    return min( a, b ) - h*h*h*smoothFactor*(1.0/6.0);
}


float SphereSDF(vec3 point) {
    return length(point) - SphereRadius;
}


float Scene(vec3 point) {

    float dist = SphereSDF(point + Spheres[0].xyz);

    for(float i = 1.; i < NumSpheres; ++i) {
        vec4 sphere = Spheres[int(i)];
        float distA = SphereSDF(point + sphere.xyz);
        dist = SmoothMinSDF(dist, distA, sphere.a * SmoothFactor);
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


vec3 BlinnPhongLighting(
    vec3 point,
    vec3 eye,
    vec3 N,
    vec3 ambient,
    vec3 diffuse,
    vec3 specular,
    float specularAlpha
){
    vec3 L = normalize(DirectionLightPosition);
    vec3 V = normalize(eye - point);
    vec3 H = normalize(L + V);

    float dotNH = clamp(dot(N, H), 0., 1.);
    float dotNL = clamp(dot(N, L), 0., 1.);


    vec3 ambientColor = diffuse * AmbientLight;
    vec3 diffColor = dotNL * diffuse;
    vec3 specColor = pow(dotNH, specularAlpha) * specular;

    return ambientColor + (DirectionLight * (diffColor + specColor));
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
	
        return BlinnPhongLighting(
            point, eye, EstimateNormal(point), 
            AmbientLight, diffuseColor, specularColor, alpha);
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

    vec2 originalRes = vec2(Resolution) - vec2(Resolution * (1./Overdraw));

    vec2 overdrawComp = vec2(gl_FragCoord) + originalRes/2.;

    vec3 viewDir = GetRayDirection(45., vec2(Resolution.xy), overdrawComp);
    
    mat4 worldViewMatrix = GetViewMatrix(Eye, vec3(0.), vec3(0., 1., 0.));
    vec3 worldDir = (worldViewMatrix * vec4(viewDir, 1.)).xyz;
    
    float dist = March(Eye, worldDir, MIN, MAX);
    
    if(dist >= MAX - EPSILON * 0.99) {

        if(DebugLocation) gl_FragColor = vec4(0., 0., 0., 0.5);
        else              gl_FragColor = vec4(0.);
        return;
        
    }

    vec3 surfacePoint = Eye + dist * worldDir;

    vec3 ObjectDiffuseColor = GetDiffuseColor(length(surfacePoint));

    
    vec3 surfaceColor = ScenePhongIllumination(
        ObjectDiffuseColor, 
        SpecularColor, 
        SpecularAlpha,
        surfacePoint,
        Eye);
    
    gl_FragColor = vec4(surfaceColor, 1.);
    
}
`;

export default RaymarchBlobFragShader;