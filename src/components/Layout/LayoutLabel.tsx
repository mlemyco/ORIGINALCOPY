const LayoutLabel = () =>
    //     {
    //     labelText,
    //     barcode,
    // }: {
    //     labelText: string | React.ReactNode;
    //     barcode: string;
    // }
    {
        // const today = new Date();

        return (
            <div className="label flex flex-col items-center gap-2 pt-5">
                {/* <div className="w-full flex justify-between">
                <p>*****</p>
                <p>{today.toLocaleDateString()}</p>
            </div>

            {typeof labelText === "string" ? <p>{labelText}</p> : labelText}

            <img src={barcode} width={"250"} alt="" /> */}

                <div className="social">
                    {/* <p className="">tag us in your photos</p> */}
                    <p>@ORIGINALCOPYPHOTOBOOTH</p>
                </div>
            </div>
        );
    };

export default LayoutLabel;
