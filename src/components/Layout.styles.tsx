import { css } from "@emotion/react";

export const GlobalStyles = css`
    @font-face {
        font-family: "SUIT Variable";
        font-weight: 100 900;
        src: url("/assets/suit.woff2") format("woff2-variations");
    }

    html,
    body,
    #__next {
        height: 100%;

        margin: 0;
        padding: 0;

        background: #27282e;
    }

    * {
        font-family: "SUIT Variable", sans-serif;
    }
`;
