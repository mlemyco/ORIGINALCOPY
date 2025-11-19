import AutoFitLine from "./AutoFitLine/AutoFitLine";

const AutoFitLines = ({ lines }: { lines: string[] }) => {
    return (
        <div className="flex flex-col justify-center items-center text-center w-full">
            {lines.map((line, index) => (
                <AutoFitLine key={index}>{line}</AutoFitLine>
            ))}
        </div>
    );
};

export default AutoFitLines;
