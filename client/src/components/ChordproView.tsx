import { ReactElement, useEffect, useState } from "react";
import { parse, ChordproElement } from "../scripts/chordpro";

export function render (element: ChordproElement): ReactElement<any> {
	switch (element.type) {
		case "LINE":
			return (
				<div className="chordpro line">
					{element.children.map(render)}
				</div>
			)
		case "CHORD-TEXT":
			return (
				<span className="chordpro chordsection">
					<div className="chordpro chord">
						{element.tag}
					</div>
					<div className="chordpro text">
						{element.content}
					</div>
				</span>
			)
		case "PLAIN":
			return (
				<span className="chordpro text">
					{element.content}
				</span>
			)
		case "SONGSHEET":
			return (
				<div className="chordpro song">
					{element.children.map(render)}
				</div>
			)
		default:
			return (
				<div className="chordpro unknown">
					{element.type}
					{element.tag}
					{element.content}
					{element.children.map(render)}
				</div>
			)
	}
}

export default function ChordproView (props: any) {
	const [chordproScript, setChorproScript] = useState(props.text)

	useEffect(() => {
		setChorproScript(props.text)
	}, [props.text])

	const songAst: ChordproElement = parse(chordproScript)

	return render(songAst)
}