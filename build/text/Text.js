import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const styles = {
    label: {
        position: "absolute",
        top: "0.4rem",
        left: "0.75rem",
        backgroundColor: "white",
        padding: "0px",
        fontSize: "0.9rem",
        lineHeight: "0.9rem",
        //color:"lightgray",
        color: "#5f676e",
        border: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
    },
    wrapper: {
        display: "flex",
        position: "relative",
        padding: "0.45rem 0.75rem",
        marginBottom: "0.5em",
        border: "solid 1px lightgray",
        borderRadius: "0.25rem",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)"
    },
};
const Text = ({ children, label, style }) => {
    var _a;
    const getStyle = (key, localStyleKey) => {
        const resolvedKey = (localStyleKey !== null && localStyleKey !== void 0 ? localStyleKey : key);
        // Check if the key exists in the styles and style objects
        const baseStyle = styles[resolvedKey] || {};
        const customStyle = style && key in style ? style[key] : {};
        return Object.assign(Object.assign({}, baseStyle), customStyle);
    };
    return _jsxs("span", { style: Object.assign(Object.assign({}, getStyle("wrapper")), (label ? { paddingTop: (_a = style === null || style === void 0 ? void 0 : style.labelGap) !== null && _a !== void 0 ? _a : "1.4rem" } : {})), children: [label
                ? _jsx("span", { style: getStyle("label"), children: label })
                : null, children] });
};
export default Text;
