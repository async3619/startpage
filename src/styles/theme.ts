import { createTheme } from "@mui/material";

export const mainTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            paper: "#262a33",
        },
    },
    typography: {
        fontFamily: '"SUIT Variable", sans-serif',
        fontWeightRegular: 500,
    },
    components: {
        MuiTooltip: {
            defaultProps: {
                placement: "bottom",
            },
            styleOverrides: {
                tooltip: {
                    fontSize: "0.9rem",
                    background: "#262a33",
                },
            },
        },
    },
});
