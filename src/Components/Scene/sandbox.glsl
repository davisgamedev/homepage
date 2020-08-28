#define MAX_STEPS 100
#define MIN 1.
#define MAX 100.
#define EPSILON 0.005
#define SMOOTHFACTOR 2.5




/**
    THIS WILL BE SLOW BUT WE NEED THIS FOR TESTING
*/

const float factors[] = float[](
    0.36,
    0.37,
    1.22,
    10.58,
    90.1,
    90.12,
    4.37,
    77.73,
    13.64,
    26.72,
    19.34,
    29.65
);

vec3 getSphere(int i) {
    return vec3(
        sin(iTime + factors[i]), 
        cos(iTime + (factors[i] * 10.)), 
        sin(iTime + (factors[i] * 100.))) 
        
        * sin(iTime + (factors[i]) * 1000.) 
        * (sin(iTime) + 0.5) * -2.;
}



/** TO UNIFORMS */

const float Radius = 0.2;

const vec3 AmbientColor = vec3(0.1);
const vec3 AmbientIntensity = vec3(1.);

const vec3 DirectionLightPosition = vec3(0., 10., -10.);
const vec3 DirectionLightColor = vec3(1.);
const float DirectionLightIntensity = 10.;


const vec3 ObjectSpecularColor = vec3(1.);
const float ObjectSpecularIntensity = 100.;

const vec4 RGB = vec4(vec3(256.), 1.);
const vec4 GradientColorStep1 = vec4(64, 31, 62, 1)/RGB;
const vec4 GradientColorStep2 = vec4(69, 63, 120, 2.)/RGB;
const vec4 GradientColorStep3 = vec4(117, 154, 171, 2.5)/RGB;
const vec4 GradientColorStep4 = vec4(250, 242, 161, 3.5)/RGB;


// end uniforms


/** Lighting */

const vec3 AmbientLight = AmbientColor * AmbientIntensity;

const vec3 DirectionLight = DirectionLightColor * DirectionLightIntensity;



/** Constructive Solid Geometry Foundations */

float IntersectSDF(float distA, float distB) {
    return max(distA, distB);
}

float UnionSDF(float distA, float distB) {
    return min(distA, distB);
}

float DifferenceSDF(float distA, float distB) {
    return max(distA, -distB);
}


// polynomial smooth min (k = 0.1);
float SmoothMinSDF( float a, float b )
{
    float h = max( SMOOTHFACTOR-abs(a-b), 0.0 )/SMOOTHFACTOR;
    return min( a, b ) - h*h*h*SMOOTHFACTOR*(1.0/6.0);
}



/** Primitive SDF Functions */
float SphereSDF(vec3 point, float rad) {
    return length(point) - rad;
}




/** Full Scene Intersect */
float SceneSDF(vec3 point) {

    float dist = SphereSDF(point + getSphere(0), Radius);

    // for(int i = 0; i < 12; ++i) {
    //     dist += SmoothMinSDF(dist, SphereSDF(point + getSphere(i), 0.1));
    // }

    
    for(int i = 1; i < 12; ++i) {
        float distA = SphereSDF(point + getSphere(i), Radius);
        dist = SmoothMinSDF(dist, distA);
    }


    // right now just return the sphere point
    return dist;
}



/** Helpers */

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
    return normalize( k.xyy * SceneSDF( p + k.xyy * EPSILON ) + 
                      k.yyx * SceneSDF( p + k.yyx * EPSILON ) + 
                      k.yxy * SceneSDF( p + k.yxy * EPSILON ) + 
                      k.xxx * SceneSDF( p + k.xxx * EPSILON ) );

    // return normalize(vec3(
    //     SceneSDF(vec3(p.x + EPSILON, p.y, p.z)) - SceneSDF(vec3(p.x - EPSILON, p.y, p.z)),
    //     SceneSDF(vec3(p.x, p.y + EPSILON, p.z)) - SceneSDF(vec3(p.x, p.y - EPSILON, p.z)),
    //     SceneSDF(vec3(p.x, p.y, p.z  + EPSILON)) - SceneSDF(vec3(p.x, p.y, p.z - EPSILON))
    // ));
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




