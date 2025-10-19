import React, { forwardRef } from "react";
import { SnapList, SnapItem } from "react-snaplist-carousel";

const Slideshow = forwardRef<
    HTMLDivElement,
    {
        setSelected?: (dimensions: [number, number]) => void;
        children: React.ReactNode[];
    }
>(({ children }, ref) => {
    return (
        <div className="slideshow">
            <SnapList ref={ref} direction="horizontal" hideScrollbar={true}>
                {children &&
                    children.map((child, index) => (
                        <SnapItem
                            key={index}
                            margin={{
                                left: index === 0 ? "1000px" : "",
                                right:
                                    index === children.length - 1
                                        ? "1000px"
                                        : "",
                            }}
                            snapAlign="center"
                        >
                            {child}
                        </SnapItem>
                    ))}
            </SnapList>
        </div>
    );
});

export default Slideshow;
