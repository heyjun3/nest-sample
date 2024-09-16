import * as fs from 'fs'
import * as stream from 'stream'

const writeStream = () => {
    const st = new stream.Duplex({
        write(data, _encoding, next) {
            console.warn(data)
            next();
        },
        read() {
            this.push('test')
        }
    })
    st.write('aaaa')
    st.on('data', (chunk) => console.warn(Buffer.from(chunk).toString()))
}

const readFileStream = () => {
    const src = fs.createReadStream('schema.gql', { encoding: 'utf-8', highWaterMark: 10})
    src.on('data', (chunk) => process.stdout.write('data' + chunk))
}
const main = async () => {
    // readFileStream()
    writeStream();
}

main();
