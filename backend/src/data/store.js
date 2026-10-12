import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  DEFAULT_CATEGORIES, 
  INITIAL_EXPENSES, 
  INITIAL_RECURRING, 
  SAMPLE_SHARED_SPLITS, 
  PAYMENT_METHODS 
} from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, '../../data/db.json');

class DataStore {
  constructor() {
    this.data = {
      categories: [...DEFAULT_CATEGORIES],
      expenses: [...INITIAL_EXPENSES],
      recurring: [...INITIAL_RECURRING],
      splits: [...SAMPLE_SHARED_SPLITS],
      paymentMethods: [...PAYMENT_METHODS]
    };
    this.loadFromFile();
  }

  loadFromFile() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        this.data = {
          ...this.data,
          ...parsed
        };
      } else {
        this.saveToFile();
      }
    } catch (err) {
      console.warn('[DataStore] Warning loading DB file, falling back to memory seed:', err.message);
    }
  }

  saveToFile() {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[DataStore] Error saving to db.json:', err.message);
    }
  }

  // --- Expenses ---
  getExpenses({ categoryId, search, startDate, endDate, limit } = {}) {
    let list = [...this.data.expenses];

    if (categoryId && categoryId !== 'all') {
      list = list.filter(e => e.categoryId === categoryId);
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(e => 
        (e.description && e.description.toLowerCase().includes(q)) ||
        (e.merchant && e.merchant.toLowerCase().includes(q)) ||
        (e.notes && e.notes.toLowerCase().includes(q))
      );
    }

    if (startDate) {
      const start = new Date(startDate).getTime();
      list = list.filter(e => new Date(e.date).getTime() >= start);
    }

    if (endDate) {
      const end = new Date(endDate).getTime();
      list = list.filter(e => new Date(e.date).getTime() <= end);
    }

    // Sort newest first
    list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (limit && Number(limit) > 0) {
      list = list.slice(0, Number(limit));
    }

    return list;
  }

  getExpenseById(id) {
    return this.data.expenses.find(e => e.id === id) || null;
  }

  addExpense(expense) {
    const newExpense = {
      id: expense.id || `exp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      description: expense.description || 'Untitled Expense',
      merchant: expense.merchant || 'General',
      amount: Number(expense.amount) || 0,
      categoryId: expense.categoryId || 'cat-8',
      paymentMethod: expense.paymentMethod || 'cash',
      date: expense.date || new Date().toISOString(),
      notes: expense.notes || '',
      receiptAttached: Boolean(expense.receiptAttached)
    };
    this.data.expenses.unshift(newExpense);
    this.saveToFile();
    return newExpense;
  }

  updateExpense(id, updates) {
    const idx = this.data.expenses.findIndex(e => e.id === id);
    if (idx === -1) return null;

    this.data.expenses[idx] = {
      ...this.data.expenses[idx],
      ...updates,
      id // preserve original id
    };
    this.saveToFile();
    return this.data.expenses[idx];
  }

  deleteExpense(id) {
    const idx = this.data.expenses.findIndex(e => e.id === id);
    if (idx === -1) return false;
    this.data.expenses.splice(idx, 1);
    this.saveToFile();
    return true;
  }

  // --- Categories ---
  getCategories() {
    return this.data.categories;
  }

  updateCategory(id, updates) {
    const idx = this.data.categories.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.data.categories[idx] = {
      ...this.data.categories[idx],
      ...updates,
      id
    };
    this.saveToFile();
    return this.data.categories[idx];
  }

  // --- Recurring ---
  getRecurring() {
    return this.data.recurring;
  }

  addRecurring(item) {
    const newItem = {
      id: item.id || `rec-${Date.now()}`,
      title: item.title || 'Untitled Bill',
      amount: Number(item.amount) || 0,
      categoryId: item.categoryId || 'cat-4',
      frequency: item.frequency || 'Monthly',
      dueDate: Number(item.dueDate) || 1,
      autoPost: Boolean(item.autoPost),
      lastLogged: item.lastLogged || new Date().toISOString()
    };
    this.data.recurring.push(newItem);
    this.saveToFile();
    return newItem;
  }

  updateRecurring(id, updates) {
    const idx = this.data.recurring.findIndex(r => r.id === id);
    if (idx === -1) return null;
    this.data.recurring[idx] = {
      ...this.data.recurring[idx],
      ...updates,
      id
    };
    this.saveToFile();
    return this.data.recurring[idx];
  }

  deleteRecurring(id) {
    const idx = this.data.recurring.findIndex(r => r.id === id);
    if (idx === -1) return false;
    this.data.recurring.splice(idx, 1);
    this.saveToFile();
    return true;
  }

  // --- Splits ---
  getSplits() {
    return this.data.splits;
  }

  addSplit(split) {
    const newSplit = {
      id: split.id || `split-${Date.now()}`,
      title: split.title || 'Untitled Split',
      totalAmount: Number(split.totalAmount) || 0,
      paidBy: split.paidBy || 'Alex (You)',
      date: split.date || new Date().toISOString(),
      members: Array.isArray(split.members) ? split.members : []
    };
    this.data.splits.unshift(newSplit);
    this.saveToFile();
    return newSplit;
  }

  updateSplit(id, updates) {
    const idx = this.data.splits.findIndex(s => s.id === id);
    if (idx === -1) return null;
    this.data.splits[idx] = {
      ...this.data.splits[idx],
      ...updates,
      id
    };
    this.saveToFile();
    return this.data.splits[idx];
  }

  deleteSplit(id) {
    const idx = this.data.splits.findIndex(s => s.id === id);
    if (idx === -1) return false;
    this.data.splits.splice(idx, 1);
    this.saveToFile();
    return true;
  }

  // --- Payment Methods ---
  getPaymentMethods() {
    return this.data.paymentMethods;
  }

  // --- Reset to seed ---
  resetData() {
    this.data = {
      categories: [...DEFAULT_CATEGORIES],
      expenses: [...INITIAL_EXPENSES],
      recurring: [...INITIAL_RECURRING],
      splits: [...SAMPLE_SHARED_SPLITS],
      paymentMethods: [...PAYMENT_METHODS]
    };
    this.saveToFile();
    return this.data;
  }
}

export const db = new DataStore();
