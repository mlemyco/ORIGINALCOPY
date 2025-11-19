import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import SelectLayout from "./pages/SelectLayout";
import Home from "./pages/Home";
import TakePhoto from "./pages/TakePhoto";
import Settings from "./components/Settings/Settings";
import { defaultSettings } from "./config/defaults";

function App() {
    const [settings, setSettings] = useState(defaultSettings);

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Home isFloating={settings.isFloating} />}
                />
                <Route
                    path="/select-layout"
                    element={
                        <SelectLayout
                            displayDimensions={settings.layouts}
                            headingText={settings.logoText}
                            labelText={settings.labelText}
                        />
                    }
                />
                <Route
                    path="/take-photo"
                    element={
                        <TakePhoto
                            countdownValue={settings.countdownValue}
                            headingText={settings.logoText}
                            labelText={settings.labelText}
                            maxCopies={settings.maxCopies}
                        />
                    }
                />
            </Routes>

            <Settings
                defaultSettings={defaultSettings}
                settings={settings}
                setSettings={setSettings}
            />
        </>
    );
}

export default App;
