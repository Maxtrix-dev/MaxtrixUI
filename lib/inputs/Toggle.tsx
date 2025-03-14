import React, { CSSProperties, useState } from "react";
import Label from "../text/Label";
import DisabledOverlay, { DisabledOverlayStyle } from "../overlays/DisabledOverlay";

type ToggleProps={
    pattern:string,
    data?:JsonObject,
    onToggle:(value:boolean)=>void,
    checked?:boolean,
    disabled?:boolean,
    startValue?:boolean;
    loadingText?:string;
    animation?:{
        duration:number,
        type?:"ease-in-out"
    },
    style?:{
        ball?:CSSProperties,
        toggleWrap?:CSSProperties,
        disableStyle?:DisabledOverlayStyle,
    }
}
const styles:Style={
    ball:{
        height:"0.8em",
        width:"0.8em",
        borderRadius:"2rem",
        backgroundColor:"blue",
        margin:"0px",
        transition:"transform 0.3s ease-in-out,background-color 0.3s ease-in-out"
    },
    toggleWrap:{
        display:"inline-flex",
        flexDirection:"row",
        alignItems:"center",
        width:"2.3em",
        height:"1.2em",
        padding:"0.2em",
        marginRight:"5px",
        backgroundColor:"red",
        borderRadius:"1rem",
        boxSizing:"border-box",
        justifyContent:"start",
        transition:"background-color 0.3s ease-in-out"
    },
    toggleWrappOn:{
        backgroundColor:"#0d6efd",
    },
    toggleWrappOff:{
        border:"solid 1px lightgray",
        backgroundColor:"white"
    },
    ballOn:{
        backgroundColor:"white"
    },
    ballOff:{
        backgroundColor:"lightgray"
    },
    mainWrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    text:{

    }
}
//here you can customize globally style for disable of toggle/ mind you it will get wiped if you update the library
const disableStyle:DisabledOverlayStyle={

}

type CustomStyleKey="ball"|"toggleWrap"|"mainWrapper"|"text"|"disableStyle"|"toggleWrappOn"|"toggleWrappOff"|"ballOn"|"ballOff";

const Toggle=({data,pattern,style,disabled,onToggle,checked,loadingText,animation}:ToggleProps)=>{
    const [toggled,setToggled]=useState<boolean>(checked??false);
    const HandleToggle=()=>{
        onToggle(!toggled);
        setToggled((prevToggle)=>!prevToggle);
    }
    const getStyle= (key:CustomStyleKey,localStyleKey?:keyof typeof styles)=>{
        const resolvedKey = (localStyleKey ?? key) as keyof typeof styles & string;
        // Check if the key exists in the styles and style objects
        const baseStyle = styles[resolvedKey] || {};
        const customStyle = style && key in style ? style[key as keyof typeof style] : {};
        return { ...baseStyle, ...customStyle };
  }
  const OnKeyDown=(event:React.KeyboardEvent<HTMLDivElement>)=>{
    if(event.key==="Enter"){
        HandleToggle();
    }
  }
    const replaceFields=(pattern:string)=>{
        const regex = /<field:([\w]+)>/g;
        return pattern.replace(regex,(_,fieldName)=>{
            return (data?data[fieldName].toString():null) || `<field:${fieldName}>`;
        })
    }
    return <DisabledOverlay style={{...disableStyle,...(style?(style.disableStyle??{}):{})}} disabled={disabled}>
    <div style={getStyle("mainWrapper")}>
        <div tabIndex={disabled?undefined:0} onKeyDown={OnKeyDown} style={{...getStyle("toggleWrap"),...(toggled?getStyle("toggleWrappOn"):getStyle("toggleWrappOff")),...(animation?{transition:`background-color ${animation.duration}s ${animation.type??"ease-in-out"}`}:{})}} onClick={disabled?undefined:HandleToggle}>
            <div style={{...getStyle("ball"),...(toggled?{...{transform:"translateX(calc(100% + 0.4em))"},...getStyle("ballOn")}:{...{transform:"translateX(0)"},...getStyle("ballOff")}),...(animation?{transition:`transform ${animation.duration}s ${animation.type??"ease-in-out"},background-color ${animation.duration}s ${animation.type??"ease-in-out"}`}:{})}}></div>
        </div>
        <span style={getStyle("text")} dangerouslySetInnerHTML={{__html:replaceFields(pattern)??(loadingText??"Načítání")}} />
    </div>
    </DisabledOverlay>
}

export default Toggle;