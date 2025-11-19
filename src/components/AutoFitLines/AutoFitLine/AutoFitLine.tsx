import { useEffect, useRef } from "react";
import "./AutoFitLine.scss";

const AutoFitLine = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        document.fonts.ready.then(() => {
            const el = ref.current;
            if (!el) return;

            console.log("el", el);

            const parentWidth = el.parentElement?.offsetWidth;
            if (!parentWidth) return;

            console.log("parentWidth", parentWidth);

            const currentWidth = el.offsetWidth;
            const currentHeight = el.offsetHeight;

            console.log("currentWidth", currentWidth);
            console.log("currentHeight", currentHeight);

            const fontSize = (currentHeight * parentWidth) / currentWidth;
            console.log("fontSize", fontSize);
            el.style.fontSize = fontSize + "px";
        });

        // let fontSize = 500;
        // el.style.fontSize = fontSize + "px";

        // // Shrink until fits
        // while (el.scrollWidth > parentWidth && fontSize > 1) {
        //     fontSize -= 1;
        //     el.style.fontSize = fontSize + "px";
        // }
    }, []);

    return (
        <p
            ref={ref}
            className="auto-line"
            // style={{ fontSize: `${fontSize}px` }}
        >
            {children}
        </p>
    );
};

export default AutoFitLine;
