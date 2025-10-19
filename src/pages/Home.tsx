import React from "react";
import Button from "../components/Button/Button";

const Home = () => {
    return (
        <div className="home roll-in">
            <div className="fade-in">
                <div className="mb-20">
                    <h1 className="font-bold">ORIGINALCOPY</h1>
                    <h3>houston's receipt photobooth</h3>
                </div>

                <Button navigateOptions={{ to: "/select-layout" }}>
                    START HERE
                </Button>
            </div>
        </div>
    );
};

export default Home;
