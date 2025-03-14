import { CSSProperties, ReactNode } from "react";
type TextStyle<Label extends string | undefined = undefined> = {
    wrapper: CSSProperties;
} & (Label extends undefined ? {} : {
    label?: CSSProperties;
    labelGap?: string;
});
type TextProps<Label extends string | undefined = string> = {
    children: ReactNode;
    label?: Label;
    style?: TextStyle<Label>;
};
declare const Text: <Label extends string | undefined = undefined>({ children, label, style }: TextProps<Label>) => import("react/jsx-runtime").JSX.Element;
export default Text;
