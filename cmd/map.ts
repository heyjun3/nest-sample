

const main = async () => {
    const map = new Map<string, { id: string, name: string}>()
    for (let i = 0; i < 100; i++) {
        map.set(i.toString(), { id: i.toString(), name: "name" + i.toString()})
    }

    const fix = map.get('50')
    if (!fix) {
        throw Error()
    }
    fix.name = "test50"

    const n = map.get('50')
    console.warn(n)
}

main();
