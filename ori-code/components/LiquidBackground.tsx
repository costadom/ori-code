"use client";
import { useEffect, useRef } from "react";

export default function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: true });
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 position;
      void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse; // Nova variável para o mouse

      float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
      float noise(vec2 p) {
          vec2 i = floor(p), f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                     mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
      }
      float fbm(vec2 p) {
          float v = 0.0, a = 0.5;
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < 5; i++) {
              v += a * noise(p); p = rot * p * 2.0; a *= 0.5;
          }
          return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;
        
        // Reação ao mouse: desloca as coordenadas da fumaça suavemente
        p -= u_mouse * 0.3; 

        float t = u_time * 0.1;

        vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
        vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.5), fbm(p + 4.0 * q + vec2(8.3, 2.8) - t * 0.3));
        float smoke = fbm(p + 3.0 * r);

        vec3 col = mix(vec3(0.02, 0.0, 0.05), vec3(0.15, 0.05, 0.25), smoke);
        col = mix(col, vec3(0.65, 0.45, 0.15), smoke * smoke * 1.5);

        float symbolAlpha = (sin(t * 2.0) * 0.5 + 0.5) * 0.04;
        vec2 center = p + u_mouse * 0.1; // Símbolo tem paralaxe menor
        float radius = length(center);
        
        float mist = smoothstep(0.01, 0.0, abs(radius - 0.4)) + smoothstep(0.01, 0.0, abs(radius - 0.7));
        mist += smoothstep(0.005, 0.0, abs(center.x)) * smoothstep(0.0, 0.5, radius);
        mist += smoothstep(0.005, 0.0, abs(center.y)) * smoothstep(0.0, 0.5, radius);
        
        col += vec3(0.8, 0.6, 0.2) * mist * symbolAlpha;

        float vignette = smoothstep(1.5, 0.2, length(p));
        col *= vignette;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if(!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if(!prog) return;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs);
    gl.linkProgram(prog); gl.useProgram(prog);

    const verts = new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    // Lógica de Mouse/Touch Smooth
    let mouseX = 0; let mouseY = 0;
    let targetMouseX = 0; let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if(e.touches.length > 0) {
        targetMouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    let start = Date.now(), reqId: number;
    const render = () => {
      // Interpolação suave do mouse (lerp)
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      
      gl.uniform1f(uTime, (Date.now() - start) / 1000);
      gl.uniform2f(uMouse, mouseX, mouseY);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      reqId = requestAnimationFrame(render);
    };
    render();

    return () => { 
      window.removeEventListener("resize", resize); 
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(reqId); 
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />;
}