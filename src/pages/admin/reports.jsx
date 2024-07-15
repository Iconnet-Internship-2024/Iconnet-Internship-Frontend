import React, { useEffect, useState } from "react";

export default function Reports({setShowHeaderFooter}){
    useEffect(() => {
        setShowHeaderFooter(false);
      }, []);

    return(<div> tes ini reports</div>)
}