import styled from "@emotion/styled";

export const Root = styled.div`
    width: 100%;
    height: 100%;

    position: fixed;
    top: 0;
    left: 0;

    pointer-events: none;
`;

export const Overlay = styled.div`
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;

    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: grayscale(50%);
`;
