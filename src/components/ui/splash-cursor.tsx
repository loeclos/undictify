// "use client";

// interface SplashCursorProps {
//   SIM_RESOLUTION?: number;
//   DYE_RESOLUTION?: number;
//   CAPTURE_RESOLUTION?: number;
//   DENSITY_DISSIPATION?: number;
//   VELOCITY_DISSIPATION?: number;
//   PRESSURE?: number;
//   PRESSURE_ITERATIONS?: number;
//   CURL?: number;
//   SPLAT_RADIUS?: number;
//   SPLAT_FORCE?: number;
//   SHADING?: boolean;
//   COLOR_UPDATE_SPEED?: number;
//   BACK_COLOR?: { r: number; g: number; b: number };
//   TRANSPARENT?: boolean;
// }


// interface Pointer {
//   id: number;
//   texcoordX: number;
//   texcoordY: number;
//   prevTexcoordX: number;
//   prevTexcoordY: number;
//   deltaX: number;
//   deltaY: number;
//   down: boolean;
//   moved: boolean;
//   color: { r: number; g: number; b: number };
// }

// interface WebGLContextExt {
//   formatRGBA: { internalFormat: number; format: number } | null;
//   formatRG: { internalFormat: number; format: number } | null;
//   formatR: { internalFormat: number; format: number } | null;
//   halfFloatTexType: number | undefined;
//   supportLinearFiltering: boolean | null;
// }

// interface WebGLContextResult {
//   gl: WebGLRenderingContext & { HALF_FLOAT?: number; RG16F?: number; R16F?: number; RGBA16F?: number };
//   ext: WebGLContextExt;
// }

// interface FBO {
//   texture: WebGLTexture;
//   fbo: WebGLFramebuffer;
//   width: number;
//   height: number;
//   texelSizeX: number;
//   texelSizeY: number;
//   attach: (id: number) => number;
// }

// interface DoubleFBO {
//   width: number;
//   height: number;
//   texelSizeX: number;
//   texelSizeY: number;
//   read: FBO;
//   write: FBO;
//   swap: () => void;
// }

// interface Config {
//   SIM_RESOLUTION: number;
//   DYE_RESOLUTION: number;
//   CAPTURE_RESOLUTION: number;
//   DENSITY_DISSIPATION: number;
//   VELOCITY_DISSIPATION: number;
//   PRESSURE: number;
//   PRESSURE_ITERATIONS: number;
//   CURL: number;
//   SPLAT_RADIUS: number;
//   SPLAT_FORCE: number;
//   SHADING: boolean;
//   COLOR_UPDATE_SPEED: number;
//   PAUSED: boolean;
//   BACK_COLOR: { r: number; g: number; b: number };
//   TRANSPARENT: boolean;
// }

// import { useEffect, useRef } from "react";

// function SplashCursor({
//   SIM_RESOLUTION = 128,
//   DYE_RESOLUTION = 1440,
//   CAPTURE_RESOLUTION = 512,
//   DENSITY_DISSIPATION = 3.5,
//   VELOCITY_DISSIPATION = 2,
//   PRESSURE = 0.1,
//   PRESSURE_ITERATIONS = 20,
//   CURL = 3,
//   SPLAT_RADIUS = 0.2,
//   SPLAT_FORCE = 6000,
//   SHADING = true,
//   COLOR_UPDATE_SPEED = 10,
//   BACK_COLOR = { r: 0.5, g: 0, b: 0 },
//   TRANSPARENT = true,
// }: SplashCursorProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     function PointerPrototype(this: Pointer) {
//       this.id = -1;
//       this.texcoordX = 0;
//       this.texcoordY = 0;
//       this.prevTexcoordX = 0;
//       this.prevTexcoordY = 0;
//       this.deltaX = 0;
//       this.deltaY = 0;
//       this.down = false;
//       this.moved = false;
//       this.color = { r: 0, g: 0, b: 0 };
//     }

//     const config: Config = {
//       SIM_RESOLUTION,
//       DYE_RESOLUTION,
//       CAPTURE_RESOLUTION,
//       DENSITY_DISSIPATION,
//       VELOCITY_DISSIPATION,
//       PRESSURE,
//       PRESSURE_ITERATIONS,
//       CURL,
//       SPLAT_RADIUS,
//       SPLAT_FORCE,
//       SHADING,
//       COLOR_UPDATE_SPEED,
//       PAUSED: false,
//       BACK_COLOR,
//       TRANSPARENT,
//     };

//     const pointers: Pointer[] = [new (PointerPrototype as any)()];

//     const { gl, ext }: WebGLContextResult = getWebGLContext(canvas);
//     if (!ext.supportLinearFiltering) {
//       config.DYE_RESOLUTION = 256;
//       config.SHADING = false;
//     }

