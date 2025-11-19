import type { settingsProps } from "../types";

const defaultSettings: settingsProps = {
    isFloating: true,
    logoText: "ORIGINALCOPY", // TODO: test with images, tall images
    labelText: "YOU ARE ONE OF A KIND",
    lightMode: false,
    layouts: [
        [1, 1],
        [2, 1],
    ],
    isMuted: false,
    maxCopies: 3,
    countdownValue: 5,
};

export { defaultSettings };
