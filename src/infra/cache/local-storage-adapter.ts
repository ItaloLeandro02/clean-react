import { SetStorage } from '@/data/protocols/cache/set-storage'

export class LocalStorageAdpater implements SetStorage {
  async set (key: string, value: any): Promise<void> {
    localStorage.setItem(key, value)
  }
}
