
const canvas = document.getElementById('webglCanvas');
const gl = canvas.getContext('webgl');


if (!gl) {
    console.error("WebGL not supported");
}


const vertexShaderSource = `
    attribute vec2 aPosition;
    attribute vec4 aColor;
    varying vec4 vColor;

    uniform float uPointSize;

    void main() {
        gl_PointSize = uPointSize;
        gl_Position = vec4(aPosition, 0.0, 1.0);
        vColor = aColor; // Pass the color to the fragment shader
    }
`;


const fragmentShaderSource = `
    precision mediump float;
    varying vec4 vColor;

    void main() {
        gl_FragColor = vColor; // Use interpolated color
    }
`;


function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile failed: ", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}


const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link failed: ", gl.getProgramInfoLog(program));
}


gl.useProgram(program);


const aPosition = gl.getAttribLocation(program, 'aPosition');
const aColor = gl.getAttribLocation(program, 'aColor');
const uPointSize = gl.getUniformLocation(program, 'uPointSize');


function bindBuffer(data, attribute, size) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.vertexAttribPointer(attribute, size, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attribute);
}


function bindColorBuffer(colors) {
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aColor);
}


function drawPoints() {
    const points = new Float32Array([
        -0.1, -0.2,  // Bottom-left
        0.1, -0.2,   // Bottom-right
        -0.1, -0.3,  // Top-left
        0.1, -0.3    // Top-right
    ]);

    const colors = new Float32Array([
        1.0, 0.0, 0.0, 1.0, // Red
        0.0, 1.0, 0.0, 1.0, // Green
        0.0, 0.0, 1.0, 1.0, // Blue
        1.0, 1.0, 0.0, 1.0  // Yellow
    ]);

    bindBuffer(points, aPosition, 2);
    bindColorBuffer(colors);
    const pointSizes = [13.0, 13.0, 8.0, 8.0];
    for (let i = 0; i < points.length / 2; i++) {
        gl.uniform1f(uPointSize, pointSizes[i]);
        gl.drawArrays(gl.POINTS, i, 1);
    }
}


function drawLineLoop() {
    const lineLoop = new Float32Array([
        -0.2, -0.5,  // Bottom-left
        0.2, -0.5,   // Bottom-right
        0.2, 0.0,    // Top-right
        -0.2, 0.0    // Top-left
    ]);

    const colors = new Float32Array([
        1.0, 0.0, 1.0, 1.0, // Magenta
        0.0, 1.0, 1.0, 1.0, // Cyan
        1.0, 1.0, 0.0, 1.0, // Yellow
        0.5, 0.5, 0.5, 1.0  // Gray
    ]);

    bindBuffer(lineLoop, aPosition, 2);
    bindColorBuffer(colors);

    gl.drawArrays(gl.LINE_LOOP, 0, 4);
}


function drawTriangle() {
    const triangle = new Float32Array([
        -0.2, 0.0,  // Bottom-left
        0.2, 0.0,   // Bottom-right
        0.0, 0.4    // Top
    ]);

    const colors = new Float32Array([
        0.0, 0.0, 1.0, 1.0, // Blue
        0.0, 1.0, 0.0, 1.0, // Green
        1.0, 0.0, 0.0, 1.0  // Red
    ]);

    bindBuffer(triangle, aPosition, 2);
    bindColorBuffer(colors);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}


function drawLines() {
    const lineData = new Float32Array([
        -0.5, -0.5,   // Line 1 start
        0.5, -0.5,    // Line 1 end
        -0.5, 0.5,    // Line 2 start
        0.5, 0.5      // Line 2 end
    ]);

    const colors = new Float32Array([
        1.0, 0.0, 0.0, 1.0, // Red
        1.0, 0.0, 0.0, 1.0, // Red
        0.0, 0.0, 1.0, 1.0, // Blue
        0.0, 0.0, 1.0, 1.0  // Blue
    ]);

    bindBuffer(lineData, aPosition, 2);
    bindColorBuffer(colors);

 
    gl.drawArrays(gl.LINES, 0, 2);

   
    gl.drawArrays(gl.LINES, 2, 2);
}


function createThickLine(x1, y1, x2, y2, thickness) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const ux = (dy / length) * thickness / 2;
    const uy = -(dx / length) * thickness / 2;

    return new Float32Array([
        x1 - ux, y1 - uy,
        x1 + ux, y1 + uy,
        x2 - ux, y2 - uy,
        x2 + ux, y2 + uy,
    ]);
}


function drawThickLine(lineBuffer, color) {
    bindBuffer(lineBuffer, aPosition, 2);

    const colorArray = new Float32Array([
        ...color, ...color, ...color, ...color
    ]);

    bindColorBuffer(colorArray);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}


function drawPrimitives() {
    drawPoints();
    drawLineLoop();
    drawTriangle();
    drawLines();

    const thickLine1 = createThickLine(-0.5, -0.5, 0.5, -0.5, 0.03);
    drawThickLine(thickLine1, [1.0, 0.0, 0.0, 1.0]);

 
}

gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);


drawPrimitives();
