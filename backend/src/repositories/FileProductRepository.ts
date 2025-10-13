import { ProductRepositoryInterface } from "../interfaces/ProductRepositoryInterface";
import { TrackedProduct } from '../types/product_type';
import fs from 'fs/promises'
import path from 'path'

export class FileProductRepository implements ProductRepositoryInterface {
    private readonly dataPath = 'data/history';

    async getAllTrackedProducts(): Promise<TrackedProduct[]> {
        try {
            const files = await fs.readdir(this.dataPath)

            //Promise.all to read all files in parallel
            const fileContents = await Promise.all(files.map(
                file => fs.readFile(path.join(this.dataPath, file), 'utf-8')
            ));
            
            //Convert file content to JSON
            return fileContents.map(fileContent => JSON.parse(fileContent))
        } catch (err) {
            console.error('Error reading the file:', err)
            return [];
        } 
    }




}