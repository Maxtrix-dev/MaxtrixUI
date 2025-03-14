import { CSSProperties } from "react";
import { DisabledOverlayStyle } from "../overlays/DisabledOverlay";
type ToggleProps = {
    pattern: string;
    data?: JsonObject;
    onToggle: (value: boolean) => void;
    checked?: boolean;
    disabled?: boolean;
    startValue?: boolean;
    loadingText?: string;
    animation?: {
        duration: number;
        type?: "ease-in-out";
    };
    style?: {
        ball?: CSSProperties;
        toggleWrap?: CSSProperties;
        disableStyle?: DisabledOverlayStyle;
    };
};
declare const Toggle: ({ data, pattern, style, disabled, onToggle, checked, loadingText, animation }: ToggleProps) => import("react/jsx-runtime").JSX.Element;
export default Toggle;