//     function getWebGLContext(canvas: HTMLCanvasElement): WebGLContextResult {
//       const params = {
//         alpha: true,
//         depth: false,
//         stencil: false,
//         antialias: false,
//         preserveDrawingBuffer: false,
//       };
//       let gl = canvas.getContext("webgl2", params) as WebGLRenderingContext & {
//         HALF_FLOAT?: number;
//         RG16F?: number;
//         R16F?: number;
//         RGBA16F?: number;
//       };
//       const isWebGL2: boolean = !!gl;
//       if (!isWebGL2)
//         gl =
//           (canvas.getContext("webgl", params) ||
//             canvas.getContext("experimental-webgl", params)) as WebGLRenderingContext & {
//               HALF_FLOAT?: number;
//               RG16F?: number;
//               R16F?: number;
//               RGBA16F?: number;
//             };
//       const halfFloat = isWebGL2 ? null : gl.getExtension("OES_texture_half_float");
//       const supportLinearFiltering = isWebGL2
//         ? gl.getExtension("OES_texture_float_linear")
//         : gl.getExtension("OES_texture_half_float_linear");
//       gl.clearColor(0.0, 0.0, 0.0, 1.0);
//       const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat?.HALF_FLOAT_OES;
//       const formatRGBA = isWebGL2
//         ? getSupportedFormat(gl, gl.RGBA16F!, gl.RGBA, halfFloatTexType)
//         : getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
//       const formatRG = isWebGL2
//         ? getSupportedFormat(gl, gl.RG16F!, (gl as WebGL2RenderingContext).RG, halfFloatTexType)
//         : getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
//       const formatR = isWebGL2
//         ? getSupportedFormat(gl, gl.R16F!, (gl as WebGL2RenderingContext).RED, halfFloatTexType)
//         : getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);

//       return {
//         gl,
//         ext: {
//           formatRGBA,
//           formatRG,
//           formatR,
//           halfFloatTexType,
//           supportLinearFiltering: !!supportLinearFiltering,
//         },
//       };
//     }

//     function getSupportedFormat(
//       gl: WebGLRenderingContext,
//       internalFormat: number,
//       format: number,
//       type: number | undefined
//     ): { internalFormat: number; format: number } | null {
//       // Only WebGL2 contexts have R16F, RG16F, RGBA16F, RG, RED, etc.
//       const isWebGL2 = typeof (gl as WebGL2RenderingContext).RG !== "undefined";
//       if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
//         switch (internalFormat) {
//           case (isWebGL2 ? (gl as WebGL2RenderingContext).R16F : 0):
//             return getSupportedFormat(
//               gl,
//               isWebGL2 ? (gl as WebGL2RenderingContext).RG16F : gl.RGBA,
//               isWebGL2 ? (gl as WebGL2RenderingContext).RG : gl.RGBA,
//               type
//             );
//           case (isWebGL2 ? (gl as WebGL2RenderingContext).RG16F : 0):
//             return getSupportedFormat(
//               gl,
//               isWebGL2 ? (gl as WebGL2RenderingContext).RGBA16F : gl.RGBA,
//               gl.RGBA,
//               type
//             );
//           default:
//             return null;
//         }
//       }
//       return {
//         internalFormat,
//         format,
//       };
//     }

//     function supportRenderTextureFormat(
//       gl: WebGLRenderingContext,
//       internalFormat: number,
//       format: number,
//       type: number | undefined
//     ): boolean {
//       const texture: WebGLTexture = gl.createTexture()!;
//       gl.bindTexture(gl.TEXTURE_2D, texture);
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//       gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type!, null);
//       const fbo: WebGLFramebuffer = gl.createFramebuffer()!;
//       gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
//       gl.framebufferTexture2D(
//         gl.FRAMEBUFFER,
//         gl.COLOR_ATTACHMENT0,
//         gl.TEXTURE_2D,
//         texture,
//         0
//       );
//       const status: number = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
//       return status === gl.FRAMEBUFFER_COMPLETE;
//     }

//     class Material {
//       vertexShader: WebGLShader;
//       fragmentShaderSource: string;
//       programs: { [key: number]: WebGLProgram };
//       activeProgram: WebGLProgram | null;
//       uniforms: { [key: string]: WebGLUniformLocation };

//       constructor(vertexShader: WebGLShader, fragmentShaderSource: string) {
//         this.vertexShader = vertexShader;
//         this.fragmentShaderSource = fragmentShaderSource;
//         this.programs = {};
//         this.activeProgram = null;
//         this.uniforms = {};
//       }

//       setKeywords(keywords: string[]): void {
//         const hash: number = keywords.reduce((acc, keyword) => acc + hashCode(keyword), 0);
//         let program = this.programs[hash];
//         if (!program) {
//           const fragmentShader: WebGLShader = compileShader(
//             gl.FRAGMENT_SHADER,
//             this.fragmentShaderSource,
//             keywords
//           );
//           program = createProgram(this.vertexShader, fragmentShader);
//           this.programs[hash] = program;
//         }
//         if (program === this.activeProgram) return;
//         this.uniforms = getUniforms(program);
//         this.activeProgram = program;
//       }

//       bind(): void {
//         gl.useProgram(this.activeProgram);
//       }
//     }

//     class Program {
//       uniforms: { [key: string]: WebGLUniformLocation };
//       program: WebGLProgram;

//       constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
//         this.uniforms = {};
//         this.program = createProgram(vertexShader, fragmentShader);
//         this.uniforms = getUniforms(this.program);
//       }

//       bind(): void {
//         gl.useProgram(this.program);
//       }
//     }

//     function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
//       const program: WebGLProgram = gl.createProgram()!;
//       gl.attachShader(program, vertexShader);
//       gl.attachShader(program, fragmentShader);
//       gl.linkProgram(program);
//       if (!gl.getProgramParameter(program, gl.LINK_STATUS))
//         console.trace(gl.getProgramInfoLog(program));
//       return program;
//     }

