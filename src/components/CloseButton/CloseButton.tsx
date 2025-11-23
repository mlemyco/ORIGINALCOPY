const CloseButton = ({ closeFn }: { closeFn: () => void }) => {
    return (
        <button
            onClick={closeFn}
            className="rounded-full bg-gray-300 size-8 flex justify-center items-center absolute -right-2 -top-2 p-2"
        >
            <i className="fa-solid fa-xmark"></i>
        </button>
    );
};

export default CloseButton;
