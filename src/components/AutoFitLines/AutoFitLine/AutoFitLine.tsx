import { useEffect, useRef } from "react";
import "./AutoFitLine.scss";

const AutoFitLine = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        document.fonts.ready.then(() => {
            const el = ref.current;
            if (!el) return;

            const parentWidth = el.parentElement?.offsetWidth;
            if (!parentWidth) return;

            const currentWidth = el.offsetWidth;
            const currentHeight = el.offsetHeight;

            const fontSize = (currentHeight * parentWidth) / currentWidth;
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
