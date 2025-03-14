import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DisabledOverlay from "../overlays/DisabledOverlay";
const styles = {
    button: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "0.25rem",
        padding: "0.3em 1em",
        border: "none",
        backgroundColor: "#0d6efd",
        color: "white",
        marginBottom: "0.5em"
    },
    icon: {},
    onHover: {
        backgroundColor: "#0056b3"
    }
};
const Button = ({ text, icon, style, disabled, onClick }) => {
    const [hovered, setHovered] = useState(false);
    const getStyle = (key, localStyleKey) => {
        const resolvedKey = (localStyleKey !== null && localStyleKey !== void 0 ? localStyleKey : key);
        // Check if the key exists in the styles and style objects
        const baseStyle = styles[resolvedKey] || {};
        const customStyle = style && key in style ? style[key] : {};
        return Object.assign(Object.assign({}, baseStyle), customStyle);
    };
    const onHover = (e) => {
        setHovered(true);
    };
    const onLeave = (e) => {
        setHovered(false);
    };
    return _jsx(DisabledOverlay, { disabled: disabled, children: _jsxs("button", { style: Object.assign(Object.assign({}, getStyle("button")), (hovered ? getStyle("onHover") : {})), onMouseEnter: disabled ? undefined : onHover, onMouseLeave: disabled ? undefined : onLeave, onClick: disabled ? undefined : onClick, children: [icon
                    ? _jsx(FontAwesomeIcon, { icon: icon, style: getStyle("icon") })
                    : null, text
                    ? _jsx("span", { style: Object.assign(Object.assign({}, getStyle("text")), (icon ? { marginLeft: "0.5em" } : {})), children: text })
                    : null] }) });
};
export default Button;
