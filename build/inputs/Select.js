import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import SelectChip from "../text/SelectChip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import DisabledOverlay from "../overlays/DisabledOverlay";
const styles = {
    label: {
        position: "absolute",
        left: "0.75rem",
        top: "0.4rem",
        backgroundColor: "white",
        fontSize: "0.9rem",
        lineHeight: "0.9rem",
        color: "#5f676e",
        border: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none"
    },
    wrapper: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        border: "solid 1px lightgray",
        width: "100%",
        borderRadius: "0.25rem",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
        boxSizing: "border-box",
        padding: "0.5rem 0.75rem",
        marginBottom: "0.5rem"
    },
    selectedWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        width: "100%",
        overflowX: "auto",
        flexWrap: "nowrap",
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none"
    },
    mainWrapper: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        cursor: "default",
        marginBottom: "0.5em",
    },
    arrow: {
        position: "absolute",
        transform: "translateY(-50%)",
        top: "50%",
        right: "10px",
    },
    optionsWrapper: {
        position: "absolute",
        zIndex: 3,
        top: "calc( 101% + 1px )",
        left: 0,
        backgroundColor: "white",
        width: "100%",
        borderLeft: "solid 1px lightgray",
        borderBottom: "solid 1px lightgray",
        borderRight: "solid 1px lightgray",
        paddingBottom: "1rem",
        borderBottomLeftRadius: "0.25rem",
        borderBottomRightRadius: "0.25rem",
        display: "flex",
        flexDirection: "column",
        maxHeight: "25em",
        overflowY: "auto",
        boxSizing: "border-box",
        boxShadow: "0px 5px 7px rgba(0, 0, 0, 0.1)"
    },
    option: {
        paddingRight: "1em",
        paddingLeft: "1em",
        paddingTop: "0.2em",
        paddingBottom: "0.2em",
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
        backgroundColor: "white"
    },
    onHoverOption: {
        backgroundColor: "lightgray"
    },
    placeholderText: {
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none"
    },
    noOptionsText: {
        marginLeft: "1rem"
    }
};
const searchBarStyle = {
    wrapper: {
        marginLeft: "1em",
        marginRight: "1em",
    }
};
const Select = (props) => {
    var _a;
    const { searchable, startIndex, label, placeholderText, multiselect, style, onSelect, options, disabled, pattern, selectedPattern } = props;
    let searchBarIcon;
    let searchBarLabel = { placement: "placeholder", text: "Vyhledat" };
    let onEmptyUseStartValues = false;
    if (searchable) {
        searchBarIcon = props.searchBarIcon;
        searchBarLabel = props.searchBarLabel;
        ;
    }
    if (multiselect) {
        onEmptyUseStartValues = props.onEmptyUseStartValues;
    }
    const elementRef = useRef(null);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(startIndex != undefined && startIndex != null ? Array.isArray(startIndex) ? startIndex : [startIndex] : []);
    const [searchFilter, setSearchFilter] = useState("");
    const wasChanged = useRef(false);
    //here make checker for index
    if (options != null && options != undefined && (options === null || options === void 0 ? void 0 : options.length) > 0 && startIndex != undefined && startIndex != null) {
        if (Array.isArray(startIndex)) {
            startIndex.forEach(index => {
                if (options.length <= index) {
                    throw "Indexes are not valid";
                }
            });
        }
        else {
            if (options.length <= startIndex) {
                throw "Index is not valid";
            }
        }
    }
    const onHover = (e) => {
        Object.assign(e.currentTarget.style, Object.assign(Object.assign(Object.assign({}, styles.option), getStyle("option")), getStyle("onHoverOption")));
    };
    const onLeave = (e) => {
        Object.assign(e.currentTarget.style, Object.assign(Object.assign({}, styles.option), getStyle("option")));
    };
    const makeSelect = (index) => {
        if (!wasChanged.current) {
            wasChanged.current = true;
        }
        if (multiselect) {
            setSelectedOptions((prevOptions) => [...prevOptions, index]);
        }
        else {
            setShowOptions(false);
            setSelectedOptions([index]);
        }
    };
    //dodělat handling když vybíram věci hned se to vypne což je bs
    const handleOutsideClick = (event) => {
        if (elementRef.current && !elementRef.current.contains(event.target)) {
            const target = event.target;
            const isOptionWrapper = target.closest("[data-option-wrapper]");
            const isOption = target.closest("[data-option]");
            const isChipIcon = target.closest("[data-chip-icon]");
            if (!isOptionWrapper && !isOption && !isChipIcon) {
                setShowOptions(false);
                if (multiselect) {
                    if (selectedOptions.length <= 0 && onEmptyUseStartValues) {
                        setSelectedOptions(startIndex != undefined && startIndex != null ? Array.isArray(startIndex) ? startIndex : [startIndex] : []);
                    }
                }
            }
        }
    };
    useEffect(() => {
        // Add event listener to detect clicks anywhere on the document
        document.addEventListener("click", handleOutsideClick);
        // Cleanup the event listener on unmount
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [selectedOptions]);
    useEffect(() => {
        if (wasChanged.current) {
            if (selectedOptions.length > 0) {
                if (multiselect) {
                    selectedOptions.map((index) => options[index]);
                    onSelect(selectedOptions.map((index) => options[index]));
                }
                else {
                    const option = options[selectedOptions[0]];
                    onSelect(option);
                }
            }
            else if (multiselect && onEmptyUseStartValues && !showOptions) {
                setSelectedOptions(startIndex != undefined && startIndex != null ? Array.isArray(startIndex) ? startIndex : [startIndex] : []);
            }
        }
    }, [selectedOptions]);
    const removeChip = (index) => {
        setSelectedOptions((prevItems) => prevItems.filter(item => item != index));
    };
    const replaceFields = (index, pattern) => {
        const regex = /<field:([\w]+)>/g;
        return pattern.replace(regex, (_, fieldName) => {
            if (options && (options === null || options === void 0 ? void 0 : options.length) > 0 && options[index]) {
                return options[index][fieldName] || '';
            }
            else {
                return '';
            }
        });
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
            setShowOptions((prevOptions) => !prevOptions);
        }
    };
    const HandleEnterOption = (event, index) => {
        if (event.key === "Enter") {
            makeSelect(index);
        }
    };
    const HandleOpen = (e) => {
        const target = e.target;
        const isCloseIcon = target.closest("[data-chip-icon]");
        const isOption = target.closest("[data-option]");
        if (!isCloseIcon && !isOption) {
            if (multiselect && showOptions) {
                if (selectedOptions.length <= 0 && onEmptyUseStartValues) {
                    setSelectedOptions(startIndex != undefined && startIndex != null ? Array.isArray(startIndex) ? startIndex : [startIndex] : []);
                }
            }
            setShowOptions((prevOptions) => !prevOptions);
        }
    };
    return _jsx(DisabledOverlay, { disabled: disabled, style: Object.assign({}, Object.assign({ mainWrapper: { width: "100%" } }, getStyle("disableStyle"))), children: _jsxs("div", { style: Object.assign(Object.assign({}, getStyle("wrapper")), (label ? { paddingTop: (_a = style === null || style === void 0 ? void 0 : style.labelGap) !== null && _a !== void 0 ? _a : (multiselect ? "1.60rem" : "1.4rem") } : {})), ref: elementRef, onClick: disabled ? undefined : HandleOpen, onKeyDown: disabled ? undefined : OnKeyDown, tabIndex: disabled ? undefined : 0, children: [label
                    ? _jsx("span", { style: getStyle("label"), children: label })
                    : null, _jsx("div", { style: getStyle("selectedWrapper"), children: selectedOptions.length > 0 && options
                        ? _jsx(_Fragment, { children: multiselect
                                ? selectedOptions.map((index) => _jsx(SelectChip, { data: options[index], style: getStyle("selectedChip"), pattern: selectedPattern !== null && selectedPattern !== void 0 ? selectedPattern : pattern, onRemove: () => removeChip(index) }, index))
                                : _jsx("span", { style: getStyle("selectedText"), children: replaceFields(selectedOptions[0], selectedPattern !== null && selectedPattern !== void 0 ? selectedPattern : pattern) }) })
                        : _jsx("span", { style: getStyle("placeholderText"), children: placeholderText ? placeholderText : (multiselect ? "Vyberte Možnosti" : "Vyberte Možnost") }) }), _jsx(FontAwesomeIcon, { icon: showOptions ? faCaretDown : faCaretLeft, style: getStyle("arrow") }), showOptions ?
                    _jsxs("div", { style: getStyle("optionsWrapper"), "data-option-wrapper": true, children: [searchable
                                ? _jsxs(_Fragment, { children: [_jsx(Input, { icon: searchBarIcon || faSearch, label: searchBarLabel, style: Object.assign(Object.assign({}, searchBarStyle), (style ? ("searchBar" in style ? style.searchBar : {}) : {})), onChange: (value) => setSearchFilter(value) }), _jsx("hr", { style: { marginTop: "0.1em", marginBottom: "0.1em", marginRight: "1em", marginLeft: "1em" } })] })
                                : null, options && (options === null || options === void 0 ? void 0 : options.length) > 0
                                ? _jsx(_Fragment, { children: options.map((option, index) => {
                                        let notContained = !selectedOptions.includes(index);
                                        let containsSearch = false;
                                        if (notContained) {
                                            Object.values(option).forEach((value) => {
                                                if (value) {
                                                    if (value.toString().toLowerCase().includes(searchFilter.toLowerCase())) {
                                                        containsSearch = true;
                                                    }
                                                }
                                            });
                                        }
                                        if (notContained && containsSearch) {
                                            return _jsx("div", { style: getStyle("option"), tabIndex: disabled ? undefined : 0, onKeyDown: disabled ? undefined : (event) => HandleEnterOption(event, index), "data-option": true, onClick: disabled ? undefined : () => makeSelect(index), onMouseEnter: onHover, onMouseLeave: onLeave, children: replaceFields(index, selectedPattern !== null && selectedPattern !== void 0 ? selectedPattern : pattern) }, index);
                                        }
                                    }) })
                                : _jsx("span", { style: getStyle("noOptionsText"), children: "Polo\u017Eky neexistuj\u00ED" })] })
                    : null] }) });
};
export default Select;
