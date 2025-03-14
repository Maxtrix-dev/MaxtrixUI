import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const styles = {
    mainWrapper: {
        position: "relative",
        display: "inline-block"
    },
    disableOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        zIndex: "10",
        pointerEvents: "none",
    }
};
const DisabledOverlay = ({ children, disabled = false, style }) => {
    var _a, _b;
    return _jsxs("div", { style: Object.assign(Object.assign({}, styles.mainWrapper), (style ? ((_a = style.mainWrapper) !== null && _a !== void 0 ? _a : {}) : {})), children: [children, disabled &&
                _jsx("div", { style: Object.assign(Object.assign({}, styles.disableOverlay), (style ? ((_b = style.disableOverlay) !== null && _b !== void 0 ? _b : {}) : {})) })] });
};
export default DisabledOverlay;
