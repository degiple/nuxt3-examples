import { PrismaClient } from "@prisma/client"
import fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient()

async function main() {
    const results = [];

    fs.createReadStream('path_to_your_csv_file.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            // CSVデータの解析が終わったら、Prismaを使ってデータベースにデータを挿入します
            for (const result of results) {
                await prisma.user.create({
                    data: {
                        name: result.name,
                        email: result.email,
                    },
                });
            }

            await prisma.$disconnect()
        });
}

main()
    .catch(e => {
        throw e
    })
