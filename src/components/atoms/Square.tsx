import React, { KeyboardEvent } from "react";
import styled from "styled-components";

interface SquareProps {
    size: number;
    value: "X" | "O" | null;
    onClick: () => void;
}

const Square: React.FC<SquareProps> = React.memo(({ size, value, onClick }) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <SquareDiv
            size={size}
            onClick={onClick}
            value={value}
            role="button"
            tabIndex={0}
            aria-label={`Square ${value ? value : "empty"}`}
            onKeyDown={handleKeyDown}
            aria-pressed={value !== null}
            aria-disabled={value !== null}
            data-disabled={value !== null}
        >
            {value}
        </SquareDiv>
    );
});

/**
 * Styled Div for the Square
 */
const SquareDiv = styled.div<{
    size: number;
    value: "X" | "O" | null;
}>`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    background-color: #fff;
    border-radius: 8px;
    border: 2px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${(props) => Math.floor(props.size / 2.5)}px;
    cursor: ${(props) => (props.value === null ? "pointer" : "not-allowed")};
    color: ${(props) => {
        if (props.value === "X") return "red";
        if (props.value === "O") return "blue";
        return "#000";
    }};
    transition: background-color 0.2s, transform 0.1s, border-color 0.2s;

    /* Accessibility Focus Styles */
    &:focus {
        outline: none;
        border-color: #666;
        box-shadow: 0 0 0 3px rgba(100, 100, 100, 0.5);
    }

    /* Hover Effect */
    &:hover {
        background-color: ${(props) => (props.value === null ? "#f0f0f0" : "#fff")};
    }

    /* Active State */
    &:active {
        transform: ${(props) => (props.value === null ? "scale(0.95)" : "none")};
    }

    /* Disabled State */
    &[aria-disabled="true"] {
        cursor: not-allowed;
        opacity: 0.6;
        background-color: #fff;
    }
`;

export default Square;
