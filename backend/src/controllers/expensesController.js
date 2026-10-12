import { db } from '../data/store.js';

export const getExpenses = (req, res) => {
  try {
    const { categoryId, search, startDate, endDate, limit } = req.query;
    const expenses = db.getExpenses({ categoryId, search, startDate, endDate, limit });
    res.json({ success: true, count: expenses.length, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getExpenseById = (req, res) => {
  try {
    const expense = db.getExpenseById(req.params.id);
    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }
    res.json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createExpense = (req, res) => {
  try {
    const { description, amount, categoryId, paymentMethod, date, merchant, notes, receiptAttached } = req.body;
    if (!description || amount === undefined || amount === null) {
      return res.status(400).json({ success: false, message: 'Description and amount are required' });
    }

    const newExpense = db.addExpense({
      description,
      amount,
      categoryId,
      paymentMethod,
      date,
      merchant,
      notes,
      receiptAttached
    });

    res.status(201).json({ success: true, message: 'Expense created successfully', data: newExpense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateExpense = (req, res) => {
  try {
    const updated = db.updateExpense(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }
    res.json({ success: true, message: 'Expense updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteExpense = (req, res) => {
  try {
    const deleted = db.deleteExpense(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }
    res.json({ success: true, message: 'Expense deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
