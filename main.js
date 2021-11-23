const fs = require('fs')
const peggy = require("peggy")

const peg_file = "./peggy_example/arithmetics.pegjs"
const peg_text = fs.readFileSync(peg_file, 'utf8')
const parser = peggy.generate(peg_text)
const result = parser.parse("2 * (3 + 4)")

console.log(result)
