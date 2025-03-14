import React, { CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCancel, faClose } from "@fortawesome/free-solid-svg-icons";

export type SelectChipStyle={
    wrapper?:CSSProperties,
    text?:CSSProperties,
    icon?:CSSProperties,
}

interface SelectChipProps{
    pattern:string
    data:JsonObject,
    onRemove:()=>void,
    icon?:IconDefinition,
    style?:SelectChipStyle
}

type CustomStyleKey="text"|"wrapper"|"icon";

const styles:Style={
    wrapper:{
        borderRadius:"1rem",
        border:"solid 1px lightgray",
        paddingRight:"0.5em",
        paddingLeft:"0.5em",
        paddingTop:"0.25em",
        paddingBottom:"0.25em",
        marginLeft:"0.2em",
        marginRight:"0.2em",
        display:"flex",
        alignItems:"center",
        flexWrap:"nowrap",
    },
    text:{
        whiteSpace:"nowrap",
        userSelect:"none",
        WebkitUserSelect:"none",
        msUserSelect:"none"
    },
    icon:{
        color:"red",
        marginLeft:"0.5em",
        cursor:"pointer",
    }
};

const SelectChip=({pattern,data,onRemove,icon,style}:SelectChipProps)=>{
    //it simplifies the joining of the styles
    const getStyle=(key:CustomStyleKey,localStyleKey?:string)=>{
        return {...styles[localStyleKey ?? key],...(style?.[key]??null)}
    }
    const OnKeyDown=(event:React.KeyboardEvent<SVGSVGElement>)=>{
            if(event.key==="Enter"){
                onRemove();
            }
        }
    //this will handle the replacing 
    const replaceFields=(pattern:string)=>{
        const regex = /<field:([\w]+)>/g;
        return pattern.replace(regex,(_,fieldName)=>{
            if(data!=undefined && data!=null){
                return data[fieldName] || '';
            }
            else{
                return '';
            }
        })
    }
    return <div style={getStyle("wrapper")}>
        <span style={getStyle("text")}>{replaceFields(pattern)}</span>
        <FontAwesomeIcon tabIndex={0} onKeyDown={OnKeyDown} icon={icon!=null?icon:faClose} data-chip-icon style={getStyle("icon")} onClick={(e)=>onRemove()} />
    </div>
};
export default SelectChip;