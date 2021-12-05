function fizz_buzz(count) {
    for (var i = 1; i <= count; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            p("FizzBuzz")
        } else if (i % 3 === 0) {
            p("Fizz")
        } else if (i % 5 === 0) {
            p("Buzz")
        } else {
            p(i)
        }
    }
}
var a = 1
a = 2
return fizz_buzz(5)
