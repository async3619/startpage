import type { AppProps } from "next/app";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { Layout } from "@/components/Layout";
import { mainTheme } from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}
