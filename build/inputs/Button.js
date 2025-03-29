import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
const paddingHorizontal = "1em";
const paddingVertical = "0.3em";
const styles = {
    button: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "0.25rem",
        padding: "0.35rem 0.5rem",
        border: "none",
        backgroundColor: "#0d6efd",
        color: "white",
        fontSize: "0.88rem",
        whiteSpace: "nowrap"
    },
    icon: {},
    onHover: {
        backgroundColor: "#0056b3"
    }
};
const Button = (props) => {
    const { text, icon, style, disabled, onClick } = props;
    const reverse = ("reverse" in props ? props.reverse : false);
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
    return _jsx("div", { style: Object.assign(Object.assign({}, getStyle("button")), (hovered ? getStyle("onHover") : {})), onMouseEnter: disabled ? undefined : onHover, onMouseLeave: disabled ? undefined : onLeave, onClick: disabled ? undefined : onClick, children: reverse
            ? _jsxs(_Fragment, { children: [text
                        ? _jsx("span", { style: Object.assign({}, getStyle("text")), children: text })
                        : null, icon
                        ? _jsx(FontAwesomeIcon, { icon: icon, style: Object.assign(Object.assign({}, getStyle("icon")), (icon ? { marginLeft: "0.5em" } : {})) })
                        : null] })
            : _jsxs(_Fragment, { children: [icon
                        ? _jsx(FontAwesomeIcon, { icon: icon, style: getStyle("icon") })
                        : null, text
                        ? _jsx("span", { style: Object.assign(Object.assign({}, getStyle("text")), (icon ? { marginLeft: "0.5em" } : {})), children: text })
                        : null] }) });
};
export default Button;