//     function getUniforms(program: WebGLProgram): { [key: string]: WebGLUniformLocation } {
//       const uniforms: { [key: string]: WebGLUniformLocation } = {};
//       const uniformCount: number = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
//       for (let i = 0; i < uniformCount; i++) {
//         const uniformName: string = gl.getActiveUniform(program, i)!.name;
//         uniforms[uniformName] = gl.getUniformLocation(program, uniformName)!;
//       }
//       return uniforms;
//     }

//     function compileShader(type: number, source: string, keywords?: string[]): WebGLShader {
//       const shaderSource: string = addKeywords(source, keywords);
//       const shader: WebGLShader = gl.createShader(type)!;
//       gl.shaderSource(shader, shaderSource);
//       gl.compileShader(shader);
//       if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
//         console.trace(gl.getShaderInfoLog(shader));
//       return shader;
//     }

//     function addKeywords(source: string, keywords?: string[]): string {
//       if (!keywords) return source;
//       const keywordsString: string = keywords.reduce(
//         (acc, keyword) => acc + `#define ${keyword}\n`,
//         ""
//       );
//       return keywordsString + source;
//     }

//     const baseVertexShader: WebGLShader = compileShader(
//       gl.VERTEX_SHADER,
//       `
//         precision highp float;
//         attribute vec2 aPosition;
//         varying vec2 vUv;
//         varying vec2 vL;
//         varying vec2 vR;
//         varying vec2 vT;
//         varying vec2 vB;
//         uniform vec2 texelSize;

//         void main () {
//             vUv = aPosition * 0.5 + 0.5;
//             vL = vUv - vec2(texelSize.x, 0.0);
//             vR = vUv + vec2(texelSize.x, 0.0);
//             vT = vUv + vec2(0.0, texelSize.y);
//             vB = vUv - vec2(0.0, texelSize.y);
//             gl_Position = vec4(aPosition, 0.0, 1.0);
//         }
//       `
//     );

//     const copyShader: WebGLShader = compileShader(
//       gl.FRAGMENT_SHADER,
//       `
//         precision mediump float;
//         precision mediump sampler2D;
//         varying highp vec2 vUv;
//         uniform sampler2D uTexture;

//         void main () {
//             gl_FragColor = texture2D(uTexture, vUv);
//         }
//       `
//     );

//     const clearShader: WebGLShader = compileShader(
//       gl.FRAGMENT_SHADER,
//       `
//         precision mediump float;
//         precision mediump sampler2D;
//         varying highp vec2 vUv;
//         uniform sampler2D uTexture;
//         uniform float value;

//         void main () {
//             gl_FragColor = value * texture2D(uTexture, vUv);
//         }
//      `
//     );

//     const displayShaderSource: string = `
//       precision highp float;
//       precision highp sampler2D;
//       varying vec2 vUv;
//       varying vec2 vL;
//       varying vec2 vR;
//       varying vec2 vT;
//       varying vec2 vB;
//       uniform sampler2D uTexture;
//       uniform sampler2D uDithering;
//       uniform vec2 ditherScale;
//       uniform vec2 texelSize;

//       vec3 linearToGamma (vec3 color) {
//           color = max(color, vec3(0));
//           return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
//       }

//       void main () {
//           vec3 c = texture2D(uTexture, vUv).rgb;
//           #ifdef SHADING
//               vec3 lc = texture2D(uTexture, vL).rgb;
//               vec3 rc = texture2D(uTexture, vR).rgb;
//               vec3 tc = texture2D(uTexture, vT).rgb;
//               vec3 bc = texture2D(uTexture, vB).rgb;

//               float dx = length(rc) - length(lc);
//               float dy = length(tc) - length(bc);

//               vec3 n = normalize(vec3(dx, dy, length(texelSize)));
//               vec3 l = vec3(0.0, 0.0, 1.0);

//               float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
//               c *= diffuse;
//           #endif

//           float a = max(c.r, max(c.g, c.b));
//           gl_FragColor = vec4(c, a);
//       }
//     `;

//     const splatShader: WebGLShader = compileShader(
//       gl.FRAGMENT_SHADER,
//       `
//         precision highp float;
//         precision highp sampler2D;
//         varying vec2 vUv;
//         uniform sampler2D uTarget;
//         uniform float aspectRatio;
//         uniform vec3 color;
//         uniform vec2 point;
//         uniform float radius;

//         void main () {
//             vec2 p = vUv - point.xy;
//             p.x *= aspectRatio;
//             vec3 splat = exp(-dot(p, p) / radius) * color;
//             vec3 base = texture2D(uTarget, vUv).xyz;
//             gl_FragColor = vec4(base + splat, 1.0);
//         }
//       `
//     );

//     const advectionShader: WebGLShader = compileShader(
//       gl.FRAGMENT_SHADER,
//       `
//         precision highp float;
//         precision highp sampler2D;
//         varying vec2 vUv;
//         uniform sampler2D uVelocity;
//         uniform sampler2D uSource;
//         uniform vec2 texelSize;
//         uniform vec2 dyeTexelSize;
//         uniform float dt;
//         uniform float dissipation;

//         vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
//             vec2 st = uv / tsize - 0.5;
//             vec2 iuv = floor(st);
//             vec2 fuv = fract(st);

//             vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
//             vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
//             vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
//             vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

//             return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
//         }

