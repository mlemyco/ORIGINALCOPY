import Button from "../components/Button";
import WebcamComponent from "../components/Webcam/WebcamComponent";

const Home = ({
    isFloating,
    starsVisible,
}: {
    isFloating: boolean;
    starsVisible: boolean;
}) => {
    return (
        <div className="home">
            <div className="w-screen h-screen opacity-0 absolute inset-0 fade-in-webcam">
                <WebcamComponent />
            </div>

            {starsVisible && (
                <div
                    className={
                        `background-elements roll-in` +
                        (isFloating ? "-floating" : "")
                    }
                ></div>
            )}

            <div className="fade-in">
                <div className="heading mb-20">
                    <h1>ORIGINALCOPY</h1>
                    <div className="subtitle">
                        <h3>houston's</h3>
                        <h3>receipt photobooth</h3>
                    </div>
                </div>

                <Button
                    navigateOptions={{
                        to: "/take-photo",
                        search: new URLSearchParams([
                            ["rows", "1"],
                            ["cols", "1"],
                        ]).toString(),
                    }}
                >
                    START HERE
                </Button>
            </div>
        </div>
    );
};

export default Home;
