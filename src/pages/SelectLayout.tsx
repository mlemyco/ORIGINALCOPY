import React, { useEffect, useRef, useState } from "react";
import Slideshow from "../components/Slideshow";
import Layout from "../components/Layout/Layout";
import Button from "../components/Button";
import { useVisibleElements } from "react-snaplist-carousel";

const SelectLayout = ({
    displayDimensions,
    headingText,
    labelText,
}: {
    displayDimensions: [number, number][];
    headingText: string;
    labelText: string;
}) => {
    const [selectedDimensions, setSelectedDimensions] = useState<
        [number, number]
    >([1, 1]);

    const snapList = useRef<HTMLDivElement | null>(null);

    const visible = useVisibleElements(
        { ref: snapList as React.RefObject<HTMLDivElement> },
        (_, elementInCenter) => elementInCenter
    );

    useEffect(() => {
        if (visible) {
            setSelectedDimensions(displayDimensions[visible]);
        } else {
            setSelectedDimensions([1, 1]);
        }
    }, [visible]);

    return (
        <div className="w-full flex flex-col items-center gap-4 fade-in">
            <h3>choose photo layout</h3>

            <div className="dot-indicators">
                {displayDimensions.map((_, index) => (
                    <div
                        key={index}
                        className={`dot-indicator ${
                            index === visible ? "active" : ""
                        }`}
                    />
                ))}
            </div>

            <Slideshow ref={snapList} setSelected={setSelectedDimensions}>
                {displayDimensions.map((dimensions, index) => (
                    <div
                        className={`slide-up ${
                            index === visible ? "active" : ""
                        }`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                        key={index}
                    >
                        <Layout
                            key={index}
                            dimensions={dimensions}
                            headingText={headingText}
                            labelText={labelText}
                        />
                    </div>
                ))}
            </Slideshow>

            <Button
                navigateOptions={{
                    to: "/take-photo",
                    search: new URLSearchParams([
                        ["rows", `${selectedDimensions[0]}`],
                        ["cols", `${selectedDimensions[1]}`],
                    ]).toString(),
                }}
            >
                SELECT
            </Button>
        </div>
    );
};

export default SelectLayout;