//         void main () {
//             #ifdef MANUAL_FILTERING
//                 vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
//                 vec4 result = bilerp(uSource, coord, dyeTexelSize);
//             #else
//                 vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
//                 vec4 result = texture2D(uSource, coord);
//             #endif
//             float decay = 1.0 + dissipation * dt;
//             gl_FragColor = result / decay;
//         }
//       `,
//       ext.supportLinearFiltering ? undefined : ["MANUAL_FILTERING"]
//     );

//     const divergenceShader: WebGLShader = compileShader(
//       gl.FRAGMENT_SHADER,
//       `
//         precision mediump float;
//         precision mediump sampler2D;
//         varying highp vec2 vUv;
//         varying highp vec2 vL;
//         varying highp vec2 vR;
//         varying highp vec2 vT;
//         varying highp vec2 vB;
//         uniform sampler2D uVelocity;

//         void main () {
//             float L = texture2D(uVelocity, vL).x;
//             float R = texture2D(uVelocity, vR).x;
//             float T = texture2D(uVelocity, vT).y;
//             float B = texture2D(uVelocity, vB).y;

//             vec2 C = texture2D(uVelocity, vUv).xy;
//             if (vL.x < 0.0) { L = -C.x; }
//             if (vR.x > 1.0) { R = -C.x; }
//             if (vT.y > 1.0) { T = -C.y; }
//             if (vB.y < 0.0) { B = -C.y; }

//             float div = 0.5 * (R - L + T - B);
//             gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
//         }
//       `
//     );

//     const curlShader: WebGLShader = compileShader(
//       gl.FRAGMENT_SHADER,
//       `
//         precision mediump float;
//         precision mediump sampler2D;
//         varying highp vec2 vUv;
//         varying highp vec2 vL;
//         varying highp vec2 vR;
//         varying highp vec2 vT;
//         varying highp vec2 vB;
//         uniform sampler2D uVelocity;

//         void main () {
//             float L = texture2D(uVelocity, vL).y;
//             float R = texture2D(uVelocity, vR).y;
//             float T = texture2D(uVelocity, vT).x;
//             float B = texture2D(uVelocity, vB).x;
//             float vorticity = R - L - T + B;
//             gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
//         }
//       `
//     );

//     const vorticityShader: WebGLShader = compileShader(
//       gl.FRAGMENT_SHADER,
//       `
//         precision highp float;
//         precision highp sampler2D;
//         varying vec2 vUv;
//         varying vec2 vL;
//         varying vec2 vR;
//         varying vec2 vT;
//         varying vec2 vB;
//         uniform sampler2D uVelocity;
//         uniform sampler2D uCurl;
//         uniform float curl;
//         uniform float dt;

//         void main () {
//             float L = texture2D(uCurl, vL).x;
//             float R = texture2D(uCurl, vR).x;
//             float T = texture2D(uCurl, vT).x;
//             float B = texture2D(uCurl, vB).x;
//             float C = texture2D(uCurl, vUv).x;

//             vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
//             force /= length(force) + 0.0001;
//             force *= curl * C;
//             force.y *= -1.0;

//             vec2 velocity = texture2D(uVelocity, vUv).xy;
//             velocity += force * dt;
//             velocity = min(max(velocity, -1000.0), 1000.0);
//             gl_FragColor = vec4(velocity, 0.0, 1.0);
//         }
//       `
//     );

//     const pressureShader: WebGLShader = compileShader(
//       gl.FRAGMENT_SHADER,
//       `
//         precision mediump float;
//         precision mediump sampler2D;
//         varying highp vec2 vUv;
//         varying highp vec2 vL;
//         varying highp vec2 vR;
//         varying highp vec2 vT;
//         varying highp vec2 vB;
//         uniform sampler2D uPressure;
//         uniform sampler2D uDivergence;

//         void main () {
//             float L = texture2D(uPressure, vL).x;
//             float R = texture2D(uPressure, vR).x;
//             float T = texture2D(uPressure, vT).x;
//             float B = texture2D(uPressure, vB).x;
//             float C = texture2D(uPressure, vUv).x;
//             float divergence = texture2D(uDivergence, vUv).x;
//             float pressure = (L + R + B + T - divergence) * 0.25;
//             gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
//         }
//       `
//     );

//     const gradientSubtractShader: WebGLShader = compileShader(
//       gl.FRAGMENT_SHADER,
//       `
//         precision mediump float;
//         precision mediump sampler2D;
//         varying highp vec2 vUv;
//         varying highp vec2 vL;
//         varying highp vec2 vR;
//         varying highp vec2 vT;
//         varying highp vec2 vB;
//         uniform sampler2D uPressure;
//         uniform sampler2D uVelocity;

//         void main () {
//             float L = texture2D(uPressure, vL).x;
//             float R = texture2D(uPressure, vR).x;
//             float T = texture2D(uPressure, vT).x;
//             float B = texture2D(uPressure, vB).x;
//             vec2 velocity = texture2D(uVelocity, vUv).xy;
//             velocity.xy -= vec2(R - L, T - B);
//             gl_FragColor = vec4(velocity, 0.0, 1.0);
//         }
//       `
//     );

