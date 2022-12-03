import IconAppLogo from "../icons/icon_applogo"


function AppLogo(props: any) {

	const size: string = props.size || "5em"

	return (
		<span
		className={"AppLogo inline-icon" + (props.dynamic ? " dynamic" : "")}
		style={{ width: size, height: size}}>
			<IconAppLogo/>
		</span>
	)
}

export default AppLogo
