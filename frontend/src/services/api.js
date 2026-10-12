// API Client for Daily Expense Tracker Frontend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.isBackendAvailable = false;
  }

  async checkHealth() {
    try {
      const res = await fetch(`${this.baseUrl}/health`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        this.isBackendAvailable = true;
        return true;
      }
    } catch {
      this.isBackendAvailable = false;
    }
    return false;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    try {
      const res = await fetch(url, { ...options, headers });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.warn(`[ApiService] Request to ${endpoint} failed:`, err.message);
      throw err;
    }
  }

  // --- Expenses ---
  async getExpenses(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/expenses?${query}` : '/expenses';
    return this.request(endpoint);
  }

  async createExpense(expense) {
    return this.request('/expenses', {
      method: 'POST',
      body: JSON.stringify(expense)
    });
  }

  async updateExpense(id, updates) {
    return this.request(`/expenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  async deleteExpense(id) {
    return this.request(`/expenses/${id}`, {
      method: 'DELETE'
    });
  }

  // --- Categories ---
  async getCategories() {
    return this.request('/categories');
  }

  async updateCategory(id, updates) {
    return this.request(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  // --- Recurring ---
  async getRecurring() {
    return this.request('/recurring');
  }

  async createRecurring(item) {
    return this.request('/recurring', {
      method: 'POST',
      body: JSON.stringify(item)
    });
  }

  async deleteRecurring(id) {
    return this.request(`/recurring/${id}`, {
      method: 'DELETE'
    });
  }

  // --- Splits ---
  async getSplits() {
    return this.request('/splits');
  }

  async createSplit(split) {
    return this.request('/splits', {
      method: 'POST',
      body: JSON.stringify(split)
    });
  }

  // --- Stats Summary ---
  async getStats() {
    return this.request('/stats/summary');
  }
}

export const api = new ApiService(API_BASE_URL);
