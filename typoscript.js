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
    const env = new Env()
    result = evaluter.evalute(env, parsed)
    console.log(result)
    console.log(env)
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
        this.result = null
        this.is_return = false
    }
}

class Evaluter {
    Identifier(env, name) {
        return name
    }

    Program(env, body) {
        for (const item of body) {
            this.evalute(env, item)
            if (env.is_return) {
                env.is_return = false
                return env.result
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
        env.result = this.evalute(env, argument)
        env.is_return = true
    }
    IfStatement(env, test, consequent, alternate) {
        let result = this.evalute(env, test)
        if (result) {
            this.evalute(env, consequent)
        } else if (alternate) {
            this.evalute(env, alternate)
        }
    }
    WhileStatement(env, test, body) {
        while (this.evalute(env, test)) {
            this.evalute(env, body)
        }
    }
    VariableDeclaration(env, declarations, kind) {
        for (const item of declarations) {
            this.evalute(env, item)
        }
    }
    VariableDeclarator(env, id, init) {
        env.local[this.evalute(env, id)] = this.evalute(env, init)
    }
    ArrayExpression(env, elements) {
        elements.map((x) => {
            return this.evalute(env, x)
        })
    }
    UnaryExpression(env, operator, argument, prefix) {
        switch (operator) {
            case "+":
                return this.evalute(env, argument)
            case "-":
                return -1 * this.evalute(env, argument)
            case "!":
                return !this.evalute(env, argument)
            default:
                this.evalute(env, argument)
        }
    }
    UpdateExpression(env, operator, argument, prefix) {
        switch (operator) {
            case "++":
                if (argument.type === 'Identifier') {
                    return env.local[argument.name]++
                }
            case "--":
                if (argument.type === 'Identifier') {
                    return env.local[argument.name]--
                }
            default:
                this.evalute(env, argument)
        }
    }
    CallExpression(env, callee, _arguments) {
        let fn = this.evalute(env, callee)
        let args = _arguments.map((x) => {
            if (x.type === "Identifier") {
                return env.local[this.evalute(env, x)]
            }
            return this.evalute(env, x)
        })
        if (fn === "p") {
            console.log(args)
        }
    }
    BinaryExpression(env, operator, left, right) {
        let op = operator
        let l = this.evalute(env, left)
        let r = this.evalute(env, right)

        switch (op) {
            case "==":
                return l == r
            case "!=":
                return l != r
            case "===":
                return l === r
            case "!==":
                return l !== r
            case "<":
                return l < r
            case "<=":
                return l <= r
            case ">":
                return l > r
            case ">=":
                return l >= r
            case "<<":
                return l << r
            case ">>":
                return l >> r
            case ">>":
                return l >> r
            case ">>>":
                return l >>> r
            case "+":
                return l + r
            case "-":
                return l - r
            case "*":
                return l * r
            case "/":
                return l / r
            case "%":
                return l % r
            case "|":
                return l | r
            case "^":
                return l ^ r
            case "&":
                return l & r
            case "in":
                return l in r
            case "instanceof":
                return l instanceof r
            default:
                break;
        }
    }

    evalute(env, tree) {
        if (tree == undefined || tree.type == undefined) {
            return tree
        }
        const type = tree.type
        switch (type) {
            case "Identifier":
                return this.Identifier(env, tree.name)
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
            case "IfStatement":
                return this.IfStatement(env, tree.test, tree.consequent, tree.alternate)
            case "WhileStatement":
                return this.WhileStatement(env, tree.test, tree.body)
            case "VariableDeclaration":
                return this.VariableDeclaration(env, tree.declarations, tree.kind)
            case "VariableDeclarator":
                return this.VariableDeclarator(env, tree.id, tree.init)
            case "ArrayExpression":
                return this.ArrayExpression(env, tree.elements)
            case "UnaryExpression":
                return this.UnaryExpression(env, tree.operator, tree.argument, tree.prefix)
            case "UpdateExpression":
                return this.UpdateExpression(env, tree.operator, tree.argument, tree.prefix)
            case "CallExpression":
                return this.CallExpression(env, tree.callee, tree.arguments)
            case "BinaryExpression":
                return this.BinaryExpression(env, tree.operator, tree.left, tree.right)
            default:
                console.log(tree)
                break;
        }
    }
}

main();
