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
        this.stack = []
        this.is_return = false
    }
}

class Evaluter {
    Program(env, body) {
        for (const item of body) {
            this.evalute(env, item)
            if (env.is_return) {
                env.is_return = false
                return env.stack.pop
            }
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
    Literal(env, value) {
        return value;
    }
    ExpressionStatement(env, expression) {
        return this.evalute(env, expression)
    }
    BlockStatement(env, body) {
        return this.Program(env, body)
    }
    FunctionBody(env, body) {
        return this.Program(env, body)
    }
    EmptyStatement(env) {
        return
    }
    ReturnStatement(env, argument) {
        return this.evalute(env, argument)
    }


    evalute(env, tree) {
        const type = tree != undefined ? tree.type : ""
        switch (type) {
            case "Program":
                return this.Program(env, tree.body)
            case "FunctionDeclaration":
                return this.FunctionDeclaration(env, tree.id, tree.params, tree.body)
            case "ForStatement":
                return this.ForStatement(env, tree.init, tree.test, tree.update, tree.body)
            case "Literal":
                return this.Literal(env, tree.value)
            case "ExpressionStatement":
                return this.ExpressionStatement(env, tree.expression)
            case "BlockStatement":
                return this.BlockStatement(env, tree.body)
            case "FunctionBody":
                return this.FunctionBody(env, tree.body)
            case "EmptyStatement":
                return this.EmptyStatement(env)
            case "ReturnStatement":
                return this.ReturnStatement(env, tree.argument)
            default:
                console.log(tree)
                break;
        }
    }
}

main();
