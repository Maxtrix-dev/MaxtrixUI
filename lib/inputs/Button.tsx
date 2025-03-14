import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties, useState } from "react";
import DisabledOverlay from "../overlays/DisabledOverlay";

type ButtonStyle<Icon extends IconDefinition | undefined=undefined,Text extends string | undefined=undefined>={
    button?:CSSProperties
    onHover?:CSSProperties
}&(Icon extends undefined
    ?{}
    :{
        icon?:CSSProperties
    })&(Text extends undefined?{}:{
        text?:CSSProperties
    })


type ButtonProps<Icon extends IconDefinition | undefined=undefined,Text extends string | undefined=undefined>=(Icon extends undefined
    ?{
        text:Text,
        onClick:()=>void,
        style?:ButtonStyle<Icon,Text>
        disabled?:boolean
    }
    :{
        text?:Text,
        onClick:()=>void,
        style?:ButtonStyle<Icon,Text>,
        disabled?:boolean
    }
)&(Text extends undefined
    ?{
        icon:Icon,
        onClick:()=>void,
        style?:ButtonStyle<Icon,Text>
        disabled?:boolean
    }
    :{
        icon?:Icon,
        onClick:()=>void,
        style?:ButtonStyle<Icon,Text>
        disabled?:boolean
    }
);


const styles:Style={
    button:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:"0.25rem",
        padding:"0.3em 1em",
        border:"none",
        backgroundColor:"#0d6efd",
        color:"white",
        marginBottom:"0.5em"
    },
    icon:{

    },
    onHover:{
        backgroundColor:"#0056b3"
    }
}

type CustomStyleKey<Icon extends IconDefinition | undefined,Text extends string|undefined=undefined>= keyof ButtonStyle<Icon,Text>;

const Button=<Icon extends IconDefinition|undefined=undefined,Text extends string | undefined=undefined>({text,icon,style,disabled,onClick}:ButtonProps<Icon,Text>)=>{
    const [hovered,setHovered]=useState(false);
    const getStyle = <K extends CustomStyleKey<Icon, Text>>(
        key: K,
        localStyleKey?: keyof typeof styles
    ) => {
        const resolvedKey = (localStyleKey ?? key) as keyof typeof styles & string;
        // Check if the key exists in the styles and style objects
        const baseStyle = styles[resolvedKey] || {};
        const customStyle = style && key in style ? style[key] : {};
        return { ...baseStyle, ...customStyle };
    };
    const onHover=(e:React.MouseEvent<HTMLButtonElement>)=>{
        setHovered(true);
    }
    const onLeave=(e:React.MouseEvent<HTMLButtonElement>)=>{
        setHovered(false);
    }
    return <DisabledOverlay disabled={disabled}> 
        <button style={{...getStyle("button"),...(hovered?getStyle("onHover"):{})}} onMouseEnter={disabled?undefined:onHover} onMouseLeave={disabled?undefined:onLeave} onClick={disabled?undefined:onClick}>
            {icon
                ?<FontAwesomeIcon icon={icon} style={getStyle("icon" as CustomStyleKey<Icon,Text>)} />
                :null
            }
            {text
                ?<span style={{...getStyle("text" as CustomStyleKey<Icon,Text>),...(icon?{marginLeft:"0.5em"}:{})}}>{text}</span>
                :null
            }
        </button>
    </DisabledOverlay>
    ;
}

export default Button;