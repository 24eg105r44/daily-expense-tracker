import { db } from '../data/store.js';

export const getRecurring = (req, res) => {
  try {
    const list = db.getRecurring();
    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createRecurring = (req, res) => {
  try {
    const { title, amount, categoryId, frequency, dueDate, autoPost } = req.body;
    if (!title || amount === undefined || amount === null) {
      return res.status(400).json({ success: false, message: 'Title and amount are required' });
    }

    const item = db.addRecurring({
      title,
      amount,
      categoryId,
      frequency,
      dueDate,
      autoPost
    });

    res.status(201).json({ success: true, message: 'Recurring expense added', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRecurring = (req, res) => {
  try {
    const updated = db.updateRecurring(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Recurring expense not found' });
    }
    res.json({ success: true, message: 'Recurring expense updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteRecurring = (req, res) => {
  try {
    const deleted = db.deleteRecurring(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Recurring expense not found' });
    }
    res.json({ success: true, message: 'Recurring expense deleted', id: req.params.id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
