import React, { CSSProperties, MouseEventHandler, useEffect, useRef, useState } from "react";
import Input, { InputLabelProps, InputStyle } from "./Input";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import SelectChip, { SelectChipStyle } from "../text/SelectChip";
import Label from "../text/Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faCaretDown, faCaretLeft, faCaretUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import DisabledOverlay, { DisabledOverlayStyle } from "../overlays/DisabledOverlay";

type OptionText={
    fields:string[],
    pattern:string
};

type SelectStyle<Searchable extends boolean = false,SearchIcon extends IconDefinition|undefined=undefined,Multiselect extends boolean=false,Label extends string|undefined=undefined>={
    select?: CSSProperties;
    wrapper?: CSSProperties;
    placeholderText?:CSSProperties;
    disableStyle?:DisabledOverlayStyle;
    onHoverOption?:CSSProperties,
    arrow?:CSSProperties,
    option?:CSSProperties,
    optionsWrapper?:CSSProperties,
    selectedWrapper?:CSSProperties,
    noOptionsText?:CSSProperties
}
&(Multiselect extends true?{selectedChip?:SelectChipStyle}:{selectedText?:CSSProperties})
&(Searchable extends true?{searchBar?:InputStyle<SearchIcon>}:{})
&(Label extends undefined?{}:{label?:CSSProperties,labelGap?:string})


type SelectProps<T extends Record<string,any>,Searchable extends boolean = false,SearchIcon extends IconDefinition|undefined=undefined,Multiselect extends boolean=false,Label extends string|undefined=undefined> = {
    label?: Label;
    pattern:string;
    selectedPattern?:string;
    options: T[];
    disabled?:boolean;
    placeholderText?:string;
    style?: SelectStyle<Searchable,SearchIcon,Multiselect,Label>
}& (Searchable extends true?{
    searchable?: Searchable;
    searchBarIcon?:SearchIcon;
    searchBarLabel?:InputLabelProps<"label"|"placeholder">;
}:{searchable?:Searchable})
&(Multiselect extends true?{
        onEmptyUseStartValues?:boolean
        multiselect?:Multiselect,
        onSelect: (value: T[]) => void;
        startIndex?:number[];
    }
    :{
        multiselect?:Multiselect,
        onSelect: (value: T) => void;
        startIndex?:number
    }
    )




type CustomStyleKey<Searchable extends boolean = false,SearchIcon extends IconDefinition|undefined=undefined,Multiselect extends boolean=false,Label extends string|undefined=undefined>=keyof SelectStyle<Searchable,SearchIcon,Multiselect,Label>
type StyleKeys = 'label' | 'select'|'option'|'optionsWrapper'| 'wrapper' | 'searchBar' | 'selectedChip'|'arrow'|'placeholderText'|'selectedText'|'mainWrapper'|"disableStyle"|"onHoverOption";

const styles:Style={
    label:{
        position: "absolute",
        left: "0.75rem", /* Adjust as needed */
        top:"0.4rem",
        backgroundColor: "white",
        fontSize: "0.9rem", /* Adjust as needed */
        lineHeight:"0.9rem",
        color: "#5f676e",
        border:"none",
        userSelect:"none",
        WebkitUserSelect:"none",
        msUserSelect:"none"
    },
    wrapper:{
        display:"flex",
        flexDirection:"column",
        position: "relative",
        border:"solid 1px lightgray",
        width:"100%",
        borderRadius:"0.25rem",
        boxShadow:"0px 0px 5px rgba(0, 0, 0, 0.1)",
        boxSizing:"border-box",
        padding:"0.5rem 0.75rem",
        marginBottom:"0.5rem"
    },
    selectedWrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"start",
        alignItems:"center",
        width:"100%",
        overflowX:"auto",
        flexWrap:"nowrap",
        userSelect:"none",
        WebkitUserSelect:"none",
        msUserSelect:"none"
    },
    mainWrapper:{
        position:"relative",
        display:"flex",
        flexDirection:"column",
        cursor:"default",
        marginBottom:"0.5em",
    },
    arrow:{
        position:"absolute",
        transform:"translateY(-50%)",
        top:"50%",
        right:"10px",
    },
    optionsWrapper:{
        position:"absolute",
        zIndex:3,
        top:"calc( 101% + 1px )",
        left:0,
        backgroundColor:"white",
        width:"100%",
        borderLeft:"solid 1px lightgray",
        borderBottom:"solid 1px lightgray",
        borderRight:"solid 1px lightgray",
        paddingBottom:"1rem",
        borderBottomLeftRadius:"0.25rem",
        borderBottomRightRadius:"0.25rem",
        display:"flex",
        flexDirection:"column",
        maxHeight:"25em",
        overflowY:"auto",
        boxSizing:"border-box",
        boxShadow:"0px 5px 7px rgba(0, 0, 0, 0.1)"
    },
    option:{
        paddingRight:"1em",
        paddingLeft:"1em",
        paddingTop:"0.2em",
        paddingBottom:"0.2em",
        userSelect:"none",
        WebkitUserSelect:"none",
        msUserSelect:"none",
        backgroundColor:"white"
    },
    onHoverOption:{
        backgroundColor:"lightgray"
    },
    placeholderText:{
        userSelect:"none",
        WebkitUserSelect:"none",
        msUserSelect:"none"
    },
    noOptionsText:{
        marginLeft:"1rem"
    }
    

}
const searchBarStyle:InputStyle<IconDefinition>={
    wrapper:{
        marginLeft:"1em",
        marginRight:"1em",
    }  
};

