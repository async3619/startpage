#version 300 es

in vec2 a_position;

void main() {
    gl_Position = vec4(a_position.xy,0.0,1.0);;
}
