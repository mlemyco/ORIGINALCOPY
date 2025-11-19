import React from "react";
import "./Counter.scss";

const Counter = ({
    min,
    max,
    count,
    setCount,
}: {
    min: number;
    max: number;
    count: number;
    setCount: (count: number) => void;
}) => {
    return (
        <div className="counter">
            <button
                onClick={() => setCount(Math.max(min, count - 1))}
                disabled={count <= min}
            >
                -
            </button>

            <span>{count}</span>

            <button
                onClick={() => setCount(Math.min(max, count + 1))}
                disabled={count >= max}
            >
                +
            </button>
        </div>
    );
};

export default Counter;
