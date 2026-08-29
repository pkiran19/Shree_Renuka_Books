import { Item } from './types';
import { INITIAL_ITEMS } from './initial-data';

const STORAGE_KEY = 'shree_renuka_bookstore_inventory_v1';
const EVENT_NAME = 'shree_renuka_inventory_changed';

// In-memory fallback for server-side rendering or initial hydration
let memoryItems: Item[] = [...INITIAL_ITEMS];

export function getStoredItems(): Item[] {
  if (typeof window === 'undefined') {
    return memoryItems;
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ITEMS));
      memoryItems = [...INITIAL_ITEMS];
      return memoryItems;
    }
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      memoryItems = parsed;
      return parsed;
    }
  } catch (err) {
    console.error('Failed to load items from storage:', err);
  }

  return memoryItems;
}

export function saveStoredItems(items: Item[]): void {
  memoryItems = [...items];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: items }));
    } catch (err) {
      console.error('Failed to save items to storage:', err);
    }
  }
}

export function subscribeToInventory(callback: (items: Item[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<Item[]>;
    callback(customEvent.detail || getStoredItems());
  };

  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', () => {
    callback(getStoredItems());
  });

  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', () => {});
  };
}

export function getItemById(id: string): Item | undefined {
  const items = getStoredItems();
  return items.find((item) => item.id === id);
}

export function addItem(itemData: Omit<Item, 'id' | 'createdAt'>): Item {
  const items = getStoredItems();
  const newItem: Item = {
    ...itemData,
    id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };

  const updatedList = [newItem, ...items];
  saveStoredItems(updatedList);
  return newItem;
}

export function updateItem(id: string, updates: Partial<Item>): Item | null {
  const items = getStoredItems();
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return null;

  const updatedItem: Item = {
    ...items[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  const updatedList = [...items];
  updatedList[index] = updatedItem;
  saveStoredItems(updatedList);
  return updatedItem;
}

export function deleteItem(id: string): boolean {
  const items = getStoredItems();
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length) return false;

  saveStoredItems(filtered);
  return true;
}

export function toggleStock(id: string): Item | null {
  const item = getItemById(id);
  if (!item) return null;
  return updateItem(id, { inStock: !item.inStock });
}

export function toggleNewArrival(id: string): Item | null {
  const item = getItemById(id);
  if (!item) return null;
  return updateItem(id, { isNewArrival: !item.isNewArrival });
}

export function resetToDefaults(): Item[] {
  saveStoredItems(INITIAL_ITEMS);
  return INITIAL_ITEMS;
}
