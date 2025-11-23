import React from "react";
import Webcam from "react-webcam";

const WebcamComponent = ({
    webcamRef,
}: {
    webcamRef?: React.RefObject<Webcam | null>;
}) => {
    return (
        <Webcam
            ref={webcamRef}
            className="size-full object-cover grayscale"
            mirrored={true}
        />
    );
};

export default WebcamComponent;
