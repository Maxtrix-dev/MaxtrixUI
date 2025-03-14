import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
;
const Input = ({ label, disabled, style, icon, type, onChange, startValue, onEmptyUseStartValue }) => {
    //Tady je potřeba dodělat tu animaci
    var _a;
    const styles = {
        label: {
            position: "absolute",
            top: "0.4rem",
            left: "0.75rem",
            backgroundColor: "white",
            padding: "0px",
            fontSize: "0.9rem",
            lineHeight: "0.9rem",
            color: "#5f676e",
            border: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            msUserSelect: "none",
            transition: "top 0.25s ease-in-out, transform 0.25s ease-in-out",
            cursor: "text",
            whiteSpace: "nowrap"
        },
        labelCentered: {
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1rem",
            lineHeight: "1rem"
        },
        input: {
            position: "relative",
            borderRadius: "0.25rem",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            border: "none",
            flex: 1,
            padding: "0.45rem 0.75rem",
            paddingLeft: icon ? "1.7em" : "0.5em",
        },
        wrapper: {
            display: "flex",
            position: "relative",
            marginBottom: "0.5em",
            borderRadius: "0.25rem",
            border: "solid 1px lightgray",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
        },
        icon: {
            position: "absolute",
            top: (label === null || label === void 0 ? void 0 : label.placement) == "placeholder" ? "50%" : "53%",
            transform: "translateY(-50%)",
            left: "0.5em",
        }
    };
    const getStyle = (key, localStyleKey) => {
        const resolvedKey = (localStyleKey !== null && localStyleKey !== void 0 ? localStyleKey : key);
        // Check if the key exists in the styles and style objects
        const baseStyle = styles[resolvedKey] || {};
        const customStyle = style && key in style ? style[key] : {};
        return Object.assign(Object.assign({}, baseStyle), customStyle);
    };
    const inputRef = useRef(null);
    const [value, setValue] = useState(startValue ? startValue.toString() : "");
    const [labelUp, setLabelUp] = useState(false);
    useEffect(() => {
        if (type == "number") {
            const numericValue = value === '' ? NaN : Number(value);
            onChange(numericValue);
        }
        else {
            onChange(value);
        }
    }, [value]);
    useEffect(() => {
        if (startValue && (startValue === null || startValue === void 0 ? void 0 : startValue.toString().length) > 0) {
            setLabelUp(true);
        }
        else {
            setLabelUp(false);
        }
        setValue(startValue ? startValue.toString() : "");
    }, [startValue]);
    const HandleFocus = (e) => {
        if (onEmptyUseStartValue) {
            setValue("");
        }
        setLabelUp(true);
    };
    const HandleBlur = (e) => {
        let { value } = e.target;
        if (value.length <= 0) {
            if (onEmptyUseStartValue && startValue != undefined && startValue != null && (startValue === null || startValue === void 0 ? void 0 : startValue.toString().length) > 0) {
                setLabelUp(true);
                setValue(startValue ? startValue.toString() : "");
            }
            else {
                setLabelUp(false);
            }
        }
    };
    const labelClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    return _jsxs("div", { style: getStyle("wrapper"), children: [_jsx("input", { ref: inputRef, value: value, placeholder: label && (label === null || label === void 0 ? void 0 : label.placement) == "placeholder" ? label === null || label === void 0 ? void 0 : label.text : undefined, onBlur: HandleBlur, onFocus: HandleFocus, disabled: disabled, style: Object.assign(Object.assign({}, getStyle("input")), (label && (label === null || label === void 0 ? void 0 : label.placement) == "label" ? { paddingTop: (_a = style === null || style === void 0 ? void 0 : style.labelGap) !== null && _a !== void 0 ? _a : "1.4rem" } : {})), onChange: (e) => setValue(e.target.value), type: type }), label && (label === null || label === void 0 ? void 0 : label.placement) == "label"
                ? _jsx("span", { onClick: labelClick, style: Object.assign(Object.assign({}, getStyle("label")), (!labelUp ? getStyle("labelCentered") : {})), children: label.text })
                : null, icon != null
                ? _jsx(FontAwesomeIcon, { icon: icon, style: getStyle("icon") })
                : null] });
};
export default Input;
