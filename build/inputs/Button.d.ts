import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { CSSProperties } from "react";
type ButtonStyle<Icon extends IconDefinition | undefined = undefined, Text extends string | undefined = undefined> = {
    button?: CSSProperties;
    onHover?: CSSProperties;
} & (Icon extends undefined ? {} : {
    icon?: CSSProperties;
}) & (Text extends undefined ? {} : {
    text?: CSSProperties;
});
type ButtonProps<Icon extends IconDefinition | undefined = undefined, Text extends string | undefined = undefined> = (Icon extends undefined ? {
    text: Text;
    onClick: () => void;
    style?: ButtonStyle<Icon, Text>;
    disabled?: boolean;
} : {
    text?: Text;
    onClick: () => void;
    style?: ButtonStyle<Icon, Text>;
    disabled?: boolean;
}) & (Text extends undefined ? {
    icon: Icon;
    onClick: () => void;
    style?: ButtonStyle<Icon, Text>;
    disabled?: boolean;
} : {
    icon?: Icon;
    onClick: () => void;
    style?: ButtonStyle<Icon, Text>;
    disabled?: boolean;
});
declare const Button: <Icon extends IconDefinition | undefined = undefined, Text_1 extends string | undefined = undefined>({ text, icon, style, disabled, onClick }: ButtonProps<Icon, Text_1>) => import("react/jsx-runtime").JSX.Element;
export default Button;
