import { Link } from "react-router-dom"

export default function Tool (props: any) {

    const button = (
        <button className={"tool " + props.style || ""}
        onClick={props.action}
        disabled={props.disabled}>
            {props.children || props.name}
        </button>
    )

    if (props.disabled || !props.url) {
        return button
    }
    else {
        return <Link to={props.url}>{button}</Link>
    }
}