//     const blit = (() => {
//       gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()!);
//       gl.bufferData(
//         gl.ARRAY_BUFFER,
//         new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
//         gl.STATIC_DRAW
//       );
//       gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer()!);
//       gl.bufferData(
//         gl.ELEMENT_ARRAY_BUFFER,
//         new Uint16Array([0, 1, 2, 0, 2, 3]),
//         gl.STATIC_DRAW
//       );
//       gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
//       gl.enableVertexAttribArray(0);
//       return (target: FBO | null, clear: boolean = false): void => {
//         if (target == null) {
//           gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
//           gl.bindFramebuffer(gl.FRAMEBUFFER, null);
//         } else {
//           gl.viewport(0, 0, target.width, target.height);
//           gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
//         }
//         if (clear) {
//           gl.clearColor(0.0, 0.0, 0.0, 1.0);
//           gl.clear(gl.COLOR_BUFFER_BIT);
//         }
//         gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
//       };
//     })();

//     let dye: DoubleFBO | null = null;
//     let velocity: DoubleFBO | null = null;
//     let divergence: FBO | null = null;
//     let curl: FBO | null = null;
//     let pressure: DoubleFBO | null = null;

//     const copyProgram: Program = new Program(baseVertexShader, copyShader);
//     const clearProgram: Program = new Program(baseVertexShader, clearShader);
//     const splatProgram: Program = new Program(baseVertexShader, splatShader);
//     const advectionProgram: Program = new Program(baseVertexShader, advectionShader);
//     const divergenceProgram: Program = new Program(baseVertexShader, divergenceShader);
//     const curlProgram: Program = new Program(baseVertexShader, curlShader);
//     const vorticityProgram: Program = new Program(baseVertexShader, vorticityShader);
//     const pressureProgram: Program = new Program(baseVertexShader, pressureShader);
//     const gradientSubtractProgram: Program = new Program(baseVertexShader, gradientSubtractShader);
//     const displayMaterial: Material = new Material(baseVertexShader, displayShaderSource);

//     function initFramebuffers(): void {
//       const simRes = getResolution(config.SIM_RESOLUTION);
//       const dyeRes = getResolution(config.DYE_RESOLUTION);
//       const texType = ext.halfFloatTexType;
//       const rgba = ext.formatRGBA;
//       const rg = ext.formatRG;
//       const r = ext.formatR;
//       const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
//       gl.disable(gl.BLEND);
//       if (!dye || !rgba)
//         dye = createDoubleFBO(
//           dyeRes.width,
//           dyeRes.height,
//           rgba?.internalFormat ?? 0,
//           rgba?.format ?? 0,
//           texType,
//           filtering
//         );
//       else
//         dye = resizeDoubleFBO(
//           dye,
//           dyeRes.width,
//           dyeRes.height,
//           rgba!.internalFormat,
//           rgba!.format,
//           texType,
//           filtering
//         );

//       if (!velocity)
//         velocity = createDoubleFBO(
//           simRes.width,
//           simRes.height,
//           rg!.internalFormat,
//           rg!.format,
//           texType,
//           filtering
//         );
//       else
//         velocity = resizeDoubleFBO(
//           velocity,
//           simRes.width,
//           simRes.height,
//           rg!.internalFormat,
//           rg!.format,
//           texType,
//           filtering
//         );

//       divergence = createFBO(
//         simRes.width,
//         simRes.height,
//         r!.internalFormat,
//         r!.format,
//         texType,
//         gl.NEAREST
//       );
//       curl = createFBO(
//         simRes.width,
//         simRes.height,
//         r!.internalFormat,
//         r!.format,
//         texType,
//         gl.NEAREST
//       );
//       pressure = createDoubleFBO(
//         simRes.width,
//         simRes.height,
//         r!.internalFormat,
//         r!.format,
//         texType,
//         gl.NEAREST
//       );
//     }

//     function createFBO(
//       w: number,
//       h: number,
//       internalFormat: number,
//       format: number,
//       type: number | undefined,
//       param: number
//     ): FBO {
//       gl.activeTexture(gl.TEXTURE0);
//       const texture: WebGLTexture = gl.createTexture()!;
//       gl.bindTexture(gl.TEXTURE_2D, texture);
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//       gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type!, null);

//       const fbo: WebGLFramebuffer = gl.createFramebuffer()!;
//       gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
//       gl.framebufferTexture2D(
//         gl.FRAMEBUFFER,
//         gl.COLOR_ATTACHMENT0,
//         gl.TEXTURE_2D,
//         texture,
//         0
//       );
//       gl.viewport(0, 0, w, h);
//       gl.clear(gl.COLOR_BUFFER_BIT);

//       const texelSizeX: number = 1.0 / w;
//       const texelSizeY: number = 1.0 / h;
//       return {
//         texture,
//         fbo,
//         width: w,
//         height: h,
//         texelSizeX,
//         texelSizeY,
//         attach(id: number): number {
//           gl.activeTexture(gl.TEXTURE0 + id);
//           gl.bindTexture(gl.TEXTURE_2D, texture);
//           return id;
//         },
//       };
//     }

//     function createDoubleFBO(
//       w: number,
//       h: number,
//       internalFormat: number,
//       format: number,
//       type: number | undefined,
//       param: number
//     ): DoubleFBO {
//       let fbo1: FBO = createFBO(w, h, internalFormat, format, type, param);
//       let fbo2: FBO = createFBO(w, h, internalFormat, format, type, param);
//       return {
//         width: w,
//         height: h,
//         texelSizeX: fbo1.texelSizeX,
//         texelSizeY: fbo1.texelSizeY,
//         get read(): FBO {
//           return fbo1;
//         },
//         set read(value: FBO) {
//           fbo1 = value;
//         },
//         get write(): FBO {
//           return fbo2;
//         },
//         set write(value: FBO) {
//           fbo2 = value;
//         },
//         swap(): void {
//           const temp: FBO = fbo1;
//           fbo1 = fbo2;
//           fbo2 = temp;
//         },
//       };
//     }

