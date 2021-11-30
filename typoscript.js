const fs = require('fs')
const peggy = require("peggy")
const peg_files = ["./peggy_example/js.pegjs"]
function main() {
    let peg_text = ""
    for (const peg_file of peg_files) {
        peg_text += fs.readFileSync(peg_file, 'utf8') + "\n"
    }


    const parser = peggy.generate(peg_text)
    const parsed = parser.parse(fs.readFileSync("./codo.txt", 'utf8'))
    const evaluter = new Evaluter()
    evaluter.evalute(parsed)
    //console.log(JSON.stringify(result, null, 2))

}
class Function {
    constructor(_name, _body) {
        this.name = _name
        this.body = _body
    }
}

class Evaluter {
    constructor() {
        this.functions = {}
    }

    Program(body) {
        for (const item of body) {
            this.evalute(item)
        }
    }
    FunctionDeclaration(id, params, body) {
        this.functions[id] = new Function(id, body)
    }

    evalute(tree) {
        const type = tree != undefined ? tree.type : ""
        switch (type) {
            case "Program":
                this.Program(tree.body)
                break;
            case "FunctionDeclaration":
                this.FunctionDeclaration(tree.id, tree.params, tree.body)
                break;
            default:
                console.log(tree)
                break;
        }
    }
}

main();
