export async function loadTexture(webgl: WebGL2RenderingContext, url: string) {
    const texture = webgl.createTexture();
    if (!texture) {
        throw new Error("Failed to create texture");
    }

    return new Promise<{ texture: WebGLTexture; image: HTMLImageElement }>((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            webgl.bindTexture(webgl.TEXTURE_2D, texture);

            webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, true);
            webgl.pixelStorei(webgl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            webgl.pixelStorei(webgl.UNPACK_COLORSPACE_CONVERSION_WEBGL, webgl.NONE);

            webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA8, webgl.RGBA, webgl.UNSIGNED_BYTE, image);

            webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.REPEAT);
            webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.REPEAT);

            // WebGL1 has different requirements for power of 2 images
            // vs. non power of 2 images so check if the image is a
            // power of 2 in both dimensions.
            webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.LINEAR);
            webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.LINEAR_MIPMAP_LINEAR);
            webgl.generateMipmap(webgl.TEXTURE_2D);

            webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, false);

            resolve({ texture, image });
        };

        image.onerror = e => {
            reject(e);
        };

        image.src = url;
    });
}
