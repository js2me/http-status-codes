import fs from 'node:fs';
import path from 'node:path';

const outputDir = path.resolve(import.meta.dirname, '../public/data');
const statusCodeImagesDir = path.resolve('./public/status-code-images');
const allImageFileNames = fs.readdirSync(statusCodeImagesDir);
const statusCodeJsonsDir = path.resolve(
  import.meta.dirname,
  './status-code-jsons',
);
const allStatusCodesFileNames = fs.readdirSync(statusCodeJsonsDir);

type RawData = {
  code: number;
  title: string;
  description: string;
  links: string[];
};

type Data = {
  code: number;
  title: string;
  description: string;
  links: string[];
  images: string[];
};

try {
  fs.rmdirSync(outputDir);
  fs.mkdirSync(outputDir);
} catch {
  /* empty */
}

const data = allStatusCodesFileNames.map((statusCodeFileName): Data => {
  const rawData = JSON.parse(
    fs.readFileSync(`${statusCodeJsonsDir}/${statusCodeFileName}`).toString(),
  ) as RawData;
  const imageFileNames = allImageFileNames.filter((fileName) =>
    fileName.startsWith(`${rawData.code}-`),
  );
  const data: Data = {
    ...rawData,
    images: imageFileNames.map((fileName) => `/status-code-images/${fileName}`),
  };

  fs.writeFileSync(`${outputDir}/${data.code}.json`, JSON.stringify(data));

  return data;
});

fs.writeFileSync(
  `${outputDir}/short-list.json`,
  JSON.stringify(
    data.map((it) => {
      return {
        title: it.title,
        code: it.code,
        image: it.images[0] ?? undefined,
      };
    }),
  ),
);
