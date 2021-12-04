function fuzz_buzz(count) {
    p(count)
    for (var i = 0; i < 10; i++) {
        p(i)
    }
    return 42
}
return fuzz_buzz(10)