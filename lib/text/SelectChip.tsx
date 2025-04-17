import React, { CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCancel, faClose } from "@fortawesome/free-solid-svg-icons";

export type SelectChipStyle={
    wrapper?:CSSProperties,
    text?:CSSProperties,
    icon?:CSSProperties,
    button?:CSSProperties,
}

interface SelectChipProps{
    pattern:string
    data:JsonObject,
    onRemove:()=>void,
    icon?:IconDefinition,
    style?:SelectChipStyle
}

type CustomStyleKey="text"|"wrapper"|"icon"|"button";

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
        
    },
    button:{
        marginLeft:"0.5em",
        cursor:"pointer",
        display:"inline-flex",
        alignItems:"center",
        justifyContent:"center",
        lineHeight:0,
        background:"transparent",
        border:"none",
        padding:"1px"
    }
};

const SelectChip=({pattern,data,onRemove,icon,style}:SelectChipProps)=>{
    //it simplifies the joining of the styles
    const getStyle=(key:CustomStyleKey,localStyleKey?:string)=>{
        return {...styles[localStyleKey ?? key],...(style?.[key]??null)}
    }
    const OnKeyDown=(e:React.KeyboardEvent<HTMLButtonElement>)=>{
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // take focus away so we don’t hide it while it's still focused
            e.currentTarget.blur();
            onRemove();
          }
        }
    const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur();
        onRemove();
    };
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
        <button data-chip-icon style={getStyle("button")} tabIndex={0} onKeyDown={OnKeyDown} onClick={handleRemoveClick}>
            <FontAwesomeIcon icon={icon!=null?icon:faClose} style={getStyle("icon")} />
        </button>
    </div>
};
export default SelectChip;