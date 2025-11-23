import React from "react";

const Modal = ({
    children,
    width,
    height,
}: // setOpen,
{
    children: React.ReactNode;
    width: number;
    height: number;
    setOpen: (isOpen: boolean) => void;
}) => {
    const cssVariables = {
        "--open-width": `${width}px`,
        "--open-height": `${height}px`,
    } as React.CSSProperties;

    return (
        <>
            <div className="w-full h-full fixed"></div>
            <div className="modal screen-open" style={cssVariables}>
                {children}

                <div className="cover"></div>
            </div>
        </>
    );
};

export default Modal;
