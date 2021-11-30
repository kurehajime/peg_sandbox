const fs = require('fs')
const peggy = require("peggy")
const peg_files = ["./peggy_example/js.pegjs"]
function main() {
    let peg_text = ""
    for (const peg_file of peg_files) {
        peg_text += fs.readFileSync(peg_file, 'utf8') + "\n"
    }


    const parser = peggy.generate(peg_text)
    const parsed = parser.parse(fs.readFileSync("./codo.js", 'utf8'))
    const evaluter = new Evaluter()
    evaluter.evalute(new Env(), parsed)
    //console.log(JSON.stringify(result, null, 2))

}
class Function {
    constructor(_name, _body) {
        this.name = _name
        this.body = _body
    }
}
class Env {
    constructor() {
        this.functions = {}
        this.local = {}
        this.gloval = {}
    }
}

class Evaluter {
    Program(env, body) {
        for (const item of body) {
            this.evalute(env, item)
        }
    }
    FunctionDeclaration(env, id, params, body) {
        env.functions[id] = new Function(id, body)
    }
    ForStatement(env, init, test, update, body) {
        this.evalute(env, init)
        while (this.evalute(env, test)) {
            this.evalute(env, body)
            this.evalute(env, update)
        }
    }

    evalute(env, tree) {
        const type = tree != undefined ? tree.type : ""
        switch (type) {
            case "Program":
                this.Program(env, tree.body)
                break;
            case "FunctionDeclaration":
                this.FunctionDeclaration(env, tree.id, tree.params, tree.body)
                break;
            case "ForStatement":
                this.ForStatement(env, tree.init, tree.test, tree.update, tree.body)
                break;
            default:
                console.log(tree)
                break;
        }
    }
}

main();
