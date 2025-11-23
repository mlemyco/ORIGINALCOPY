import React, { useState, useEffect } from "react";
import SilverBackground from "../../assets/silver-background.png";
import LayoutLabel from "./LayoutLabel";
import WebcamComponent from "../Webcam/WebcamComponent";
import type Webcam from "react-webcam";

const Layout = ({
    dimensions,
    webcamRef,
    printImageRef,
    images,
    indexOfPic,
}: // headingText = "ORIGINALCOPY",
// headingImg = "",
// labelText = "YOU ARE ONE OF A KIND",
{
    dimensions: [number, number]; // [rows, columns]
    webcamRef?: React.RefObject<Webcam | null>;
    printImageRef?: React.RefObject<HTMLDivElement | null>;
    images?: string[];
    indexOfPic?: number;
    headingText?: string | React.ReactNode;
    headingImg?: string;
    labelText?: string | React.ReactNode;
}) => {
    const scaleFactor = 1.4;
    const imagesGrid: React.ReactNode[] = [];

    // generate image grid for layout
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
                    ) : webcamRef ? (
                        <WebcamComponent webcamRef={webcamRef} />
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

    // pan and zoom in on individual picture for taking
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
        let centerXIdx = (numCols - 1) / 2;
        const centerYIdx = (numRows - 1) / 2;

        const yDifferenceFromCenter =
            centerYIdx - Math.floor(indexOfPic / numCols);
        const newTranslateY =
            scaleFactor * (yDifferenceFromCenter * (250 + 12) + 15); // center vertically with 12px gap, 250px image height, 75px for heading height
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
    }, [indexOfPic, dimensions]);

    return (
        <div
            ref={printImageRef}
            className={`layout`}
            style={{
                translate:
                    translateX || translateY
                        ? `${translateX}px ${translateY}px`
                        : undefined,
                position: indexOfPic !== undefined ? "absolute" : "static",
                scale: indexOfPic !== undefined ? `${scaleFactor}` : undefined,
            }}
        >
            {/* <div className="mb-3">
                {typeof headingText === "string" && !headingImg ? (
                    <h4>{headingText}</h4>
                ) : headingImg ? (
                    <div className="relative h-9 w-full">
                        <img
                            src={headingImg}
                            alt=""
                            className="h-full mx-auto grayscale"
                        />
                    </div>
                ) : (
                    headingText
                )}
            </div> */}

            <div className={"images-grid mb-1 flex flex-col gap-3"}>
                {imagesGrid}
            </div>

            <LayoutLabel
            // labelText={labelText}
            // barcode={
            //     "https://static.vecteezy.com/system/resources/previews/048/230/807/non_2x/barcode-black-color-for-payment-vector.jpg"
            // }
            />
        </div>
    );
};

export default Layout;
