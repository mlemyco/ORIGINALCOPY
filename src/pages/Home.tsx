import Button from "../components/Button";

const Home = ({ isFloating }: { isFloating: boolean }) => {
    return (
        <div className="home">
            <div
                className={
                    `background-elements roll-in` +
                    (isFloating ? "-floating" : "")
                }
            ></div>

            <div className="fade-in">
                <div className="heading mb-20">
                    <h1>ORIGINALCOPY</h1>
                    <div className="subtitle">
                        <h3>houston's</h3>
                        <h3>receipt photobooth</h3>
                    </div>
                </div>

                <Button navigateOptions={{ to: "/select-layout" }}>
                    START HERE
                </Button>
            </div>
        </div>
    );
};

export default Home;
