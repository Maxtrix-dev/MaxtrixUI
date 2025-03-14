import { CSSProperties } from "react";
type TextAreaStyle<Label extends LabelProps | undefined = undefined> = {
    wrapper: CSSProperties;
    textArea: CSSProperties;
} & (Label extends undefined ? {} : {
    label?: CSSProperties;
    labelGap?: string;
});
type LabelProps = {
    text: string;
    placement: "label" | "placeholder";
};
type TextAreaProps<Label extends LabelProps | undefined = undefined> = {
    onChange: (value: string) => void;
    startValue?: string;
    onEmptyUseStartValue?: boolean;
    label?: Label;
    style?: TextAreaStyle<Label>;
};
declare const TextArea: <Label extends LabelProps | undefined = undefined>({ onChange, onEmptyUseStartValue, startValue, label, style }: TextAreaProps<Label>) => import("react/jsx-runtime").JSX.Element;
export default TextArea;
