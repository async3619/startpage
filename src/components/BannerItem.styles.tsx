import styled from "@emotion/styled";

export const Root = styled.a`
    width: 100%;

    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 4px;

    font-size: 1rem;
    text-decoration: none;

    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;

    color: ${({ theme }) => theme.palette.text.primary};
    background: ${({ theme }) => theme.palette.background.paper};

    opacity: 0.75;
    transition: ${({ theme }) => theme.transitions.create(["opacity", "background-color", "box-shadow"])};

    cursor: pointer;

    > svg {
        width: ${({ theme }) => theme.spacing(6)};
        height: ${({ theme }) => theme.spacing(6)};

        display: block;

        opacity: 0.7;
    }

    &:hover {
        opacity: 1;
        box-shadow: ${({ theme }) => theme.shadows[8]};
    }
`;
