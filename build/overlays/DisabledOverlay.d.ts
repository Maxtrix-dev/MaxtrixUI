import React, { CSSProperties } from "react";
export type DisabledOverlayStyle = {
    mainWrapper?: CSSProperties;
    disableOverlay?: CSSProperties;
};
type DisabledOverlayProps = {
    children: React.ReactNode;
    disabled?: boolean;
    style?: DisabledOverlayStyle;
};
declare const DisabledOverlay: ({ children, disabled, style }: DisabledOverlayProps) => import("react/jsx-runtime").JSX.Element;
export default DisabledOverlay;
