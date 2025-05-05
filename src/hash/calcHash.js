//calcHash.js- реализовать функцию, которая вычисляет хэш SHA256 для файла fileToCalculateHashFor.txt и записывает его в консоль как  hex
import { access, createReadStream } from 'fs';
import { createHash } from 'crypto'
import path from 'path';
import { fileURLToPath } from 'url';
const calculateHash = async () => {

    const __filename = fileURLToPath(import.meta.url)
    const __dirname =  path.dirname(__filename)
    const pathToFile = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt')
    const hash = createHash('SHA256')
    
    try{
       const stream = createReadStream(pathToFile)

       for await(const chunk of stream){
        hash.update(chunk)
       }
       
       const hexHash = hash.digest('hex')
       console.log(`hash for ${pathToFile}: ${hexHash}`)
       return hexHash

    }catch (err){
        if(err.code === 'ENOENT'){
            console.error('file does not exist')
        }else{
            throw new Error('FS operation is failed')
        }
    }
};

await calculateHash();