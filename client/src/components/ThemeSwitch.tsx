import { useState, useEffect } from "react";
import Tool from "./Tool";


export default function ThemeSwitch (props: any) {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        document.body.classList.forEach(classname => {
            if (classname.startsWith("theme-")) {
                document.body.classList.remove(classname)
            }
        })
        document.body.classList.add("theme-" + theme)
    }, [theme])

    return (
        <>
            <Tool action={() => setTheme("light")} name="🔆"/>
            <Tool action={() => setTheme("dark")} name="🌒"/>
            <Tool action={() => setTheme("camper")} name="⛺"/>
        </>
    )
}