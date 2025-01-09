import fs from "node:fs"
import path from "path"


const outputDir = path.resolve('./public/data/__generated__')
const fullDataFilePath = path.resolve('./public/data/raw.json')
const statusCodeImagesDir = path.resolve('./public/status-code-images')
const imageFileNames = fs.readdirSync(statusCodeImagesDir);

type RawData = {
  code: number;
  title: string;
  description: string;
  links: string[];
}

type Data = {
  code: number;
  title: string;
  description: string;
  links: string[];
  images: string[]
}

const rawData = JSON.parse(fs.readFileSync(fullDataFilePath).toString()) as RawData[]

const data = rawData.map((item): Data => {

})

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