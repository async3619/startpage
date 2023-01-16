import * as webglUtils from "twgl.js";

import vertexShader from "@shaders/vertex.glsl";
import fragmentShader from "@shaders/fragment.glsl";
import { loadTexture } from "@/graphics/loadTexture";
import { setRectangle } from "@/graphics/setRectangle";

export class Graphics {
    public static async create(canvas: HTMLCanvasElement) {
        const graphics = new Graphics(canvas);
        await graphics.initialize();

        return graphics;
    }

    private readonly vao: WebGLVertexArrayObject;
    private readonly webgl: WebGL2RenderingContext;
    private readonly program: WebGLProgram;
    private readonly positionBuffer: WebGLBuffer;
    private readonly positionAttributeLocation: GLint;
    private readonly resolutionLocation: WebGLUniformLocation;
    private readonly timeLocation: WebGLUniformLocation;
    private readonly samplerLocation: WebGLUniformLocation;
    private readonly imageLocation: WebGLUniformLocation;

    private lastRenderAt = 0;
    private time = 0;
    private requestId = -1;

    private imageWidth = 0;
    private imageHeight = 0;
    private imageWidthScale = 1;
    private imageHeightScale = 1;

    private constructor(private readonly canvas: HTMLCanvasElement) {
        const gl = this.canvas.getContext("webgl2");
        if (!gl) {
            throw new Error("WebGL is not supported");
        }

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.webgl = gl;

        // setup GLSL program
        this.program = webglUtils.createProgramFromSources(this.webgl, [vertexShader, fragmentShader]);

        // look up where the vertex data needs to go.
        this.positionAttributeLocation = this.webgl.getAttribLocation(this.program, "a_position");

        // look up uniform locations
        const resolutionLocation = this.webgl.getUniformLocation(this.program, "iResolution");
        const timeLocation = this.webgl.getUniformLocation(this.program, "iTime");
        const imageLocation = this.webgl.getUniformLocation(this.program, "iRLS");
        const sampler = this.webgl.getUniformLocation(this.program, "iChannel0");
        if (!resolutionLocation || !timeLocation || !sampler || !imageLocation) {
            throw new Error("Could not find uniform locations");
        }

        this.resolutionLocation = resolutionLocation;
        this.timeLocation = timeLocation;
        this.samplerLocation = sampler;
        this.imageLocation = imageLocation;

        // Create a buffer to put three 2d clip space points in
        const positionBuffer = this.webgl.createBuffer();
        if (!positionBuffer) {
            throw new Error("Failed to create buffer");
        }

        this.positionBuffer = positionBuffer;

        // Create a vertex array object (attribute state)
        const vao = gl.createVertexArray();
        if (!vao) {
            throw new Error("Failed to create vertex array object");
        }

        // and make it the one we're currently working with
        gl.bindVertexArray(vao);

        this.vao = vao;
    }

    public async initialize() {
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.positionBuffer);

        // fill it with a 2 triangles that cover clipspace
        this.webgl.bufferData(
            this.webgl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            this.webgl.STATIC_DRAW,
        );

        const { image } = await loadTexture(this.webgl, "/assets/background.jpeg");
        this.imageWidth = image.width;
        this.imageHeight = image.height;

        this.imageWidthScale = this.imageWidth / window.innerWidth;
        this.imageHeightScale = this.imageHeight / window.innerHeight;

        this.webgl.pixelStorei(this.webgl.UNPACK_FLIP_Y_WEBGL, true);

        window.addEventListener("resize", this.handleResize);
    }

    public startRender() {
        this.requestId = requestAnimationFrame(this.render);
    }
    public stopRender() {
        if (this.requestId === -1) {
            return;
        }

        cancelAnimationFrame(this.requestId);
    }

    private render = (currentTime: number) => {
        currentTime *= 0.001; // convert to seconds
        const elapsedTime = Math.min(currentTime - this.lastRenderAt, 0.1);

        this.time += elapsedTime;
        this.lastRenderAt = currentTime;

        // Tell WebGL how to convert from clip space to pixels
        this.webgl.viewport(0, 0, window.innerWidth, window.innerHeight);

        // Tell it to use our program (pair of shaders)
        this.webgl.useProgram(this.program);

        // Bind the attribute/buffer set we want.
        this.webgl.bindVertexArray(this.vao);

        // Turn on the attribute
        this.webgl.enableVertexAttribArray(this.positionAttributeLocation);

        // Bind the position buffer.
        this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, this.positionBuffer);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        const size = 2; // 2 components per iteration
        const type = this.webgl.FLOAT; // the data is 32bit floats
        const normalize = false; // don't normalize the data
        const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset = 0; // start at the beginning of the buffer
        this.webgl.vertexAttribPointer(this.positionAttributeLocation, size, type, normalize, stride, offset);

        console.log(this.imageWidthScale, this.imageHeightScale);

        this.webgl.uniform2f(this.resolutionLocation, window.innerWidth, window.innerHeight);
        this.webgl.uniform2f(this.imageLocation, this.imageWidth, this.imageHeight);
        this.webgl.uniform1f(this.timeLocation, this.time);
        this.webgl.uniform1i(this.samplerLocation, 0);

        const width = 2 * this.imageWidthScale;
        const height = 2 * this.imageHeightScale;

        setRectangle(this.webgl, -width / 2, -height / 2, width, height);
        this.webgl.drawArrays(this.webgl.TRIANGLES, 0, 6);

        this.requestId = window.requestAnimationFrame(this.render);
    };

    private handleResize = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.imageWidthScale = this.imageWidth / window.innerWidth;
        this.imageHeightScale = this.imageHeight / window.innerHeight;
    };
}