//     function resizeFBO(
//       target: FBO,
//       w: number,
//       h: number,
//       internalFormat: number,
//       format: number,
//       type: number | undefined,
//       param: number
//     ): FBO {
//       const newFBO: FBO = createFBO(w, h, internalFormat, format, type, param);
//       copyProgram.bind();
//       gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
//       blit(newFBO);
//       return newFBO;
//     }

//     function resizeDoubleFBO(
//       target: DoubleFBO,
//       w: number,
//       h: number,
//       internalFormat: number,
//       format: number,
//       type: number | undefined,
//       param: number
//     ): DoubleFBO {
//       if (target.width === w && target.height === h) return target;
//       target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
//       target.write = createFBO(w, h, internalFormat, format, type, param);
//       target.width = w;
//       target.height = h;
//       target.texelSizeX = 1.0 / w;
//       target.texelSizeY = 1.0 / h;
//       return target;
//     }

//     function updateKeywords(): void {
//       const displayKeywords: string[] = [];
//       if (config.SHADING) displayKeywords.push("SHADING");
//       displayMaterial.setKeywords(displayKeywords);
//     }

//     updateKeywords();
//     initFramebuffers();
//     let lastUpdateTime: number = Date.now();
//     let colorUpdateTimer: number = 0.0;

//     function updateFrame(): void {
//       const dt: number = calcDeltaTime();
//       if (resizeCanvas()) initFramebuffers();
//       updateColors(dt);
//       applyInputs();
//       step(dt);
//       render(null);
//       requestAnimationFrame(updateFrame);
//     }

//     function calcDeltaTime(): number {
//       const now: number = Date.now();
//       const dt: number = Math.min((now - lastUpdateTime) / 1000, 0.016666);
//       lastUpdateTime = now;
//       return dt;
//     }

//     function resizeCanvas(): boolean {
//       if (!canvas) return false;
//       const width: number = scaleByPixelRatio(canvas.clientWidth);
//       const height: number = scaleByPixelRatio(canvas.clientHeight);
//       if (canvas.width !== width || canvas.height !== height) {
//         canvas.width = width;
//         canvas.height = height;
//         return true;
//       }
//       return false;
//     }

//     function updateColors(dt: number): void {
//       colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
//       if (colorUpdateTimer >= 1) {
//         colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
//         pointers.forEach((p: Pointer) => {
//           p.color = generateColor();
//         });
//       }
//     }

//     function applyInputs(): void {
//       pointers.forEach((p: Pointer) => {
//         if (p.moved) {
//           p.moved = false;
//           splatPointer(p);
//         }
//       });
//     }

//     function step(dt: number): void {
//       gl.disable(gl.BLEND);
//       // Curl
//       curlProgram.bind();
//       gl.uniform2f(curlProgram.uniforms.texelSize, velocity!.texelSizeX, velocity!.texelSizeY);
//       gl.uniform1i(curlProgram.uniforms.uVelocity, velocity!.read.attach(0));
//       blit(curl);

//       // Vorticity
//       vorticityProgram.bind();
//       gl.uniform2f(
//         vorticityProgram.uniforms.texelSize,
//         velocity!.texelSizeX,
//         velocity!.texelSizeY
//       );
//       gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity!.read.attach(0));
//       gl.uniform1i(vorticityProgram.uniforms.uCurl, curl!.attach(1));
//       gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
//       gl.uniform1f(vorticityProgram.uniforms.dt, dt);
//       blit(velocity!.write);
//       velocity!.swap();

//       // Divergence
//       divergenceProgram.bind();
//       gl.uniform2f(
//         divergenceProgram.uniforms.texelSize,
//         velocity!.texelSizeX,
//         velocity!.texelSizeY
//       );
//       gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity!.read.attach(0));
//       blit(divergence);

//       // Clear pressure
//       clearProgram.bind();
//       gl.uniform1i(clearProgram.uniforms.uTexture, pressure!.read.attach(0));
//       gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
//       blit(pressure!.write);
//       pressure!.swap();

//       // Pressure
//       pressureProgram.bind();
//       gl.uniform2f(
//         pressureProgram.uniforms.texelSize,
//         velocity!.texelSizeX,
//         velocity!.texelSizeY
//       );
//       gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence!.attach(0));
//       for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
//         gl.uniform1i(pressureProgram.uniforms.uPressure, pressure!.read.attach(1));
//         blit(pressure!.write);
//         pressure!.swap();
//       }

//       // Gradient Subtract
//       gradientSubtractProgram.bind();
//       gl.uniform2f(
//         gradientSubtractProgram.uniforms.texelSize,
//         velocity!.texelSizeX,
//         velocity!.texelSizeY
//       );
//       gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure!.read.attach(0));
//       gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity!.read.attach(1));
//       blit(velocity!.write);
//       velocity!.swap();

