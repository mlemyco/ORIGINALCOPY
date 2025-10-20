import React, { useState, useEffect } from "react";
import SilverBackground from "../../assets/silver-background.png";
import LayoutLabel from "./LayoutLabel";

const Layout = ({
    dimensions,
    images,
    indexOfPic,
    headingText = "ORIGINALCOPY",
}: {
    dimensions: [number, number]; // [rows, columns]
    images?: string[];
    indexOfPic?: number;
    headingText: string;
}) => {
    const scaleFactor = 2.5;
    const imagesGrid: React.ReactNode[] = [];

    for (let i = 0; i < dimensions[0]; i++) {
        const row: React.ReactNode[] = [];
        for (let j = 0; j < dimensions[1]; j++) {
            row.push(
                <div key={`${i}-${j}`} className={`polaroid-image`}>
                    {images && images[i * dimensions[1] + j] ? (
                        <img
                            className="taken"
                            src={images[i * dimensions[1] + j]}
                        />
                    ) : (
                        <img src={SilverBackground} />
                    )}
                </div>
            );
        }
        imagesGrid.push(
            <div key={i} className="image-row flex gap-3">
                {row}
            </div>
        );
    }

    const [translateY, setTranslateY] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    useEffect(() => {
        if (
            indexOfPic === undefined ||
            indexOfPic >= dimensions[0] * dimensions[1]
        ) {
            setTranslateX(0);
            setTranslateY(0);
            return;
        }

        const numCols = dimensions[1];
        const numRows = dimensions[0];

        const hasCenterX = numCols % 2 !== 0;
        var centerXIdx = (numCols - 1) / 2;
        var centerYIdx = (numRows - 1) / 2;

        const yDifferenceFromCenter =
            centerYIdx - Math.floor(indexOfPic / numCols);
        const newTranslateY =
            scaleFactor * (yDifferenceFromCenter * (250 + 12) + 56); // center vertically with 12px gap, 250px image height, 56px for heading height
        setTranslateY(newTranslateY);

        if (hasCenterX) {
            centerXIdx = Math.floor((numCols - 1) / 2);
            if (indexOfPic % numCols === centerXIdx) {
                setTranslateX(0);
                return;
            }
        }
        const xDifferenceFromCenter = centerXIdx - (indexOfPic % numCols);
        const newTranslateX =
            scaleFactor * (xDifferenceFromCenter * (250 + 12)); // center horizontally with 12px gap, 250px image width
        setTranslateX(newTranslateX);
    }, [indexOfPic]);

    return (
        <div
            className={`layout`}
            style={{
                translate: `${translateX}px ${translateY}px`,
                position: indexOfPic !== undefined ? "absolute" : "static",
                transform:
                    indexOfPic !== undefined
                        ? `scale(${scaleFactor})`
                        : "scale(1)",
            }}
        >
            <h4 className="mb-4">{headingText}</h4>

            <div className={"images-grid flex flex-col gap-3"}>
                {imagesGrid}
            </div>

            <LayoutLabel
                labelText={"YOU ARE ONE OF A KIND"}
                barcode={
                    "https://static.vecteezy.com/system/resources/thumbnails/005/449/913/small/barcode-on-white-background-illustration-vector.jpg"
                }
            />
        </div>
    );
};

export default Layout;
