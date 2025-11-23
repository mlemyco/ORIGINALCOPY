import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const printPhoto = async (imgDataUrl: string) => {
    const currentDate = new Date();

    const blob = await (await fetch(imgDataUrl)).blob();
    const imgFile = new File([blob], currentDate.toLocaleString());

    const formData = new FormData();
    formData.append("image", imgFile);
    formData.append("time", currentDate.toISOString());

    axios
        .post(API_URL + "/print", formData)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error(error);
            throw new Error("Printing failed.");
        });
};
