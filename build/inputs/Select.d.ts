import { CSSProperties } from "react";
import { InputLabelProps, InputStyle } from "./Input";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { SelectChipStyle } from "../text/SelectChip";
import { DisabledOverlayStyle } from "../overlays/DisabledOverlay";
type SelectStyle<Searchable extends boolean = false, SearchIcon extends IconDefinition | undefined = undefined, Multiselect extends boolean = false, Label extends string | undefined = undefined> = {
    select?: CSSProperties;
    wrapper?: CSSProperties;
    placeholderText?: CSSProperties;
    disableStyle?: DisabledOverlayStyle;
    onHoverOption?: CSSProperties;
    arrow?: CSSProperties;
    option?: CSSProperties;
    optionsWrapper?: CSSProperties;
    selectedWrapper?: CSSProperties;
    noOptionsText?: CSSProperties;
} & (Multiselect extends true ? {
    selectedChip?: SelectChipStyle;
} : {
    selectedText?: CSSProperties;
}) & (Searchable extends true ? {
    searchBar?: InputStyle<SearchIcon>;
} : {}) & (Label extends undefined ? {} : {
    label?: CSSProperties;
    labelGap?: string;
});
type SelectProps<T extends Record<string, any>, Searchable extends boolean = false, SearchIcon extends IconDefinition | undefined = undefined, Multiselect extends boolean = false, Label extends string | undefined = undefined> = {
    label?: Label;
    pattern: string;
    selectedPattern?: string;
    options: T[];
    disabled?: boolean;
    placeholderText?: string;
    style?: SelectStyle<Searchable, SearchIcon, Multiselect, Label>;
} & (Searchable extends true ? {
    searchable?: Searchable;
    searchBarIcon?: SearchIcon;
    searchBarLabel?: InputLabelProps<"label" | "placeholder">;
} : {
    searchable?: Searchable;
}) & (Multiselect extends true ? {
    onEmptyUseStartValues?: boolean;
    multiselect?: Multiselect;
    onSelect: (value: T[]) => void;
    startIndex?: number[];
} : {
    multiselect?: Multiselect;
    onSelect: (value: T) => void;
    startIndex?: number;
});
declare const Select: <T extends Record<string, any>, Searchable extends boolean = false, SearchIcon extends IconDefinition | undefined = undefined, Multiselect extends boolean = false, Label extends string | undefined = undefined>(props: SelectProps<T, Searchable, SearchIcon, Multiselect, Label>) => import("react/jsx-runtime").JSX.Element;
export default Select;
