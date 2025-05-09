//transform.js- реализовать функцию, которая считывает данные из process.stdin, переворачивает текст с помощью Transform Stream и затем записывает его в process.stdout
import { Transform } from 'stream';
import { pipeline } from 'stream/promises';
const transform = async () => {
        const reverseStream = new Transform({
            transform(chunk,encoding,callback) {
                const reverseChunk = chunk.toString().split('').reverse().join('')
                callback(null, reverseChunk)
            }
        })
       
        try{
            await pipeline(
                process.stdin,
                reverseStream,
                process.stdout
            )
            process
        }catch(error){
            console.error('Operation failed')
        }
}
await transform();