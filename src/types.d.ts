interface settingsProps {
    isFloating: boolean;
    logoText: string | File;
    labelText: string;
    lightMode: boolean;
    layouts: [number, number][];
    isMuted: boolean;
    maxCopies: number;
    countdownValue: number;
}

export type { settingsProps };
