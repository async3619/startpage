import React from "react";

import { Box } from "@mui/material";
import { Graphics } from "@/graphics";

import { Overlay, Root } from "@/components/Background.styles";

export class Background extends React.Component {
    private canvas = React.createRef<HTMLCanvasElement>();
    private graphics: Graphics | null = null;
    private initialized = false;

    public async componentDidMount() {
        if (!this.canvas.current || typeof window === "undefined" || this.initialized) {
            return;
        }

        this.initialized = true;
        this.graphics = await Graphics.create(this.canvas.current);
        this.graphics.startRender();
    }
    public componentWillUnmount() {
        if (!this.graphics || !this.initialized) {
            return;
        }

        this.graphics.stopRender();
        this.initialized = false;
    }

    public render() {
        return (
            <Root>
                <Box component="canvas" width="100%" height="100%" ref={this.canvas} />
                <Overlay />
            </Root>
        );
    }
}
