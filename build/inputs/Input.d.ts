import { CSSProperties } from "react";
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DisabledOverlayStyle } from "../overlays/DisabledOverlay";
export type InputLabelProps<LabelPlacement extends "placeholder" | "label"> = {
    placement: LabelPlacement;
    text: string;
};
export type InputStyle<Icon extends IconDefinition | undefined, Label extends InputLabelProps<"label" | "placeholder"> | undefined = undefined, LabelPlacement extends "label" | "placeholder" = Label extends InputLabelProps<infer P> ? P : "label"> = {
    input?: CSSProperties;
    wrapper?: CSSProperties;
    disableStyle?: DisabledOverlayStyle;
} & (Icon extends undefined ? {} : {
    icon?: CSSProperties;
}) & (Label extends undefined ? {} : {
    label?: CSSProperties;
}) & (LabelPlacement extends "placeholder" ? {} : {
    labelCentered?: CSSProperties;
    labelGap?: string;
});
interface InputProps<Type extends "text" | "number" = "text", Icon extends IconDefinition | undefined = undefined, Label extends InputLabelProps<"label" | "placeholder"> | undefined = undefined, LabelPlacement extends "label" | "placeholder" = Label extends InputLabelProps<infer P> ? P : "label"> {
    label?: Label;
    onChange: (value: (Type extends "number" ? number : string)) => void;
    startValue?: (Type extends "number" ? number | null : string | null);
    onEmptyUseStartValue?: boolean;
    disabled?: boolean;
    style?: InputStyle<Icon, Label, LabelPlacement>;
    icon?: Icon;
    type?: Type;
}
declare const Input: <Type extends "number" | "text" = "text", Icon extends IconDefinition | undefined = undefined, Label extends InputLabelProps<"label" | "placeholder"> | undefined = undefined, LabelPlacement extends "label" | "placeholder" = Label extends InputLabelProps<infer P extends "label" | "placeholder"> ? P : "label">({ label, disabled, style, icon, type, onChange, startValue, onEmptyUseStartValue }: InputProps<Type, Icon, Label, LabelPlacement>) => import("react/jsx-runtime").JSX.Element;
export default Input;