//       // Advection
//       advectionProgram.bind();
//       gl.uniform2f(
//         advectionProgram.uniforms.texelSize,
//         velocity!.texelSizeX,
//         velocity!.texelSizeY
//       );
//       if (!ext.supportLinearFiltering)
//         gl.uniform2f(
//           advectionProgram.uniforms.dyeTexelSize,
//           velocity!.texelSizeX,
//           velocity!.texelSizeY
//         );
//       const velocityId: number = velocity!.read.attach(0);
//       gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
//       gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
//       gl.uniform1f(advectionProgram.uniforms.dt, dt);
//       gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
//       blit(velocity!.write);
//       velocity!.swap();

//       if (!ext.supportLinearFiltering)
//         gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye!.texelSizeX, dye!.texelSizeY);
//       gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity!.read.attach(0));
//       gl.uniform1i(advectionProgram.uniforms.uSource, dye!.read.attach(1));
//       gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
//       blit(dye!.write);
//       dye!.swap();
//     }

//     function render(target: FBO | null): void {
//       gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
//       gl.enable(gl.BLEND);
//       drawDisplay(target);
//     }

//     function drawDisplay(target: FBO | null): void {
//       const width: number = target == null ? gl.drawingBufferWidth : target.width;
//       const height: number = target == null ? gl.drawingBufferHeight : target.height;
//       displayMaterial.bind();
//       if (config.SHADING)
//         gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
//       gl.uniform1i(displayMaterial.uniforms.uTexture, dye!.read.attach(0));
//       blit(target);
//     }

//     function splatPointer(pointer: Pointer): void {
//       const dx: number = pointer.deltaX * config.SPLAT_FORCE;
//       const dy: number = pointer.deltaY * config.SPLAT_FORCE;
//       splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
//     }

//     function clickSplat(pointer: Pointer): void {
//       const color = generateColor();
//       color.r *= 10.0;
//       color.g *= 10.0;
//       color.b *= 10.0;
//       const dx: number = 10 * (Math.random() - 0.5);
//       const dy: number = 30 * (Math.random() - 0.5);
//       splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
//     }

//     function splat(x: number, y: number, dx: number, dy: number, color: { r: number; g: number; b: number }): void {
//       if (!canvas) return;
//       splatProgram.bind();
//       gl.uniform1i(splatProgram.uniforms.uTarget, velocity!.read.attach(0));
//       gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
//       gl.uniform2f(splatProgram.uniforms.point, x, y);
//       gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
//       gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
//       blit(velocity!.write);
//       velocity!.swap();

//       gl.uniform1i(splatProgram.uniforms.uTarget, dye!.read.attach(0));
//       gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
//       blit(dye!.write);
//       dye!.swap();
//     }

//     function correctRadius(radius: number): number {
//       if (!canvas) return radius;
//       const aspectRatio: number = canvas.width / canvas.height;
//       if (aspectRatio > 1) radius *= aspectRatio;
//       return radius;
//     }

//     function updatePointerDownData(pointer: Pointer, id: number, posX: number, posY: number): void {
//       if (!canvas) return;
//       pointer.id = id;
//       pointer.down = true;
//       pointer.moved = false;
//       pointer.texcoordX = posX / canvas.width;
//       pointer.texcoordY = 1.0 - posY / canvas.height;
//       pointer.prevTexcoordX = pointer.texcoordX;
//       pointer.prevTexcoordY = pointer.texcoordY;
//       pointer.deltaX = 0;
//       pointer.deltaY = 0;
//       pointer.color = generateColor();
//     }

//     function updatePointerMoveData(pointer: Pointer, posX: number, posY: number, color: { r: number; g: number; b: number }): void {
//       if (!canvas) return;
//       pointer.prevTexcoordX = pointer.texcoordX;
//       pointer.prevTexcoordY = pointer.texcoordY;
//       pointer.texcoordX = posX / canvas.width;
//       pointer.texcoordY = 1.0 - posY / canvas.height;
//       pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
//       pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
//       pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
//       pointer.color = color;
//     }

//     function updatePointerUpData(pointer: Pointer): void {
//       pointer.down = false;
//     }

//     function correctDeltaX(delta: number): number {
//       if (!canvas) return delta;
//       const aspectRatio: number = canvas.width / canvas.height;
//       if (aspectRatio < 1) delta *= aspectRatio;
//       return delta;
//     }

//     function correctDeltaY(delta: number): number {
//       if (!canvas) return delta;
//       const aspectRatio: number = canvas.width / canvas.height;
//       if (aspectRatio > 1) delta /= aspectRatio;
//       return delta;
//     }

//     function generateColor(): { r: number; g: number; b: number } {
//       const c = HSVtoRGB(Math.random(), 1.0, 1.0);
//       c.r *= 0.15;
//       c.g *= 0.15;
//       c.b *= 0.15;
//       return c;
//     }

//     function HSVtoRGB(h: number, s: number, v: number): { r: number; g: number; b: number } {
//       const i: number = Math.floor(h * 6);
//       const f: number = h * 6 - i;
//       const p: number = v * (1 - s);
//       const q: number = v * (1 - f * s);
//       const t: number = v * (1 - (1 - f) * s);
//       let r: number = 0,
//         g: number = 0,
//         b: number = 0;
//       switch (i % 6) {
//         case 0:
//           r = v;
//           g = t;
//           b = p;
//           break;
//         case 1:
//           r = q;
//           g = v;
//           b = p;
//           break;
//         case 2:
//           r = p;
//           g = v;
//           b = t;
//           break;
//         case 3:
//           r = p;
//           g = q;
//           b = v;
//           break;
//         case 4:
//           r = t;
//           g = p;
//           b = v;
//           break;
//         case 5:
//           r = v;
//           g = p;
//           b = q;
//           break;
//       }
//       return { r, g, b };
//     }

