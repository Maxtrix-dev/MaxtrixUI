import React, { CSSProperties, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import {faSearch, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DisabledOverlay, { DisabledOverlayStyle } from "../overlays/DisabledOverlay";

export type InputLabelProps<LabelPlacement extends "placeholder"|"label">={
        placement:LabelPlacement;
        text:string;
    }
export type InputStyle<Icon extends IconDefinition | undefined,Label extends InputLabelProps<"label"|"placeholder">|undefined=undefined,LabelPlacement extends "label"|"placeholder"=Label extends InputLabelProps<infer P>?P:"label">={
    input?: CSSProperties;
    wrapper?: CSSProperties;
    disableStyle?:DisabledOverlayStyle;
}&(Icon extends undefined?{}:{icon?:CSSProperties})
&(Label extends undefined?{}:{label?: CSSProperties;})
&(LabelPlacement extends "placeholder"?{}:{labelCentered?:CSSProperties,labelGap?:string})

type CustomStyleKey<Icon extends IconDefinition | undefined,Label extends InputLabelProps<"label"|"placeholder">|undefined=undefined,LabelPlacement extends "label"|"placeholder"=Label extends InputLabelProps<infer P>?P:"label">= keyof InputStyle<Icon,Label,LabelPlacement>;

type DataProps={
    [key in `data-${string}`]?: string|boolean;
}

export interface InputProps<
        Type extends "text"|"number" = "text",
        Icon extends IconDefinition | undefined=undefined,
        Label extends InputLabelProps<"label"|"placeholder">|undefined=undefined,
        LabelPlacement extends "label"|"placeholder"=Label extends InputLabelProps<infer P>?P:"label"> extends DataProps{
    label?:Label,
    onChange:(value:(Type extends "number"?number:string))=>void
    startValue?:(Type extends "number"?number|null:string|null),
    name?:string,
    onEmptyUseStartValue?:boolean,
    disabled?:boolean,
    style?:InputStyle<Icon,Label,LabelPlacement>,
    icon?:Icon,
    type?:Type
};

const Input=<Type extends "text"|"number" = "text",Icon extends IconDefinition |undefined=undefined,Label extends InputLabelProps<"label"|"placeholder">|undefined=undefined,LabelPlacement extends "label"|"placeholder"=Label extends InputLabelProps<infer P>?P:"label">({label,disabled,style,icon,type,onChange,startValue,onEmptyUseStartValue,name,...rest}:InputProps<Type,Icon,Label,LabelPlacement>)=>{

    //Tady je potřeba dodělat tu animaci

    const styles:Style={
        label:{
            position: "absolute",
            top: "0.4rem", /* Adjust as needed */
            left: "0.75rem", /* Adjust as needed */
            //backgroundColor: "white",
            padding: "0px",
            fontSize: "0.9rem", /* Adjust as needed */
            lineHeight:"0.9rem",
            color: "#5f676e",
            border:"none",
            userSelect:"none",
            WebkitUserSelect:"none",
            msUserSelect:"none",
            transition:"top 0.25s ease-in-out, transform 0.25s ease-in-out",
            cursor:"text",
            whiteSpace:"nowrap"
        },
        labelCentered:{
            top:"50%",
            transform:"translateY(-50%)",
            fontSize:"1rem",
            lineHeight:"1rem"
        },
        input:{
            position:"relative",
            borderRadius:"0.25rem",
            width:"100%",
            height:"100%",
            boxSizing:"border-box",
            border:"none",
            flex:1,
            padding:"0.45rem 0.75rem",
            paddingLeft:icon?"1.7em":"0.5em",
        },
        wrapper:{
            display:"flex",
            position: "relative",
            marginBottom:"0.5em",
            borderRadius:"0.25rem",
            border:"solid 1px lightgray",
            boxShadow:"0px 0px 5px rgba(0, 0, 0, 0.1)",
        },
        icon:{
            position:"absolute",
            top:label?.placement=="placeholder"?"50%":"53%",
            transform: "translateY(-50%)",
            left:"0.5em",
        }
    };
    const getStyle= (key:CustomStyleKey<Icon,Label,LabelPlacement>,localStyleKey?:keyof typeof styles)=>{
          const resolvedKey = (localStyleKey ?? key) as keyof typeof styles & string;
          const baseStyle = styles[resolvedKey] || {};
          const customStyle = style && key in style ? style[key as keyof typeof style] : {};
          return { ...baseStyle, ...customStyle };
    }
    const inputRef=useRef<HTMLInputElement>(null);
    const [value,setValue]=useState<string|null>(startValue?startValue.toString():null);
    const [labelUp,setLabelUp]=useState<boolean>(false);

    useEffect(()=>{
        if(value!=null&&value!=undefined){
            if(type=="number"){
                const numericValue = value === '' ? NaN : Number(value);
                onChange(numericValue as Type extends "number" ? number : string);
            }
            else{
                onChange(value as Type extends "number" ? number : string);
            }
        }
    },[value]);
    useEffect(()=>{
        if(startValue&&startValue?.toString().length>0){
            setLabelUp(true);
        }
        else{
            setLabelUp(false);
        }
        setValue(startValue?startValue.toString():null);
    },[startValue]);
    const HandleFocus=(e:React.FocusEvent<HTMLInputElement>)=>{
        if(onEmptyUseStartValue){
            setValue("");
        }
        setLabelUp(true);
    }
    const HandleBlur=(e:React.FocusEvent<HTMLInputElement>)=>{
        let {value}=e.target;
        if(value.length<=0){
            if(onEmptyUseStartValue&&startValue!=undefined&&startValue!=null&&startValue?.toString().length>0){
                setLabelUp(true);
                setValue(startValue?startValue.toString():null);
            }
            else{
                setLabelUp(false);
            }
        }
    }
    const labelClick=()=>{
        if(inputRef.current){
            inputRef.current.focus();
        }
    }
//v on change se taky bs neděje takže what the fuck
    return <div style={getStyle("wrapper")}>
        <input ref={inputRef} value={value??""} name={name} placeholder={label&&label?.placement=="placeholder"?label?.text:undefined} onBlur={HandleBlur} onFocus={HandleFocus} disabled={disabled} style={{...getStyle("input"),...(label&&label?.placement=="label"?{paddingTop:(style as {labelGap?:string})?.labelGap??"1.4rem"}:{})}} 
            onChange={(e)=>{
                if(((value!=null&&value!=undefined)||e.target.value.length>0)){
                    setValue(e.target.value);
                }
                }} type={type} {...rest} />
        {label&&label?.placement=="label"
            ?<span onClick={labelClick} style={{...getStyle("label" as CustomStyleKey<Icon,Label,LabelPlacement>),...(!labelUp?getStyle("labelCentered" as CustomStyleKey<Icon,Label,LabelPlacement>):{})}}>{label.text}</span>
            :null
        }
        {icon!=null
            ?<FontAwesomeIcon icon={icon} style={getStyle("icon" as CustomStyleKey<Icon,Label,LabelPlacement>)} />
            :null
        }
    </div>;
}

export default Input;