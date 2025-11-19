function isImageFile(text: string): boolean {
    const imageExtensions = [
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".bmp",
        ".webp",
        ".svg",
    ];
    const lowerText = text.toLowerCase();
    return imageExtensions.some((ext) => lowerText.endsWith(ext));
}