//     function wrap(value: number, min: number, max: number): number {
//       const range: number = max - min;
//       if (range === 0) return min;
//       return ((value - min) % range) + min;
//     }

//     function getResolution(resolution: number): { width: number; height: number } {
//       const aspectRatio: number = gl.drawingBufferWidth / gl.drawingBufferHeight;
//       const adjustedAspectRatio: number = aspectRatio < 1 ? 1.0 / aspectRatio : aspectRatio;
//       const min: number = Math.round(resolution);
//       const max: number = Math.round(resolution * adjustedAspectRatio);
//       return gl.drawingBufferWidth > gl.drawingBufferHeight
//         ? { width: max, height: min }
//         : { width: min, height: max };
//     }

//     function scaleByPixelRatio(input: number): number {
//       const pixelRatio: number = window.devicePixelRatio || 1;
//       return Math.floor(input * pixelRatio);
//     }

//     function hashCode(s: string): number {
//       if (s.length === 0) return 0;
//       let hash: number = 0;
//       for (let i = 0; i < s.length; i++) {
//         hash = (hash << 5) - hash + s.charCodeAt(i);
//         hash |= 0;
//       }
//       return hash;
//     }

//     window.addEventListener("mousedown", (e: MouseEvent) => {
//       const pointer: Pointer = pointers[0];
//       const posX: number = scaleByPixelRatio(e.clientX);
//       const posY: number = scaleByPixelRatio(e.clientY);
//       updatePointerDownData(pointer, -1, posX, posY);
//       clickSplat(pointer);
//     });

//     document.body.addEventListener(
//       "mousemove",
//       function handleFirstMouseMove(e: MouseEvent): void {
//         const pointer: Pointer = pointers[0];
//         const posX: number = scaleByPixelRatio(e.clientX);
//         const posY: number = scaleByPixelRatio(e.clientY);
//         const color = generateColor();
//         updateFrame(); // start animation loop
//         updatePointerMoveData(pointer, posX, posY, color);
//         document.body.removeEventListener("mousemove", handleFirstMouseMove);
//       }
//     );

//     window.addEventListener("mousemove", (e: MouseEvent) => {
//       const pointer: Pointer = pointers[0];
//       const posX: number = scaleByPixelRatio(e.clientX);
//       const posY: number = scaleByPixelRatio(e.clientY);
//       const color = pointer.color;
//       updatePointerMoveData(pointer, posX, posY, color);
//     });

//     document.body.addEventListener(
//       "touchstart",
//       function handleFirstTouchStart(e: TouchEvent): void {
//         const touches: TouchList = e.targetTouches;
//         const pointer: Pointer = pointers[0];
//         for (let i = 0; i < touches.length; i++) {
//           const posX: number = scaleByPixelRatio(touches[i].clientX);
//           const posY: number = scaleByPixelRatio(touches[i].clientY);
//           updateFrame(); // start animation loop
//           updatePointerDownData(pointer, touches[i].identifier, posX, posY);
//         }
//         document.body.removeEventListener("touchstart", handleFirstTouchStart);
//       }
//     );

//     window.addEventListener("touchstart", (e: TouchEvent) => {
//       const touches: TouchList = e.targetTouches;
//       const pointer: Pointer = pointers[0];
//       for (let i = 0; i < touches.length; i++) {
//         const posX: number = scaleByPixelRatio(touches[i].clientX);
//         const posY: number = scaleByPixelRatio(touches[i].clientY);
//         updatePointerDownData(pointer, touches[i].identifier, posX, posY);
//       }
//     });

//     window.addEventListener(
//       "touchmove",
//       (e: TouchEvent) => {
//         const touches: TouchList = e.targetTouches;
//         const pointer: Pointer = pointers[0];
//         for (let i = 0; i < touches.length; i++) {
//           const posX: number = scaleByPixelRatio(touches[i].clientX);
//           const posY: number = scaleByPixelRatio(touches[i].clientY);
//           updatePointerMoveData(pointer, posX, posY, pointer.color);
//         }
//       },
//       false
//     );

//     window.addEventListener("touchend", (e: TouchEvent) => {
//       const touches: TouchList = e.changedTouches;
//       const pointer: Pointer = pointers[0];
//       for (let i = 0; i < touches.length; i++) {
//         updatePointerUpData(pointer);
//       }
//     });

//     updateFrame();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     SIM_RESOLUTION,
//     DYE_RESOLUTION,
//     CAPTURE_RESOLUTION,
//     DENSITY_DISSIPATION,
//     VELOCITY_DISSIPATION,
//     PRESSURE,
//     PRESSURE_ITERATIONS,
//     CURL,
//     SPLAT_RADIUS,
//     SPLAT_FORCE,
//     SHADING,
//     COLOR_UPDATE_SPEED,
//     BACK_COLOR,
//     TRANSPARENT,
//   ]);

//   return (
//     <div className="fixed top-0 left-0 z-50 pointer-events-none">
//       <canvas ref={canvasRef} id="fluid" className="w-screen h-screen" />
//     </div>
//   );
// }

// export { SplashCursor };