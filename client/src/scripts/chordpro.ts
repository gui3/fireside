
export interface ChordproElement {
	type: string,
	tag?: string,
	content?: string,
	children: Array<ChordproElement>
}

export function format (type: string, tag: string = "", content: string = "", children: Array<ChordproElement> = []): ChordproElement {
	return {
		type,
		tag,
		content,
		children
	}
}

export function tokenize (text: string): Array<ChordproElement> {
	const regex: RegExp = /([\r\n])|(\[[^\r\n\]]+\])([^\r\n\[]+)?|([^\r\n\[]+)|(.+)/g
	const result: Array<ChordproElement> = []

	let match: RegExpExecArray|null
	while (match = regex.exec(text)) {
		if (match[1]) {
			result.push(format("NEWLINE"))
		}
		else if (match[2]) {
			result.push(format("CHORD-TEXT", match[2], match[3] || ""))
		}
		else {
			result.push(format("PLAIN", "", match[4] || match[5]))
		}
	}

	return result
}

export function lex (cst: Array<ChordproElement>): ChordproElement {
	const result: ChordproElement = format("SONGSHEET")

	let cursor: number = 0
	let buffer: Array<ChordproElement> = []
	let line: ChordproElement = format("LINE")
	let element: ChordproElement
	while (cursor < cst.length) {
		element = cst[cursor]
		
		switch (element.type) {
			case "NEWLINE":
				/*if (line.children.length > 0)*/ result.children.push(line)
				line = format("LINE")
				break
			case "CHORD-TEXT":
			case "PLAIN":
			default:
				line.children.push(element)
				break
		}
		cursor++
	}
	if (line.children.length > 0) result.children.push(line)

	return result
}

export function parse (text: string): ChordproElement {
	return lex(tokenize(text))
}