/** Lighting Functions */

vec3 PhongPointLightContribution(
    vec3 diffuseColor,
    vec3 specularColor,
    float alpha, 
    vec3 point, 
    vec3 eye, 
    vec3 lightPosition, 
    vec3 lightIntensity
	) {
    
    // phong NLVR calculations
 	vec3 N = EstimateNormal(point);
    vec3 L = normalize(lightPosition - point);
    vec3 V = normalize(eye - point);
    vec3 R = normalize(reflect(-L, N));
    
    float dotLN = dot(L, N);
    float dotRV = dot(R, V);
    
    // light is not visible at this point
    if (dotLN < 0.) return vec3(0.);
   
    // light is facing away, return diffuse
    if (dotRV < 0.) {
        
        return lightIntensity * (diffuseColor * dotLN);
    }
    return lightIntensity * (diffuseColor * dotLN + specularColor * pow(dotRV, alpha));
}

vec3 PhongDirectionLightContribution(
    vec3 diffuseColor,
    vec3 specularColor,
    float alpha, 
    vec3 point, 
    vec3 eye
){
    
    // phong NLVR calculations
 	vec3 N = EstimateNormal(point);
    vec3 L = normalize(DirectionLightPosition);
    vec3 V = normalize(eye - point);
    vec3 R = normalize(reflect(-L, N));
    
    float dotLN = dot(L, N);
    float dotRV = dot(R, V);
    
    // light is not visible at this point
    if (dotLN < 0.) return vec3(0.);
   
    // light is facing away, return diffuse
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
            GradientColorStep1.a,
            GradientColorStep2.a,
            GradientColorStep3.a,
            GradientColorStep4.a
        ));

    if(dist.x) return GradientColorStep1.xyz;
    else if(dist.y) return mixGrad(GradientColorStep1, GradientColorStep2, l);
    else if (dist.z) return mixGrad(GradientColorStep2, GradientColorStep3, l);
    else if(dist.a) return mixGrad(GradientColorStep3, GradientColorStep4, l);
    else return GradientColorStep4.xyz;
}




/** Ray March function */
/**
 * eye: point on view plane, origin of ray
 * dir: direction of ray, normalized
 * start: start distance from eye (march forward)
 * end: max distance before ending (do we need this?)
*/
float March(vec3 eye, vec3 dir, float start, float end) {
    
	float depth = start;
    
    for(int i = 0; i < MAX_STEPS; ++i) {
        
        // check against scene
     	float dist = SceneSDF(eye + depth * dir);
        
        // smol distance, we found a hit
        if(dist < EPSILON) return depth;
        
        // incr
        depth += dist;
        
        // too big, hit the void
        if(depth >= end) return end;
    }
    
    return end;
}
    
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec3 viewDir = GetRayDirection(45., iResolution.xy, fragCoord);
    
    // distance from viewplane
    vec3 eye = vec3(0., 0., -15.);
    
    // rotate scene a bit
    mat4 worldViewMatrix = GetViewMatrix(eye, vec3(0.), vec3(0., 1., 0.));
    vec3 worldDir = (worldViewMatrix * vec4(viewDir, 0.)).xyz;
    
    
    
    float dist = March(eye, worldDir, MIN, MAX);
    
    if(dist > MAX - EPSILON) {
        fragColor = vec4(0.);
        return;
        
    }
    
    vec3 surfacePoint = eye + dist * worldDir;


    float l = length(surfacePoint);

    vec3 ObjectDiffuseColor = GetDiffuseColor(l);


    

    
    vec3 surfaceColor = ScenePhongIllumination(
        ObjectDiffuseColor, 
        ObjectSpecularColor, 
        ObjectSpecularIntensity,
        surfacePoint,
        eye);
    
    fragColor = vec4(surfaceColor, 1.);
    
    
}