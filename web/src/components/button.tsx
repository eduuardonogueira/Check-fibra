interface IButton {
    type?: "button" | "submit" | "reset" | undefined,
    text: string
    style?: React.CSSProperties | undefined
}

function Button({type, text, style}: IButton) {
    return (  
        <button
            type={type}
            className="bg-[#044FBF] text-[#fff] box-border px-6 py-4 rounded-sm"
            style={style}
        >
            {text}
        </button>
    );
}

export default Button;