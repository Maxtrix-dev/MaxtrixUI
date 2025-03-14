import React, { CSSProperties } from "react";

export type DisabledOverlayStyle={
    mainWrapper?:CSSProperties,
    disableOverlay?:CSSProperties,
}

type DisabledOverlayProps={
    children:React.ReactNode;
    disabled?:boolean;
    style?:DisabledOverlayStyle,
}
const styles:Style={
    mainWrapper:{
        position:"relative",
        display:"inline-block"
    },
    disableOverlay:{
        position:"absolute",
        top:0,
        left:0,
        width:"100%",
        height:"100%",
        backgroundColor:'rgba(255, 255, 255, 0.6)',
        zIndex:"10",
        pointerEvents:"none",
    }
}

const DisabledOverlay=({children,disabled=false,style}:DisabledOverlayProps)=>{
    return <div style={{...styles.mainWrapper,...(style?(style.mainWrapper??{}):{})}}>
        {children}
        {disabled &&
        <div style={{...styles.disableOverlay,...(style?(style.disableOverlay??{}):{})}}>

        </div>
        }
    </div>

}
export default DisabledOverlay;