import styled from "@emotion/styled";
import { alpha } from "@mui/system";

export const Root = styled.div<{ focused: boolean }>`
    width: 100%;

    margin: 0;
    padding: 0;
    border-radius: 4px;

    position: relative;

    background: ${({ theme }) => theme.palette.background.paper};
    box-shadow: ${({ theme, focused }) => (focused ? theme.shadows[8] : "none")};

    opacity: ${({ focused }) => (focused ? 1 : 0.75)};
    transition: ${({ theme }) => theme.transitions.create(["opacity", "border-color", "box-shadow"])};

    svg {
        width: ${({ theme }) => theme.spacing(4)};
        height: ${({ theme }) => theme.spacing(4)};

        display: block;

        position: absolute;
        top: 50%;
        left: ${({ theme }) => theme.spacing(2)};

        transform: translateY(-50%);
        opacity: 0.7;
    }

    &:hover {
        opacity: 1;
    }
`;

export const Input = styled.input`
    width: 100%;

    margin: 0;
    padding: ${({ theme }) => theme.spacing(2, 2, 2, 8)};
    border: 0;

    font-size: 1.5rem;
    line-height: 1;

    display: block;

    color: ${({ theme }) => alpha(theme.palette.text.primary, 0.7)};
    background: transparent;
    outline: none;
`;
