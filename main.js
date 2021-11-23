const fs = require('fs')
const peggy = require("peggy")

const peg_file = "./peg/peg.pegjs"
const peg_text = fs.readFileSync(peg_file, 'utf8')
const parser = peggy.generate(peg_text)
const result = parser.parse('{"abc":"あいうえお","xyz":[1,2]}')

console.log(JSON.stringify(result, null, 2))
