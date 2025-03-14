import { jsx as _jsx } from "react/jsx-runtime";
const basicStyle = {
    border: "solid 1px lightgray",
    borderRadius: "8px",
};
const Label = (props) => {
    const { text, style } = props;
    return _jsx("span", { style: Object.assign(Object.assign({}, basicStyle), style), children: text });
};
export default Label;
