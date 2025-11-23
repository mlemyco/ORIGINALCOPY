import { useState } from "react";
import "./Settings.scss";
import ToggleButton from "../ToggleButton";
import type { settingsProps } from "../../types";
import Layout from "../Layout/Layout";
import Button from "../Button";
import Modal from "../Modal";
import CloseButton from "../CloseButton/CloseButton";

const Settings = ({
    defaultSettings,
    settings,
    setSettings,
}: {
    defaultSettings: settingsProps;
    settings: settingsProps;
    setSettings: React.Dispatch<React.SetStateAction<settingsProps>>;
}) => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [addingLayout, setAddingLayout] = useState(false);
    const [newLayout, setNewLayout] = useState<[number, number] | null>(null);

    function toggleSettingsModal(isOpen: boolean) {
        setSettingsOpen(isOpen);

        if (!isOpen) {
            setIsAuthenticated(false);
        }
    }

    function handleUnfocusNewLayout() {
        setAddingLayout(false);
        addNewLayout(newLayout);
        setNewLayout(null);
    }

    function handleNewLayoutChange(event: React.ChangeEvent<HTMLInputElement>) {
        const numValue = parseInt(event.target.value);
        if (!isNaN(numValue) && numValue > 0) {
            setNewLayout([numValue, 1]);
        } else {
            event.target.value = "";
        }
    }

    function addNewLayout(layout: [number, number] | null) {
        if (!layout) return;

        // don't add duplicate layouts
        if (
            settings.layouts.some(
                (l) => l[0] === layout[0] && l[1] === layout[1]
            )
        ) {
            return;
        }

        setSettings((prevSettings) => ({
            ...prevSettings,
            layouts: [...prevSettings.layouts, layout],
        }));
    }

    function removeLayout(layoutToRemove: [number, number]) {
        setSettings((prevSettings) => ({
            ...prevSettings,
            layouts: prevSettings.layouts.filter(
                (layout) => layout !== layoutToRemove
            ),
        }));
    }

    function toggleLightMode(isLightMode: boolean) {
        document.body.classList.toggle("light-mode", isLightMode);

        setSettings((prevSettings) => ({
            ...prevSettings,
            lightMode: isLightMode,
        }));
    }

    function handleLogoTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newText = event.target.value;
        setSettings((prevSettings) => ({
            ...prevSettings,
            logoText: newText,
        }));

        if (newText.trim() === "") {
            setSettings((prevSettings) => ({
                ...prevSettings,
                logoText: defaultSettings.logoText,
            }));
        }
    }

    function handleLogoImgChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

        const newImg = event.target.files[0];
        const previewUrl = URL.createObjectURL(newImg);
        // setLogoImgUrl(previewUrl);

        setSettings((prevSettings) => ({
            ...prevSettings,
            logoImg: previewUrl,
        }));
    }

    function removeLogoImg() {
        // setLogoImgUrl("");
        setSettings((prevSettings) => ({
            ...prevSettings,
            logoImg: "",
        }));
    }

    function handleLabelTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newText = event.target.value;
        setSettings((prevSettings) => ({
            ...prevSettings,
            labelText: newText,
        }));

        if (newText.trim() === "") {
            setSettings((prevSettings) => ({
                ...prevSettings,
                labelText: defaultSettings.labelText,
            }));
        }
    }

    function handleMaxCopiesChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newMaxCopies = parseInt(event.target.value);
        if (!isNaN(newMaxCopies) && newMaxCopies > 0) {
            setSettings((prevSettings) => ({
                ...prevSettings,
                maxCopies: newMaxCopies,
            }));
        } else {
            event.target.value = "";

            setSettings((prevSettings) => ({
                ...prevSettings,
                maxCopies: defaultSettings.maxCopies,
            }));
        }
    }

    function handleCountdownValueChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const newCountdownValue = parseInt(event.target.value);
        if (!isNaN(newCountdownValue) && newCountdownValue > 0) {
            setSettings((prevSettings) => ({
                ...prevSettings,
                countdownValue: newCountdownValue,
            }));
        } else {
            event.target.value = "";

            setSettings((prevSettings) => ({
                ...prevSettings,
                countdownValue: defaultSettings.countdownValue,
            }));
        }
    }

    function toggleIsMuted(isMuted: boolean) {
        setSettings((prevSettings) => ({
            ...prevSettings,
            isMuted: isMuted,
        }));
    }

    function toggleFloatingStars(isFloating: boolean) {
        setSettings((prevSettings) => ({
            ...prevSettings,
            isFloating: isFloating,
        }));
    }

    function toggleStarsVisible(starsVisible: boolean) {
        setSettings((prevSettings) => ({
            ...prevSettings,
            starsVisible: starsVisible,
        }));
    }

    function resetSettings() {
        document.body.classList.toggle("light-mode", defaultSettings.lightMode);
        setSettings(defaultSettings);

        // reset all inputs
        document.querySelectorAll(".modal input").forEach((input) => {
            (input as HTMLInputElement).value = "";
        });
    }

    function checkPassword(inputPassword: string) {
        const correctPassword = import.meta.env.VITE_SETTINGS_PASSWORD;
        if (inputPassword === correctPassword) {
            setIsAuthenticated(true);
        }
    }

    return (
        <>
            {settingsOpen && (
                <Modal setOpen={toggleSettingsModal} width={650} height={750}>
                    {isAuthenticated ? (
                        <>
                            <h2>SETTINGS</h2>

                            <div className="settings-options grid grid-cols-2 w-full flex-1 gap-x-5">
                                {/* TODO: add and delete layouts */}
                                <div className="toggle-btns flex flex-col gap-3">
                                    <div className="layout-options">
                                        <h3 className="icon">
                                            <i className="fa-solid fa-image-portrait"></i>
                                        </h3>

                                        <div className="layout-tabs">
                                            {settings.layouts
                                                .sort(
                                                    // sort layouts by rows then columns
                                                    (
                                                        a: [number, number],
                                                        b: [number, number]
                                                    ) => {
                                                        return (
                                                            a[0] - b[0] ||
                                                            a[1] - b[1]
                                                        );
                                                    }
                                                )
                                                .map((layout) => {
                                                    return (
                                                        <p
                                                            key={`${layout[0]}x${layout[1]}`}
                                                            className="layout-option"
                                                            onClick={() => {
                                                                removeLayout(
                                                                    layout
                                                                );
                                                            }}
                                                        >
                                                            {`${layout[0]} x ${layout[1]}`}
                                                        </p>
                                                    );
                                                })}

                                            {addingLayout ? (
                                                <input
                                                    type="text"
                                                    className="new-layout"
                                                    maxLength={1}
                                                    pattern="[0-9]"
                                                    autoFocus
                                                    onBlur={
                                                        handleUnfocusNewLayout
                                                    }
                                                    onChange={
                                                        handleNewLayoutChange
                                                    }
                                                />
                                            ) : (
                                                <div
                                                    className="layout-option add-layout"
                                                    onClick={() =>
                                                        setAddingLayout(true)
                                                    }
                                                >
                                                    <i className="fa-solid fa-plus"></i>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-5">
                                        <div className="toggle-option">
                                            <h3 className="icon">
                                                <i className="fa-solid fa-sun"></i>
                                            </h3>
                                            <ToggleButton
                                                isToggled={settings.lightMode}
                                                toggleFunction={() =>
                                                    toggleLightMode(
                                                        !settings.lightMode
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="toggle-option">
                                            <h3 className="icon">
                                                <i
                                                    className={`fa-solid fa-volume-${
                                                        settings.isMuted
                                                            ? "xmark"
                                                            : "high"
                                                    }`}
                                                ></i>
                                            </h3>
                                            <ToggleButton
                                                isToggled={!settings.isMuted}
                                                toggleFunction={() =>
                                                    toggleIsMuted(
                                                        !settings.isMuted
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="toggle-option">
                                            <h3 className="icon">
                                                <i className="fa-solid fa-star"></i>
                                            </h3>
                                            <ToggleButton
                                                isToggled={
                                                    settings.starsVisible
                                                }
                                                toggleFunction={() =>
                                                    toggleStarsVisible(
                                                        !settings.starsVisible
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="toggle-option">
                                            <h3 className="icon">
                                                <i className="fa-solid fa-arrows-up-down"></i>
                                            </h3>
                                            <ToggleButton
                                                isToggled={settings.isFloating}
                                                toggleFunction={() =>
                                                    toggleFloatingStars(
                                                        !settings.isFloating
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="settings-option">
                                        <h3 className="icon">
                                            <i className="fa-solid fa-copy"></i>
                                        </h3>
                                        <input
                                            type="text"
                                            pattern="[0-9]*"
                                            placeholder={settings.maxCopies.toString()}
                                            onChange={handleMaxCopiesChange}
                                        />
                                    </div>

                                    <div className="settings-option">
                                        <h3 className="icon">
                                            <i className="fa-solid fa-clock"></i>
                                        </h3>
                                        <input
                                            type="text"
                                            placeholder={settings.countdownValue.toString()}
                                            onChange={
                                                handleCountdownValueChange
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <Layout
                                        dimensions={[1, 1]}
                                        headingText={
                                            <div className="flex gap-2">
                                                {settings.logoImg ? (
                                                    <div className="relative h-9 w-full">
                                                        <img
                                                            src={
                                                                settings.logoImg
                                                            }
                                                            alt=""
                                                            className="h-full mx-auto grayscale"
                                                        />
                                                        <CloseButton
                                                            closeFn={
                                                                removeLogoImg
                                                            }
                                                        />
                                                    </div>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        id="header-text"
                                                        placeholder={
                                                            settings.logoText
                                                        }
                                                        className=""
                                                        onChange={
                                                            handleLogoTextChange
                                                        }
                                                    />
                                                )}

                                                {!settings.logoImg && (
                                                    <>
                                                        <label htmlFor="header-file">
                                                            <div className="add-file flex-none">
                                                                <i className="fa-solid fa-file-circle-plus"></i>
                                                            </div>
                                                        </label>
                                                        <input
                                                            id="header-file"
                                                            className="absolute hidden"
                                                            type="file"
                                                            onChange={
                                                                handleLogoImgChange
                                                            }
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        }
                                        labelText={
                                            <input
                                                type="text"
                                                placeholder={settings.labelText}
                                                onChange={handleLabelTextChange}
                                            />
                                        }
                                    />
                                </div>
                            </div>
                            <Button handleClickFn={resetSettings}>RESET</Button>

                            <div className="cover immediate"></div>
                        </>
                    ) : (
                        <div className="enter-password">
                            <input
                                type="password"
                                placeholder="Enter password..."
                                onChange={(e) => {
                                    checkPassword(
                                        (e.target as HTMLInputElement).value
                                    );
                                }}
                            />
                        </div>
                    )}

                    <div className="close-button absolute top-0 right-0 my-5 mx-8 text-neutral-400">
                        <h3>
                            <i
                                onClick={() => toggleSettingsModal(false)}
                                className="fa-solid fa-xmark"
                            ></i>
                        </h3>
                    </div>
                </Modal>
            )}

            <div
                className={`absolute right-0 bottom-0 m-10 text-5xl ${
                    settingsOpen ? "spin-clockwise" : ""
                }`}
            >
                <i
                    onClick={() => toggleSettingsModal(!settingsOpen)}
                    className="fa-solid fa-gear"
                ></i>
            </div>
        </>
    );
};

export default Settings;
