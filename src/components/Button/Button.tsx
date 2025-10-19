import React from "react";
import "./Button.scss";
import { useNavigate } from "react-router-dom";

const Button = ({
    navigateOptions,
    handleClickFn,
    children,
}: {
    navigateOptions?: {
        to: string;
        search?: string;
    };
    handleClickFn?: () => void;
    children: React.ReactNode;
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (navigateOptions) {
            navigate(
                navigateOptions.to +
                    (navigateOptions.search ? `?${navigateOptions.search}` : "")
            );
        } else if (handleClickFn) {
            handleClickFn();
        }
    };

    return (
        <button className="w-fit font-bold text-4xl" onClick={handleClick}>
            {children}
        </button>
    );
};

export default Button;
