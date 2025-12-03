import { Skia } from "@shopify/react-native-skia";

export const LAVA_LAMP_SOURCE = Skia.RuntimeEffect.Make(`
uniform float time;
uniform vec2 size;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                        -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

vec4 main(vec2 fragCoord) {
    vec2 st = fragCoord.xy / size.xy;
    st.x *= size.x / size.y;
    
    vec2 pos = st * 3.0;
    float DF = 0.0;

    // Lava lamp motion
    float a = 0.0;
    vec2 vel = vec2(time * 0.1);
    DF += snoise(pos + vel) * 0.25 + 0.25;

    a = snoise(pos * vec2(cos(time * 0.15), sin(time * 0.1)) * 0.1) * 3.1415;
    vel = vec2(cos(a), sin(a));
    DF += snoise(pos + vel) * 0.25 + 0.25;

    // Create the blob shape
    float blob = smoothstep(0.7, 0.75, fract(DF));
    
    // Dark background
    vec3 bgColor = vec3(0.08, 0.08, 0.1);
    
    // Subtle warm amber/gold color for blobs
    vec3 blobColor = vec3(0.9, 0.65, 0.2);
    
    // Mix background with blob color
    vec3 finalColor = mix(bgColor, blobColor, blob * 0.6);
    
    // Add subtle glow around blobs
    float glow = smoothstep(0.5, 0.7, fract(DF)) - blob;
    finalColor += blobColor * glow * 0.15;

    return vec4(finalColor, 1.0);
}
`)!;

export const HOLO_SOURCE = Skia.RuntimeEffect.Make(`
  uniform float time;      // seconds
  uniform float sheetAnim; // 0..1
  uniform vec2  size;      // canvas size
  
  // value noise + fbm
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i=floor(p), f=fract(p);
    float a=hash(i), b=hash(i+vec2(1,0)), c=hash(i+vec2(0,1)), d=hash(i+vec2(1,1));
    vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  float fbm(vec2 p){
    float v=0.0, a=0.5;
    for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.0; a*=0.5; }
    return v;
  }
  
  
  vec4 main(vec2 pos){
    vec2 uv = pos / size;           // 0..1
    vec2 c  = uv - 0.5;
  
    // soft pearly turbulence
    float n = fbm(uv*3.0 + time*0.05);
  
    // Vibrant shiny metallic holographic color palette
    vec3 color1 = vec3(0.95, 0.3, 0.7);    // Hot pink metallic
    vec3 color2 = vec3(1.0, 0.6, 0.1);     // Bright gold
    vec3 color3 = vec3(0.2, 0.5, 1.0);     // Electric blue
    vec3 color4 = vec3(0.8, 0.1, 0.9);     // Vibrant purple
    vec3 color5 = vec3(0.1, 0.9, 0.4);     // Emerald green
    vec3 color6 = vec3(0.9, 0.9, 0.2);     // Bright yellow
    vec3 color7 = vec3(1.0, 0.3, 0.3);     // Bright red
    vec3 color8 = vec3(0.3, 0.8, 0.9);     // Cyan blue
  
    // Create multiple noise layers for faster, more visible color mixing
    float n1 = fract(n + uv.x*0.8 + sheetAnim*0.7 + time*0.08);
    float n2 = fract(n*1.5 + uv.y*0.9 + time*0.12);
    float n3 = fract(n*2.1 + (uv.x + uv.y)*0.6 + sheetAnim*0.5 + time*0.06);
    
    // Multi-stage color blending for rich transitions
    vec3 colorA, colorB, colorC, colorD;
    
    // First layer - blend between 4 colors
    if (n1 < 0.25) {
      colorA = mix(color1, color2, n1 * 4.0);
    } else if (n1 < 0.5) {
      colorA = mix(color2, color3, (n1 - 0.25) * 4.0);
    } else if (n1 < 0.75) {
      colorA = mix(color3, color4, (n1 - 0.5) * 4.0);
    } else {
      colorA = mix(color4, color1, (n1 - 0.75) * 4.0);
    }
    
    // Second layer - blend between other 4 colors
    if (n2 < 0.25) {
      colorB = mix(color5, color6, n2 * 4.0);
    } else if (n2 < 0.5) {
      colorB = mix(color6, color7, (n2 - 0.25) * 4.0);
    } else if (n2 < 0.75) {
      colorB = mix(color7, color8, (n2 - 0.5) * 4.0);
    } else {
      colorB = mix(color8, color5, (n2 - 0.75) * 4.0);
    }
    
    // Combine the two layers with more pronounced color blending
    vec3 baseColor = mix(colorA, colorB, 0.4 + 0.6 * sin(n3 * 8.0 + time*0.3));
    
    // Enhanced multi-layer shimmer for ultra-shiny effect
    float shimmer1 = 0.5 + 0.5 * sin(dot(uv, vec2(15.0,10.0)) + n*8.0 + time*2.0);
    float shimmer2 = 0.5 + 0.5 * cos(dot(uv, vec2(8.0,12.0)) + n*5.0 + time*1.5);
    float shimmer3 = 0.5 + 0.5 * sin(dot(uv, vec2(20.0,6.0)) + n*10.0 + time*2.5);
    
    // Apply subtle shimmer layers that enhance without overpowering
    baseColor = mix(baseColor, baseColor * 1.3, shimmer1 * 0.2);
    baseColor = mix(baseColor, baseColor * 1.2, shimmer2 * 0.15);
    baseColor = mix(baseColor, vec3(1.0, 0.95, 0.9), shimmer3 * 0.1); // Subtle chrome highlights
  
    // More controlled highlight bloom
    float highlight = smoothstep(0.4, 0.9, fbm(uv*4.0 + time*0.08));
    float metallic = smoothstep(0.5, 0.8, fbm(uv*5.0 + time*0.10 + n*1.5));
    baseColor = mix(baseColor, baseColor * 1.4, 0.15*highlight); // Enhance existing colors
    baseColor = mix(baseColor, vec3(0.9, 0.85, 0.7), 0.08*metallic); // Subtle golden reflections
  
    // Create alpha gradient - stronger in center, fading to edges
    float d = distance(uv, vec2(0.5));
    float alpha = 1.0 - smoothstep(0.2, 0.6, d);
    
    // Add some noise-based transparency variation
    alpha *= 0.7 + 0.3 * (0.5 + 0.5 * n);
    
    // Gentle pulsing alpha based on sheetAnim
    alpha *= 0.8 + 0.2 * sin(sheetAnim * 6.28);
  
    return vec4(baseColor, alpha);
  }
  `)!;
