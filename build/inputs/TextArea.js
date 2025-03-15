import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
const styles = {
    title: {
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
        zIndex: 2
    },
    wrapper: {
        display: "flex",
        position: "relative",
        marginBottom: "0.5em",
        border: "solid 1px lightgray",
        borderRadius: "0.25rem",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
    },
    textArea: {
        position: "relative",
        padding: "0.45rem 0.75rem",
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: "0.25rem",
        minHeight: "3.5rem",
        boxSizing: "border-box",
        minWidth: "100%",
    }
};
const TextArea = ({ onChange, onEmptyUseStartValue = false, startValue, label, style }) => {
    var _a;
    const changed = useRef(false);
    const [value, setValue] = useState(startValue ? startValue.toString() : "");
    const getStyle = (key, localStyleKey) => {
        var _a;
        const resolvedKey = (localStyleKey !== null && localStyleKey !== void 0 ? localStyleKey : key);
        // Check if the key exists in the styles and style objects
        const baseStyle = styles[resolvedKey] || {};
        const customStyle = ((_a = style === null || style === void 0 ? void 0 : style[key]) !== null && _a !== void 0 ? _a : {});
        return Object.assign(Object.assign({}, baseStyle), customStyle);
    };
    useEffect(() => {
        onChange(value);
    }, [value]);
    useEffect(() => {
        setValue(startValue ? startValue.toString() : "");
    }, [startValue]);
    const HandleFocus = (e) => {
        if (onEmptyUseStartValue) {
            setValue("");
        }
    };
    const HandleBlur = (e) => {
        let { value } = e.target;
        if (value.length <= 0) {
            if (onEmptyUseStartValue && startValue != null && startValue != undefined && (startValue === null || startValue === void 0 ? void 0 : startValue.toString().length) > 0) {
                setValue(startValue ? startValue.toString() : "");
            }
        }
    };
    return _jsxs("div", { style: getStyle("wrapper"), children: [label && (label === null || label === void 0 ? void 0 : label.placement) == "label"
                ? _jsx("span", { style: getStyle("title"), children: label.text })
                : null, _jsx("textarea", { style: Object.assign(Object.assign({}, getStyle("textArea")), (label && (label === null || label === void 0 ? void 0 : label.placement) == "label" ? { paddingTop: (_a = style === null || style === void 0 ? void 0 : style.labelGap) !== null && _a !== void 0 ? _a : "1.4rem" } : {})), value: value, placeholder: label && (label === null || label === void 0 ? void 0 : label.placement) == "placeholder" ? label.text : undefined, onFocus: HandleFocus, onBlur: HandleBlur, onChange: (e) => setValue(e.target.value) })] });
};
export default TextArea;
