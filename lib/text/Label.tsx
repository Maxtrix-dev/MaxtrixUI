import React, { CSSProperties } from "react";

type LabelProps={
    text:string;
    style?:CSSProperties;
}


const basicStyle:CSSProperties={
    border:"solid 1px lightgray",
    borderRadius:"8px",
};

const Label=(props:LabelProps)=>{
        const {text,style}=props;
        return <span style={{...basicStyle,...style}}>{text}</span>;
    
};

export default Label;