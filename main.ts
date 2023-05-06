

const lst = [1, 2, 3, 4]
for (const i of lst) {
    console.log(i)
}

lst.forEach((i) => {
    console.log(i)
})

lst.map((i) => {
    console.log(i * i)
})

const l = lst.filter((i) => {
    return i % 2
})

console.log(l)
console.log(lst)


function isObject(value: unknown): value is object {
    return typeof value === "object" && value !== null
}

const v: unknown = {a: 1, b: 2}

if (isObject(v)) {
    console.log(Object.keys(v))
}

function* generateNumbers() {
    for(let i = 0; i < 10; i++){
        yield i
    }
}

for (const v of generateNumbers()) {
    console.log(v)
}