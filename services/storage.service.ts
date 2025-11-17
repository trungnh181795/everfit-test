import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const DATA_DIR = join(process.cwd(), 'data')

/**
 * Storage Service
 * Handles data storage and retrieval operations.
 */

const read = async <T>(fileName: string): Promise<T> => {
  const filePath = join(DATA_DIR, fileName)
  const data = await readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

const write = async <T>(fileName: string, data: T): Promise<void> => {
  const filePath = join(DATA_DIR, fileName)
  await writeFile(filePath, JSON.stringify(data, null, 2))
}

export const storageService = {
  read,
  write,
}
