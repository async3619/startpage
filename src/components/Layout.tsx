import React from "react";
import { Global } from "@emotion/react";

import { GlobalStyles } from "./Layout.styles";
import { Box } from "@mui/material";

interface LayoutProps {
    children: React.ReactNode;
}
interface LayoutStates {}

export class Layout extends React.Component<LayoutProps, LayoutStates> {
    public render() {
        const { children } = this.props;

        return (
            <Box component="main" height="100%" p={2} display="flex" alignItems="center" justifyContent="center">
                <Global styles={GlobalStyles} />
                {children}
            </Box>
        );
    }
}