const Select=<T extends Record<string,any>,Searchable extends boolean = false,SearchIcon extends IconDefinition|undefined=undefined,Multiselect extends boolean=false,Label extends string|undefined=undefined>(props:SelectProps<T,Searchable,SearchIcon,Multiselect,Label>)=>{
    const {searchable,startIndex,label,placeholderText,multiselect,style,onSelect,options,disabled,pattern,selectedPattern}=props;
    let searchBarIcon:IconDefinition|undefined;
    let searchBarLabel:InputLabelProps<"label"|"placeholder">={placement:"placeholder",text:"Vyhledat"};
    let onEmptyUseStartValues:boolean|undefined=false;
    if(searchable){
        searchBarIcon=props.searchBarIcon;
        searchBarLabel=props.searchBarLabel as InputLabelProps<"label"|"placeholder">;;
    }
    if(multiselect){
        onEmptyUseStartValues=props.onEmptyUseStartValues;
    }
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [showOptions,setShowOptions]=useState<boolean>(false);
    const [selectedOptions,setSelectedOptions]=useState<number[]>(startIndex!=undefined&&startIndex!=null?Array.isArray(startIndex)?startIndex:[startIndex as number]:[]);
    const [searchFilter,setSearchFilter]=useState<string>("");
    const wasChanged=useRef<boolean>(false);

    //here make checker for index
    if(options!=null && options!=undefined && options?.length>0 && startIndex!=undefined && startIndex!=null){
        if(Array.isArray(startIndex)){
            startIndex.forEach(index=>{
                if(options.length<=index){
                    throw "Indexes are not valid";
                }
            })
        }else{
            if(options.length<=startIndex){
                throw "Index is not valid";
            }
        }
    }

    const onHover=(e:React.MouseEvent<HTMLDivElement>)=>{
            Object.assign(e.currentTarget.style,{...styles.option,...getStyle("option"),...getStyle("onHoverOption")})
    }
    const onLeave=(e:React.MouseEvent<HTMLDivElement>)=>{
        Object.assign(e.currentTarget.style,{...styles.option,...getStyle("option")})
    }
    

    const makeSelect=(index:number)=>{
        if(!wasChanged.current){
            wasChanged.current=true;
        }
        if(multiselect){
            setSelectedOptions((prevOptions)=>[...prevOptions,index]);
        }
        else{
            setShowOptions(false);
            setSelectedOptions([index]);
        }
    }
    useEffect(()=>{
        if(startIndex!=null&&startIndex!=undefined){
            setSelectedOptions(startIndex!=undefined&&startIndex!=null?Array.isArray(startIndex)?startIndex:[startIndex as number]:[]);
        }
    },[startIndex])
    //dodělat handling když vybíram věci hned se to vypne což je bs
    const handleOutsideClick = (event: MouseEvent) => {
        if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
            const target=event.target as HTMLElement;
            const isOptionWrapper=target.closest("[data-option-wrapper]");
            const isOption=target.closest("[data-option]");
            const isChipIcon=target.closest("[data-chip-icon]");
            if(!isOptionWrapper&&!isOption&&!isChipIcon){
                setShowOptions(false);
                if(multiselect){
                    if(selectedOptions.length<=0&&onEmptyUseStartValues){
                        setSelectedOptions(startIndex!=undefined&&startIndex!=null?Array.isArray(startIndex)?startIndex:[startIndex as number]:[]);
                    }
                }
            }
        }
      };

    useEffect(() => {
        // Add event listener to detect clicks anywhere on the document
        document.addEventListener("click", handleOutsideClick);
    
        // Cleanup the event listener on unmount
        return () => {
          document.removeEventListener("click", handleOutsideClick);
        };
      }, [selectedOptions]);


    useEffect(()=>{
        if(wasChanged.current){
            if(selectedOptions.length>0){
                if(multiselect){
                    selectedOptions.map((index)=>options[index]);
                    (onSelect as (value: JsonObject[]) => void)(selectedOptions.map((index)=>options[index]));
                }
                else{
                    const option:JsonObject= options[selectedOptions[0]];
                    (onSelect as (value:JsonObject)=>void)(option);
                }
            }
            else if(multiselect&&onEmptyUseStartValues&&!showOptions){
                        setSelectedOptions(startIndex!=undefined&&startIndex!=null?Array.isArray(startIndex)?startIndex:[startIndex as number]:[]);
            }
        }
    },[selectedOptions]);



    const removeChip=(index:number)=>{
        setSelectedOptions((prevItems)=>prevItems.filter(item=>item!=index));
    }
    const replaceFields=(index:number,pattern:string)=>{
        const regex = /<field:([\w]+)>/g;
        return pattern.replace(regex,(_,fieldName)=>{
            if(options&&options?.length>0&&options[index]){
                return options[index][fieldName] ||'';
            }
            else{
                return '';
            }
        })
    }
    const getStyle= (key:CustomStyleKey<Searchable,SearchIcon,Multiselect,Label>,localStyleKey?:keyof typeof styles)=>{
        const resolvedKey = (localStyleKey ?? key) as keyof typeof styles & string;
        // Check if the key exists in the styles and style objects
        const baseStyle = styles[resolvedKey] || {};
        const customStyle = style && key in style ? style[key as keyof typeof style] : {};
        return { ...baseStyle, ...customStyle };
    }
    const OnKeyDown=(event:React.KeyboardEvent<HTMLDivElement>)=>{
        if(event.key==="Enter"){
            setShowOptions((prevOptions)=>!prevOptions);
        }
    }
    const HandleEnterOption=(event:React.KeyboardEvent<HTMLDivElement>,index:number)=>{
        if(event.key==="Enter"){
            makeSelect(index);
        }
    }
    const HandleOpen=(e:React.MouseEvent<HTMLDivElement>)=>{
        const target=e.target as HTMLElement;
        const isCloseIcon=target.closest("[data-chip-icon]");
        const isOption=target.closest("[data-option]");
        if(!isCloseIcon&&!isOption){
            if(multiselect&&showOptions){
                if(selectedOptions.length<=0&&onEmptyUseStartValues){
                    setSelectedOptions(startIndex!=undefined&&startIndex!=null?Array.isArray(startIndex)?startIndex:[startIndex as number]:[]);
                }
            }
            setShowOptions((prevOptions)=>!prevOptions);
        }
    }

    return <DisabledOverlay disabled={disabled} style={{...{mainWrapper:{width:"100%"},...getStyle("disableStyle")}}}> 
                <div style={{...getStyle("wrapper"),...(label?{paddingTop:(style as { labelGap?: string })?.labelGap ?? (multiselect?"1.60rem":"1.4rem")}:{})}} ref={elementRef} onClick={disabled?undefined:HandleOpen} onKeyDown={disabled?undefined:OnKeyDown} tabIndex={disabled?undefined:0}>
                    {label
                        ?<span style={getStyle("label" as CustomStyleKey<Searchable,SearchIcon,Multiselect,Label>)}>
                            {label}
                        </span>
                        :null
                    }
                    <div style={getStyle("selectedWrapper")}>
                        {selectedOptions.length>0&&options
                            ?<>
                                {multiselect
                                    ?selectedOptions.map((index)=> <SelectChip data={options[index]} key={index} style={getStyle("selectedChip" as CustomStyleKey<Searchable,SearchIcon,Multiselect,Label>) as SelectChipStyle}  pattern={selectedPattern??pattern} onRemove={()=>removeChip(index)}/>)
                                    :<span style={getStyle("selectedText" as CustomStyleKey<Searchable,SearchIcon,Multiselect,Label>)}>{replaceFields(selectedOptions[0] as number,selectedPattern??pattern)}</span>
                                }
                            </>
                            :<span style={getStyle("placeholderText")}>{placeholderText?placeholderText:(multiselect?"Vyberte Možnosti":"Vyberte Možnost")}</span>
                        }
                    </div>
                    <FontAwesomeIcon icon={showOptions?faCaretDown:faCaretLeft} style={getStyle("arrow")} />
                    {showOptions?
                        <div style={getStyle("optionsWrapper")} data-option-wrapper >
                            {searchable
                                ?<>
                                    <Input icon={searchBarIcon||faSearch} label={searchBarLabel} style={{...searchBarStyle,...(style?("searchBar" in style?style.searchBar:{}):{})}} onChange={(value)=>setSearchFilter(value)} />
                                    <hr style={{marginTop:"0.1em",marginBottom:"0.1em",marginRight:"1em",marginLeft:"1em"}}/>
                                </>
                                :null
                            }
                            {options&&options?.length>0
                                ?<>
                                    {options.map((option,index)=> {
                                            let notContained:boolean=!selectedOptions.includes(index);
                                            let containsSearch:boolean=false;
                                            if(notContained){
                                                Object.values(option).forEach((value)=>{
                                                    if(value){
                                                            if(value.toString().toLowerCase().includes(searchFilter.toLowerCase())){
                                                                containsSearch=true;
                                                            }
                                                        }
                                                    }
                                                );
                                            }
                                            if(notContained&&containsSearch){
                                                return <div style={getStyle("option" )} tabIndex={disabled?undefined:0} onKeyDown={disabled?undefined:(event:React.KeyboardEvent<HTMLDivElement>)=>HandleEnterOption(event,index)} data-option onClick={disabled?undefined:()=>makeSelect(index)} onMouseEnter={onHover} onMouseLeave={onLeave} key={index}>{replaceFields(index,selectedPattern??pattern)}</div>
                                            }
                                        }
                                    )}
                                </>
                                :<span style={getStyle("noOptionsText")}>Položky neexistují</span>
                            }
                        </div>
                        :null
                    }
                </div>
    </DisabledOverlay>;
}

export default Select;