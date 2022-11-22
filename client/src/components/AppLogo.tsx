// import AppLogoSvg from '../../../global/logos/AppLogoSvg';

function AppLogo(props: any) {

	const size: string = props.size || "5em"

	return (
		<span
		className={"AppLogo" + (props.dynamic ? " dynamic" : "")}
		style={{ width: size, height: size }}>
			Logo
		</span>
	)
}

export default AppLogo
