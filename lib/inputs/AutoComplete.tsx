import React, { CSSProperties, useEffect, useRef, useState } from "react";
import Input, { InputLabelProps, InputStyle } from "./Input";
import axios, { CancelTokenSource } from "axios";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import DisabledOverlay, { DisabledOverlayStyle } from "../overlays/DisabledOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

type AutoCompleteStyle<Icon extends IconDefinition|undefined=undefined>={
    mainWrapper?:CSSProperties,
    optionWrapper?:CSSProperties,
    option?:CSSProperties,
    loadingText?:CSSProperties,
    noItemText?:CSSProperties,
    inputStyle:InputStyle<Icon>,
    onHoverOption?:CSSProperties,
    disableStyle?:DisabledOverlayStyle,
    removeIcon?:CSSProperties,

}

type AutoCompleteProps<Icon extends IconDefinition|undefined=undefined>={
    pattern:string,
    label:InputLabelProps<"label"|"placeholder">,
    search:(searchTerm:string,cancelToken:CancelTokenSource)=>Promise<JsonObject[]>;
    onSelect:(data:JsonObject|null)=>void,
    selectedPattern?:string,
    loadingText?:string,
    searchDelay?:number
    noItemsText?:string,
    disabled?:boolean,
    icon?:Icon,
    startValue?:JsonObject[],
    style?:AutoCompleteStyle,
    removeIcon?:IconDefinition,
}

const styles:Style={
    optionWrapper:{
        display:"flex",
        flexDirection:"column",
        position:"absolute",
        top:"100%",
        width:"100%",
        zIndex:11,
        borderBottomLeftRadius:"8px",
        borderBottomRightRadius:"8px",
        borderLeft:"solid 1px darkgray",
        borderBottom:"solid 1px darkgray",
        borderRight:"solid 1px darkgray",
        paddingBottom:"1em",
        maxHeight:"20em",
        overflowY:"scroll",
        backgroundColor:"white"

    },
    mainWrapper:{
        display:"flex",
        flexDirection:"column",
        position:"relative",
        width:"100%",
        marginBottom:"0.5em"
    },
    option:{
        paddingLeft:"1em",
        paddingRight:"1em",
        paddingTop:"0.15em",
        paddingBottom:"0.15em",
        backgroundColor:"white"
    },
    onHoverOption:{
        backgroundColor:"lightgray"
    },
    removeIcon:{
        position:"absolute",
        top:"50%",
        transform:"translateY(-50%)",
        right:"1rem"
    }
}

const inputStyle:InputStyle<IconDefinition>={
    wrapper:{
        marginBottom:0
    }
}

type CustomStyleKey<Icon extends IconDefinition | undefined>=keyof AutoCompleteStyle<Icon>

const AutoComplete=<Icon extends IconDefinition | undefined=undefined>({label,search,pattern,onSelect,startValue,loadingText,noItemsText,style,disabled,selectedPattern,removeIcon}:AutoCompleteProps<Icon>)=>{
    const [options,setOptions]=useState<JsonObject[]|null>(null);
    const CancelToken=axios.CancelToken;
    const cancelTokenSource=useRef<CancelTokenSource>(null);
    const [selectedValue,setSelectedValue]=useState<string|null>(null);
    const [showOptions,setShowOptions]=useState<boolean>(false);
    const elementRef = useRef<HTMLDivElement | null>(null);


    const onHover=(e:React.MouseEvent<HTMLDivElement>)=>{
        Object.assign(e.currentTarget.style,{...styles.option,...getStyle("option"),...getStyle("onHoverOption")})
    }
    const onLeave=(e:React.MouseEvent<HTMLDivElement>)=>{
        Object.assign(e.currentTarget.style,{...styles.option,...getStyle("option")})
    }

    const handleOutsideClick = (event: MouseEvent) => {
        if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
            const target=event.target as HTMLElement;
            setShowOptions(false);
        }
        };
    
    useEffect(() => {
        // Add event listener to detect clicks anywhere on the document
        document.addEventListener("click", handleOutsideClick);
    
        // Cleanup the event listener on unmount
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const HandleSelect=(data:JsonObject)=>{
        if(data){
            setSelectedValue(replaceFields(data,selectedPattern??pattern));
            setShowOptions(false);
            onSelect(data);
        }
    }

    const getStyle= (key:CustomStyleKey<Icon>,localStyleKey?:keyof typeof styles)=>{
        const resolvedKey = (localStyleKey ?? key) as keyof typeof styles & string;
        // Check if the key exists in the styles and style objects
        const baseStyle = styles[resolvedKey] || {};
        const customStyle = style && key in style ? style[key as keyof typeof style] : {};
        return { ...baseStyle, ...customStyle };
    }
    const replaceFields=(option:JsonObject,pattern:string)=>{
        const regex = /<field:([\w]+)>/g;
        return pattern.replace(regex,(_,fieldName)=>{
             
            return option[fieldName] || '';
        })
    }

    const onClick=()=>{
        if(!showOptions&&options&&options.length>0){
            setShowOptions(true);
        }
    }
    const cancelSelect=()=>{
        setSelectedValue(null);
        onSelect(null);
    }

    const SearchStuff=(value:string)=>{
        if(value.length>0){
            if(value!=(selectedValue??(startValue?replaceFields(startValue,selectedPattern??pattern):null))){
                setShowOptions(true);
                if(cancelTokenSource.current){
                    cancelTokenSource.current.cancel();
                }
                cancelTokenSource.current=CancelToken.source();
                setOptions(null);
                setTimeout(async()=>{
                    if(cancelTokenSource.current){
                        setOptions(await search(value,cancelTokenSource.current));
                    }
                },700);
            }
        }
    }
    return <DisabledOverlay disabled={disabled} style={{...{mainWrapper:{width:"100%"},...getStyle("disableStyle")}}}>
    <div ref={elementRef} onClick={onClick} style={getStyle("mainWrapper")}>
        <Input label={label} onEmptyUseStartValue style={{...inputStyle,...getStyle("inputStyle")}} startValue={selectedValue??(startValue?replaceFields(startValue,selectedPattern??pattern):null)} onChange={SearchStuff} />
        {selectedValue
            ?<FontAwesomeIcon style={getStyle("removeIcon")} icon={removeIcon??faClose} onClick={cancelSelect} />
            :null
        }
        {showOptions
            ?<div style={getStyle("optionWrapper")}>
                {options
                ?<>
                    {
                        options.map((option,index)=><span key={index} onMouseEnter={onHover} onMouseLeave={onLeave} onClick={()=>HandleSelect(option)} style={getStyle("option")} >{replaceFields(option,pattern)}</span>)
                    }
                </>
                :<>
                    {!cancelTokenSource.current?.token.reason
                        ?<span style={getStyle("loadingText")}>{loadingText??"Načítání..."}</span>
                        :<span style={getStyle("noItemText")}>{noItemsText??"Položky neexistují"}</span>
                    }
                </>
                }
            </div>
            :null
        }
    </div>
    </DisabledOverlay>
};

export default AutoComplete;