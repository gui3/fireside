class Constant {}
const EOF = new Constant()
const EOL = new Constant()

class Parser {
    constructor (raw) {
        if (raw) this.load(raw)
        else this.raw = ""
        this.reset()
    }

    load (raw) {
        this.raw = raw
    }

    reset () {
        this.lookahead = 0
        this.index = 0
        this.consumable = raw
    }

    peek () {
        this.lookahead++
        if (this.lookahead >= this.consumable.length) return EOF
        return this.consumable.slice(0, this.lookahead)
    }

    consume () {
        return this.consumable.splice(0, this.lookahead)
    }
}