import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import DisabledOverlay from "../overlays/DisabledOverlay";
const styles = {
    ball: {
        height: "0.8em",
        width: "0.8em",
        borderRadius: "2rem",
        backgroundColor: "blue",
        margin: "0px",
        transition: "transform 0.3s ease-in-out,background-color 0.3s ease-in-out"
    },
    toggleWrap: {
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        width: "2.3em",
        height: "1.2em",
        padding: "0.2em",
        marginRight: "5px",
        backgroundColor: "red",
        borderRadius: "1rem",
        boxSizing: "border-box",
        justifyContent: "start",
        transition: "background-color 0.3s ease-in-out"
    },
    toggleWrappOn: {
        backgroundColor: "#0d6efd",
    },
    toggleWrappOff: {
        border: "solid 1px lightgray",
        backgroundColor: "white"
    },
    ballOn: {
        backgroundColor: "white"
    },
    ballOff: {
        backgroundColor: "lightgray"
    },
    mainWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    text: {}
};
//here you can customize globally style for disable of toggle/ mind you it will get wiped if you update the library
const disableStyle = {};
const Toggle = ({ data, pattern, style, disabled, onToggle, checked, loadingText, animation }) => {
    var _a, _b, _c, _d, _e;
    const [toggled, setToggled] = useState(checked !== null && checked !== void 0 ? checked : false);
    const HandleToggle = () => {
        onToggle(!toggled);
        setToggled((prevToggle) => !prevToggle);
    };
    const getStyle = (key, localStyleKey) => {
        const resolvedKey = (localStyleKey !== null && localStyleKey !== void 0 ? localStyleKey : key);
        // Check if the key exists in the styles and style objects
        const baseStyle = styles[resolvedKey] || {};
        const customStyle = style && key in style ? style[key] : {};
        return Object.assign(Object.assign({}, baseStyle), customStyle);
    };
    const OnKeyDown = (event) => {
        if (event.key === "Enter") {
            HandleToggle();
        }
    };
    const replaceFields = (pattern) => {
        const regex = /<field:([\w]+)>/g;
        return pattern.replace(regex, (_, fieldName) => {
            return (data ? data[fieldName].toString() : null) || `<field:${fieldName}>`;
        });
    };
    return _jsx(DisabledOverlay, { style: Object.assign(Object.assign({}, disableStyle), (style ? ((_a = style.disableStyle) !== null && _a !== void 0 ? _a : {}) : {})), disabled: disabled, children: _jsxs("div", { style: getStyle("mainWrapper"), children: [_jsx("div", { tabIndex: disabled ? undefined : 0, onKeyDown: OnKeyDown, style: Object.assign(Object.assign(Object.assign({}, getStyle("toggleWrap")), (toggled ? getStyle("toggleWrappOn") : getStyle("toggleWrappOff"))), (animation ? { transition: `background-color ${animation.duration}s ${(_b = animation.type) !== null && _b !== void 0 ? _b : "ease-in-out"}` } : {})), onClick: disabled ? undefined : HandleToggle, children: _jsx("div", { style: Object.assign(Object.assign(Object.assign({}, getStyle("ball")), (toggled ? Object.assign({ transform: "translateX(calc(100% + 0.4em))" }, getStyle("ballOn")) : Object.assign({ transform: "translateX(0)" }, getStyle("ballOff")))), (animation ? { transition: `transform ${animation.duration}s ${(_c = animation.type) !== null && _c !== void 0 ? _c : "ease-in-out"},background-color ${animation.duration}s ${(_d = animation.type) !== null && _d !== void 0 ? _d : "ease-in-out"}` } : {})) }) }), _jsx("span", { style: getStyle("text"), dangerouslySetInnerHTML: { __html: (_e = replaceFields(pattern)) !== null && _e !== void 0 ? _e : (loadingText !== null && loadingText !== void 0 ? loadingText : "Načítání") } })] }) });
};
export default Toggle;
