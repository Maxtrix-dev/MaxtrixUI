var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import axios from "axios";
import DisabledOverlay from "../overlays/DisabledOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const styles = {
    optionWrapper: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "100%",
        width: "100%",
        zIndex: 11,
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
        borderLeft: "solid 1px darkgray",
        borderBottom: "solid 1px darkgray",
        borderRight: "solid 1px darkgray",
        paddingBottom: "1em",
        maxHeight: "20em",
        overflowY: "scroll",
        backgroundColor: "white"
    },
    mainWrapper: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "100%",
        marginBottom: "0.5em"
    },
    option: {
        paddingLeft: "1em",
        paddingRight: "1em",
        paddingTop: "0.15em",
        paddingBottom: "0.15em",
        backgroundColor: "white"
    },
    onHoverOption: {
        backgroundColor: "lightgray"
    },
    removeIcon: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: "1rem"
    }
};
const inputStyle = {
    wrapper: {
        marginBottom: 0
    }
};
const AutoComplete = ({ label, search, pattern, onSelect, startValue, loadingText, noItemsText, style, disabled, selectedPattern, removeIcon }) => {
    var _a;
    const [options, setOptions] = useState(null);
    const CancelToken = axios.CancelToken;
    const cancelTokenSource = useRef(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const elementRef = useRef(null);
    const onHover = (e) => {
        Object.assign(e.currentTarget.style, Object.assign(Object.assign(Object.assign({}, styles.option), getStyle("option")), getStyle("onHoverOption")));
    };
    const onLeave = (e) => {
        Object.assign(e.currentTarget.style, Object.assign(Object.assign({}, styles.option), getStyle("option")));
    };
    const handleOutsideClick = (event) => {
        if (elementRef.current && !elementRef.current.contains(event.target)) {
            const target = event.target;
            setShowOptions(false);
        }
    };
    useEffect(() => {
        // Add event listener to detect clicks anywhere on the document
        document.addEventListener("click", handleOutsideClick);
        // Cleanup the event listener on unmount
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    const HandleSelect = (data) => {
        if (data) {
            setSelectedValue(replaceFields(data, selectedPattern !== null && selectedPattern !== void 0 ? selectedPattern : pattern));
            setShowOptions(false);
            onSelect(data);
        }
    };
    const getStyle = (key, localStyleKey) => {
        const resolvedKey = (localStyleKey !== null && localStyleKey !== void 0 ? localStyleKey : key);
        // Check if the key exists in the styles and style objects
        const baseStyle = styles[resolvedKey] || {};
        const customStyle = style && key in style ? style[key] : {};
        return Object.assign(Object.assign({}, baseStyle), customStyle);
    };
    const replaceFields = (option, pattern) => {
        const regex = /<field:([\w]+)>/g;
        return pattern.replace(regex, (_, fieldName) => {
            return option[fieldName] || '';
        });
    };
    const onClick = () => {
        if (!showOptions && options && options.length > 0) {
            setShowOptions(true);
        }
    };
    const cancelSelect = () => {
        setSelectedValue(null);
        onSelect(null);
    };
    const SearchStuff = (value) => {
        if (value.length > 0) {
            if (value != (selectedValue !== null && selectedValue !== void 0 ? selectedValue : (startValue ? replaceFields(startValue, selectedPattern !== null && selectedPattern !== void 0 ? selectedPattern : pattern) : null))) {
                setShowOptions(true);
                if (cancelTokenSource.current) {
                    cancelTokenSource.current.cancel();
                }
                cancelTokenSource.current = CancelToken.source();
                setOptions(null);
                setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                    if (cancelTokenSource.current) {
                        setOptions(yield search(value, cancelTokenSource.current));
                    }
                }), 700);
            }
        }
    };
    return _jsx(DisabledOverlay, { disabled: disabled, style: Object.assign({}, Object.assign({ mainWrapper: { width: "100%" } }, getStyle("disableStyle"))), children: _jsxs("div", { ref: elementRef, onClick: onClick, style: getStyle("mainWrapper"), children: [_jsx(Input, { label: label, onEmptyUseStartValue: true, style: Object.assign(Object.assign({}, inputStyle), getStyle("inputStyle")), startValue: selectedValue !== null && selectedValue !== void 0 ? selectedValue : (startValue ? replaceFields(startValue, selectedPattern !== null && selectedPattern !== void 0 ? selectedPattern : pattern) : null), onChange: SearchStuff }), selectedValue
                    ? _jsx(FontAwesomeIcon, { style: getStyle("removeIcon"), icon: removeIcon !== null && removeIcon !== void 0 ? removeIcon : faClose, onClick: cancelSelect })
                    : null, showOptions
                    ? _jsx("div", { style: getStyle("optionWrapper"), children: options
                            ? _jsx(_Fragment, { children: options.map((option, index) => _jsx("span", { onMouseEnter: onHover, onMouseLeave: onLeave, onClick: () => HandleSelect(option), style: getStyle("option"), children: replaceFields(option, pattern) }, index)) })
                            : _jsx(_Fragment, { children: !((_a = cancelTokenSource.current) === null || _a === void 0 ? void 0 : _a.token.reason)
                                    ? _jsx("span", { style: getStyle("loadingText"), children: loadingText !== null && loadingText !== void 0 ? loadingText : "Načítání..." })
                                    : _jsx("span", { style: getStyle("noItemText"), children: noItemsText !== null && noItemsText !== void 0 ? noItemsText : "Položky neexistují" }) }) })
                    : null] }) });
};
export default AutoComplete;
