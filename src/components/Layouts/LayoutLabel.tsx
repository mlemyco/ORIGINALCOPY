import React from "react";

const LayoutLabel = ({
    labelText,
    barcode,
}: {
    labelText: string;
    barcode: string;
}) => {
    const today = new Date();

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="w-full flex justify-between">
                <p>*****</p>
                <p>{today.toLocaleDateString()}</p>
            </div>

            <p>{labelText}</p>

            <img src={barcode} width={250} alt="" />

            <p>@ORIGINALCOPYPHOTOBOOTH</p>
        </div>
    );
};

export default LayoutLabel;
