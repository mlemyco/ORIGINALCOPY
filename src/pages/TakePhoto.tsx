import { useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
// import fatasf from "../assets/placeholders/fatasf.jpg";
// import anotherfattie from "../assets/placeholders/anotherfattie.jpg";
// import uglee from "../assets/placeholders/uglee.jpg";
// import barf from "../assets/placeholders/BARF.jpg";
import Modal from "../components/Modal";
import Counter from "../components/Counter/Counter";
import AutoFitLines from "../components/AutoFitLines/AutoFitLines";
import type Webcam from "react-webcam";
// import html2canvas from "html2canvas";
import { printPhoto } from "../services/printService";

const TakePhoto = ({
    countdownValue,
    headingText,
    headingImg,
    labelText,
    maxCopies,
}: {
    countdownValue: number;
    headingText: string;
    headingImg: string;
    labelText: string;
    maxCopies: number;
}) => {
    const [searchParams] = useSearchParams();
    const rows = searchParams.get("rows");
    const cols = searchParams.get("cols");
    // const placeholders = [fatasf, anotherfattie, uglee, barf];

    const webcamRef = useRef<Webcam>(null);
    const printImageRef = useRef<HTMLDivElement>(null);

    const [isCounting, setIsCounting] = useState(false);
    const [countdown, setCountdown] = useState(countdownValue);
    const [allPhotosTaken, setAllPhotosTaken] = useState(false);
    const [isSelectingPrints, setIsSelectingPrints] = useState(false);
    const [isTaking, setIsTaking] = useState(false);
    const [takingPhotoIdx, setTakingPhotoIdx] = useState<number | undefined>(
        undefined
    );
    const [finalImages, setFinalImages] = useState<string[]>([]);
    const [copiesToPrint, setCopiesToPrint] = useState(1);
    const [slideDown, setSlideDown] = useState(false);
    const [isPrinting, setIsPrinting] = useState(false);
    const [donePrinting, setDonePrinting] = useState(false);

    const [imageToPrint, setImageToPrint] = useState("");

    // function resetState() {
    //     setIsCounting(false);
    //     setCountdown(countdownValue);
    //     setAllPhotosTaken(false);
    //     setIsSelectingPrints(false);
    //     setIsTaking(false);
    //     setTakingPhotoIdx(undefined);
    //     setFinalImages([]);
    //     setCopiesToPrint(1);
    //     setSlideDown(false);
    //     setIsPrinting(false);
    //     setDonePrinting(false);
    // }

    function selectPrints() {
        setIsSelectingPrints(true);
    }

    function printCopies() {
        setIsSelectingPrints(false);
        setSlideDown(true);
        setIsPrinting(true);

        getImageToPrint().then((imgDataUrl) => {
            if (!imgDataUrl) return;

            console.log("imgDataUrl:", imgDataUrl);
            printPhoto(imgDataUrl, copiesToPrint);
        });

        setTimeout(() => {
            setIsPrinting(false);
            setDonePrinting(true);
        }, 3000);
    }

    function retakePhotos() {
        setFinalImages([]);
        setAllPhotosTaken(false);
        setCountdown(countdownValue);
    }

    async function takeAllPhotos() {
        const total = Number(rows) * Number(cols);
        for (let picIndex = 0; picIndex < total; picIndex++) {
            setTakingPhotoIdx(picIndex);

            await new Promise((resolve) => setTimeout(resolve, 1000)); // wait to transition to image
            setIsTaking(true);

            await startCountdown(); // countdown to take photo

            // take photo
            const screenshot = webcamRef.current?.getScreenshot();
            if (!screenshot) {
                return;
            }
            setImageToPrint(screenshot);

            setFinalImages((prevFinalImages) => {
                const newFinalImages = [
                    ...prevFinalImages,
                    screenshot,
                    //placeholders[picIndex],
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

    async function getImageToPrint() {
        // if (!printImageRef.current) return;

        // const canvas = await html2canvas(printImageRef.current);
        // const imgDataUrl = canvas.toDataURL("image/png");
        const imgDataUrl = imageToPrint;

        return imgDataUrl;
    }

    return (
        <div className="take-photo flex flex-col justify-center items-center gap-5">
            <h3 className={`${slideDown ? "fade-out" : ""}`}>
                {allPhotosTaken ? "all done!" : "get ready!"}
            </h3>

            <div className="layout-placeholder">
                {donePrinting && (
                    <div className="w-full fade-in">
                        <AutoFitLines
                            lines={[
                                "TAKE YOUR",
                                "ORIGINALCOPY",
                                "RECEIPT BELOW",
                            ]}
                        />
                    </div>
                )}
            </div>

            {!donePrinting && (
                <div
                    className={`selected-layout ${
                        slideDown ? "overflow-hidden" : ""
                    }`}
                >
                    <Layout
                        dimensions={[Number(rows), Number(cols)]}
                        images={finalImages}
                        headingText={headingText}
                        headingImg={headingImg}
                        labelText={labelText}
                        indexOfPic={takingPhotoIdx}
                        webcamRef={webcamRef}
                        printImageRef={printImageRef}
                    />
                </div>
            )}

            {allPhotosTaken && !(isPrinting && donePrinting) ? (
                <>
                    <div
                        className={`flex gap-4 ${slideDown ? "fade-out" : ""}`}
                    >
                        <Button handleClickFn={selectPrints}>PRINT</Button>
                        <Button handleClickFn={retakePhotos}>RETAKE</Button>
                        {/* <Button navigateOptions={{ to: "/" }}>FINISH</Button> */}
                    </div>
                    {donePrinting && (
                        <div className="fade-in">
                            <Button navigateOptions={{ to: "/" }}>
                                FINISH
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {isCounting && (
                        <div className="countdown">
                            <h1>{countdown}</h1>
                        </div>
                    )}
                    {!isTaking && (
                        <Button handleClickFn={takeAllPhotos}>
                            TAKE PHOTO
                        </Button>
                    )}
                </>
            )}

            {isSelectingPrints && (
                <Modal setOpen={setIsSelectingPrints} width={500} height={250}>
                    <Counter
                        min={1}
                        max={maxCopies}
                        count={copiesToPrint}
                        setCount={setCopiesToPrint}
                    />
                    <div className="flex gap-4">
                        <Button
                            handleClickFn={() => setIsSelectingPrints(false)}
                        >
                            CANCEL
                        </Button>
                        <Button handleClickFn={printCopies}>PRINT</Button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default TakePhoto;
