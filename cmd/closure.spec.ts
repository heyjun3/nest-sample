
test('closure', () => {
    const count = 1_000_000
    const m = new Map<number, string>()
    for (let i = 0; i < count; i++) {
        m.set(i, `${i}`)
    }

    const getStr = (num: number[]) => {
        return num.map((n) => m.get(n))
    }
    const getStrV2 = ((m: Map<number, string>) => (num: number[]) => {
        return num.map((n) => m.get(n))
    })(m)

    const numbers: number[] = []
    for (let i = 0; i < count; i++) {
        numbers.push(i)
    }

    let start = Date.now()
    console.warn('start')
    getStr(numbers)
    console.warn('end', Date.now() - start)

    start = Date.now()
    console.warn('start')
    getStrV2(numbers)
    console.warn('end', Date.now() - start)
})