import React from "react";
import { Global } from "@emotion/react";
import { Box } from "@mui/material";

import { Background } from "@/components/Background";

import { GlobalStyles } from "./Layout.styles";

interface LayoutProps {
    children: React.ReactNode;
}
interface LayoutStates {}

export class Layout extends React.Component<LayoutProps, LayoutStates> {
    public render() {
        const { children } = this.props;

        return (
            <Box height="100%" position="relative" display="flex" alignItems="center" justifyContent="center">
                <Global styles={GlobalStyles} />
                <Background />
                <Box component="main" p={2} zIndex={10}>
                    {children}
                </Box>
            </Box>
        );
    }
}
