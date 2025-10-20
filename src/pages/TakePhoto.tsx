import { useState } from "react";
import Layout from "../components/Layouts/Layout";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button/Button";
import fatasf from "../assets/placeholders/fatasf.jpg";
import anotherfattie from "../assets/placeholders/anotherfattie.jpg";
import uglee from "../assets/placeholders/uglee.jpg";
import barf from "../assets/placeholders/BARF.jpg";

const TakePhoto = ({ countdownValue = 5 }: { countdownValue?: number }) => {
    const [searchParams] = useSearchParams();
    const rows = searchParams.get("rows");
    const cols = searchParams.get("cols");
    const placeholders = [fatasf, anotherfattie, uglee, barf];

    const [isCounting, setIsCounting] = useState(false);
    const [countdown, setCountdown] = useState(countdownValue);
    const [allPhotosTaken, setAllPhotosTaken] = useState(false);
    const [isPrinting, setIsPrinting] = useState(false);
    const [isTaking, setIsTaking] = useState(false);
    const [takingPhotoIdx, setTakingPhotoIdx] = useState<number | undefined>(
        undefined
    );
    const [finalImages, setFinalImages] = useState<string[]>([]);

    function printPhotos() {
        setIsPrinting(true);
        setTimeout(() => {
            setIsPrinting(false);
        }, 3000);
    }

    function retakePhotos() {
        setFinalImages([]);
        setAllPhotosTaken(false);
        setCountdown(countdownValue);
    }

    async function takeAllPhotos() {
        setIsTaking(true);

        const total = Number(rows) * Number(cols);
        for (let picIndex = 0; picIndex < total; picIndex++) {
            setTakingPhotoIdx(picIndex);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // wait to transition to image
            await startCountdown(); // countdown to take photo

            setFinalImages((prevFinalImages) => {
                const newFinalImages = [
                    ...prevFinalImages,
                    placeholders[picIndex],
                ];
                return newFinalImages;
            });

            await new Promise((resolve) => setTimeout(resolve, 1500)); // let audience see the taken photo
        }

        await new Promise((resolve) => setTimeout(resolve, 1000)); // wait to transition to final images

        setIsTaking(false);
        setAllPhotosTaken(true);
        setTakingPhotoIdx(undefined);
    }

    function startCountdown() {
        setIsCounting(true);
        setCountdown(countdownValue);

        return new Promise<void>((resolve) => {
            let counter = countdownValue;
            const interval = setInterval(() => {
                if (counter > 1) {
                    counter--;
                    setCountdown(counter);
                } else {
                    clearInterval(interval);
                    setIsCounting(false);
                    resolve();
                }
            }, 1000);
        });
    }

    return (
        <div className="take-photo flex flex-col justify-center items-center gap-4">
            <h3>
                {isPrinting
                    ? "printing..."
                    : allPhotosTaken
                    ? "all done!"
                    : "get ready!"}
            </h3>

            <div className="selected-layout">
                <Layout
                    dimensions={[Number(rows), Number(cols)]}
                    images={finalImages}
                    headingText="ORIGINALCOPY"
                    indexOfPic={takingPhotoIdx}
                />
            </div>

            {allPhotosTaken ? (
                <div className="flex gap-4">
                    <Button handleClickFn={printPhotos}>PRINT</Button>
                    <Button handleClickFn={retakePhotos}>RETAKE</Button>
                    <Button navigateOptions={{ to: "/" }}>RESTART</Button>
                </div>
            ) : (
                <>
                    {isCounting ? (
                        <div className="countdown">
                            <h1>{countdown}</h1>
                        </div>
                    ) : (
                        <></>
                    )}
                    {isTaking ? (
                        <></>
                    ) : (
                        <Button handleClickFn={takeAllPhotos}>
                            TAKE PHOTO
                        </Button>
                    )}
                </>
            )}
        </div>
    );
};

export default TakePhoto;
