import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type TextAreaStyle<Label extends LabelProps|undefined=undefined>={
    wrapper:CSSProperties,
    textArea:CSSProperties
}&(Label extends undefined?{}:{label?:CSSProperties,labelGap?:string
})

type LabelProps={
    text:string,
    placement:"label"|"placeholder"
}

type TextAreaProps<Label extends LabelProps|undefined=undefined>={
    onChange:(value:string)=>void
    startValue?:string,
    onEmptyUseStartValue?:boolean
    label?:Label,
    style?:TextAreaStyle<Label>,
}

type CustomStyleKey<Label extends LabelProps|undefined=undefined>=keyof TextAreaStyle<Label>

const styles:Style={
    title:{
        position: "absolute",
        top: "0.4rem", /* Adjust as needed */
        left: "0.75rem", /* Adjust as needed */
        backgroundColor: "white",
        padding:"0px",
        fontSize: "0.9rem", 
        lineHeight:"0.9rem",
        //color:"lightgray",
        color: "#5f676e",
        border:"none",
        userSelect:"none",
        WebkitUserSelect:"none",
        msUserSelect:"none",
    },
    wrapper:{
        display:"flex",
        position: "relative",
        marginBottom:"0.5em",
        border:"solid 1px lightgray",
        borderRadius:"0.25rem",
        boxShadow:"0px 0px 5px rgba(0, 0, 0, 0.1)",
        minHeight:"3.5rem"
    },
    textArea:{
        padding:"0.45rem 0.75rem",
        width:"100%",
        height:"100%",
        border:"none",
        borderRadius:"0.25rem",
        minHeight:"3.5rem"
    }
}

const TextArea=<Label extends LabelProps|undefined=undefined>({onChange,onEmptyUseStartValue=false,startValue,label,style}:TextAreaProps<Label>)=>{
    const changed=useRef<boolean>(false);
    const [value,setValue]=useState<string>(startValue?startValue.toString():"");
    const getStyle= (key:CustomStyleKey<Label>,localStyleKey?:keyof typeof styles)=>{
        const resolvedKey = (localStyleKey ?? key) as keyof typeof styles & string;
        // Check if the key exists in the styles and style objects
        const baseStyle = styles[resolvedKey] || {};
        const customStyle = style && key in style ? style[key as keyof typeof style] : {};
        return { ...baseStyle, ...customStyle };
    }
    useEffect(()=>{
            onChange(value);
        },[value]);
        useEffect(()=>{
            setValue(startValue?startValue.toString():"");
        },[startValue]);
        const HandleFocus=(e:React.FocusEvent<HTMLTextAreaElement>)=>{
            if(onEmptyUseStartValue){
                setValue("");
            }
        }
        const HandleBlur=(e:React.FocusEvent<HTMLTextAreaElement>)=>{
            let {value}=e.target;
            if(value.length<=0){
                if(onEmptyUseStartValue&&startValue!=null&&startValue!=undefined&&startValue?.toString().length>0){
                    setValue(startValue?startValue.toString():"");
                }
            }
        }
    return <div style={getStyle("wrapper")}>
        {label&&label?.placement=="label"
        ?<span style={getStyle("title" as CustomStyleKey<Label>)}>
            {label.text}
        </span>
        :null
        }
        <textarea style={{...getStyle("textArea"),...(label&&label?.placement=="label"?{paddingTop:(style as { labelGap?: string })?.labelGap ?? "1.4rem"}:{})}} value={value} placeholder={label&&label?.placement=="placeholder"?label.text:undefined} onFocus={HandleFocus} onBlur={HandleBlur} onChange={(e)=>setValue(e.target.value)}>
        </textarea>
    </div>
}

export default TextArea;