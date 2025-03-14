import React, { CSSProperties, ReactNode } from "react";

type TextStyle<Label extends string|undefined=undefined>={
    wrapper:CSSProperties
}&(Label extends undefined?{}:{label?:CSSProperties,labelGap?:string
})

type TextProps<Label extends string|undefined=string>={
    children:ReactNode,
    label?:Label,
    style?:TextStyle<Label>,
}

type CustomStyleKey<Label extends string|undefined=undefined>=keyof TextStyle<Label>

const styles:Style={
    label:{
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
        padding:"0.45rem 0.75rem",
        marginBottom:"0.5em",
        border:"solid 1px lightgray",
        borderRadius:"0.25rem",
        boxShadow:"0px 0px 5px rgba(0, 0, 0, 0.1)"
    },
}

const Text=<Label extends string|undefined=undefined>({children,label,style}:TextProps<Label>)=>{
    const getStyle= (key:CustomStyleKey<Label>,localStyleKey?:keyof typeof styles)=>{
        const resolvedKey = (localStyleKey ?? key) as keyof typeof styles & string;
        // Check if the key exists in the styles and style objects
        const baseStyle = styles[resolvedKey] || {};
        const customStyle = style && key in style ? style[key as keyof typeof style] : {};
        return { ...baseStyle, ...customStyle };
    }
    return <span style={{...getStyle("wrapper"),...(label?{paddingTop:(style as { labelGap?: string })?.labelGap ?? "1.4rem"}:{})}}>
        {label
        ?<span style={getStyle("label" as CustomStyleKey<Label>)}>
            {label}
        </span>
        :null
        }
        {children}
    </span>
}
export default Text;