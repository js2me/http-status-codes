import fs from "node:fs"
import path from "path"


const outputDir = path.resolve('./src/entities/status-codes/data/__generated__')
const fullDataFilePath =path.resolve('./src/entities/status-codes/data/full-data.json')

type Data = {
  code: number;
  title: string;
  description: string;
  links: string[];
  images: string[]
}

const data = JSON.parse(fs.readFileSync(fullDataFilePath).toString()) as Data[]

try {
  fs.rmdirSync(outputDir)
  fs.mkdirSync(outputDir)
} catch(_) {}


data.forEach(it => {
  fs.writeFileSync(`${outputDir}/${it.code}.json`, JSON.stringify(it))
})

fs.writeFileSync(`${outputDir}/short-list.json`, JSON.stringify(data.map(it => {

  return {
    title: it.title,
    code: it.code,
    image: it.images[0] ?? undefined,
  }
})))

// data.forEach(it => {
//   fs.writeFileSync(`${outputDir}/${}`)
// })