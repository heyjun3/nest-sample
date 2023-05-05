

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