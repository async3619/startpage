import "@emotion/react";

import type { Theme as MuiTheme } from "@mui/material";

declare module "@emotion/react" {
    export interface Theme extends MuiTheme {}
}
