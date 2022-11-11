class ChordproToken {
    constructor(type, content) {

    }
}

class ChordproSheet {
    constructor (text) {
        this.raw = text

        this._parse(text)
    }

    hydrate (element) {
        console.log("parsing...")
        while (element.firstChild) element.removeChild(element.firstChild)

        let cursor = 0
        let line = document.createElement("div")
        line.classList.add("line")
        function endline () {
            element.appendChild(line)
            line = document.createElement("div")
            line.classList.add("line")
        }
        function createChord (symbol, previousToken) {
            const spot = document.createElement("span")
            spot.classList.add("chord-spot")
            const name = document.createElement("span")
            name.classList.add("chord-symbol")
            name.appendChild(document.createTextNode(symbol))
            spot.appendChild(name)
            if (
                (nextToken && nextToken.type ==="CHORD"
                    || (nextToken.type === "TEXT"
                    && nextToken.content.replace(/\s/g, "").length === 0))
                || !previousToken
                || previousToken.type === "CHORD" 
                || previousToken.type === "TEXT" 
                    && previousToken.content.replace(/\s/g, "").length === 0
                || previousToken.type === "NEWLINE"
            ) spot.classList.add("nolyric")
            return spot
        }
        const getNextToken = () => {
            if (cursor + 1 < this.tokens.length) 
                return this.tokens[cursor + 1]
            else return null
        }
        let previousToken = null
        let nextToken = getNextToken()
        let spacer = false
        while (cursor < this.tokens.length) {
            const token = this.tokens[cursor]

            switch (token.type) {
                case "SPACER":
                    spacer = true
                case "TEXT":
                    const text = document.createElement("span")
                    text.classList.add("lyric")
                    if (spacer) {
                        text.classList.add("spacer")
                        spacer = false
                    }
                    text.appendChild(document.createTextNode(token.content))
                    line.appendChild(text)
                    break
                case "NEWLINE":
                    endline()
                    break
                case "CHORD":
                    line.appendChild(createChord(token.content, previousToken))
                    break
                default:
                    console.log("unknown token")
                    break
            }
            previousToken = token
            cursor++
        }
        endline()
    }

    _parse (text) {
        const tokens = []
        const state = {buffer: "", type: "TEXT", lineIndex: 0}
        function store () {
            //if (!(state.buffer.length === 0 && state.type !== "NEWLINE")) {
                tokens.push({
                    type: state.type || "TEXT",
                    content: state.buffer
                })
                state.buffer = ""
            //}
        }
        let cursor = 0
        while (cursor < text.length) {
            const char = text[cursor]
            
            switch (char) {
                case "\n":
                    if (["TEXT"].includes(state.type)) {
                        store()
                        state.type = "NEWLINE"
                        store()
                        state.type = "TEXT"
                        state.begin = 1
                    }
                    break
                case "[":
                    if (["TEXT"].includes(state.type)) {
                        
                        if (//state.type === "NONE" || (state.type === "TEXT" && state.buffer.match(/^\s*$/))) {
                            state.type === "TEXT" 
                            && state.buffer.replace(/\s/g, "").length < 4
                            && state.lineIndex !== 0
                        ) {
                            state.type = "SPACER"
                        }
                        store()
                        state.type = "CHORD"
                    }
                    else {
                        state.buffer += char
                    }
                    break
                case "]":
                    if (state.type === "CHORD") {
                        store()
                        state.type = "TEXT"
                    }
                    else {
                        state.buffer += char
                    }
                    break
                default:
                    state.buffer += char
                    //if (["BEGIN", "NONE"].includes(state.type)) state.type = "TEXT"
                    break
            }
            state.lineIndex++
            cursor++
        }
        store()
        this.tokens = tokens
    }
}

function load (text) {
    return new ChordproSheet(text)
}