import { CSSProperties } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
export type SelectChipStyle = {
    wrapper?: CSSProperties;
    text?: CSSProperties;
    icon?: CSSProperties;
    button?: CSSProperties;
};
interface SelectChipProps {
    pattern: string;
    data: JsonObject;
    onRemove: () => void;
    icon?: IconDefinition;
    style?: SelectChipStyle;
}
declare const SelectChip: ({ pattern, data, onRemove, icon, style }: SelectChipProps) => import("react/jsx-runtime").JSX.Element;
export default SelectChip;
