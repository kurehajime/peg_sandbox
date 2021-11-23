const fs = require('fs')
const peggy = require("peggy")

const peg_files = ["./peg/boot.pegjs", "./peg/statement.pegjs", "./peg/core.pegjs"]

let peg_text = ""
for (const peg_file of peg_files) {
    peg_text += fs.readFileSync(peg_file, 'utf8')
}


const parser = peggy.generate(peg_text)
const result = parser.parse('{ "abc":"あいうえお","xyz" :[1,2]}')

console.log(JSON.stringify(result, null, 2))
