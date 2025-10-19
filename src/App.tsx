import { Routes, Route } from "react-router-dom";
import "./App.scss";
import SelectLayout from "./pages/SelectLayout";
import Home from "./pages/Home";
import TakePhoto from "./pages/TakePhoto";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/select-layout" element={<SelectLayout />} />
                <Route path="/take-photo" element={<TakePhoto />} />
            </Routes>
        </>
    );
}

export default App;
