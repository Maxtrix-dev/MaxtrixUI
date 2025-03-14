import React, { CSSProperties } from "react";

declare global{
    interface JsonObject{
        [key:string]:any;
    }
    interface Style{
        [key:string]:CSSProperties;
    }
}