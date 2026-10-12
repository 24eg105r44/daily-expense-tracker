import { db } from '../data/store.js';

export const getSplits = (req, res) => {
  try {
    const splits = db.getSplits();
    res.json({ success: true, count: splits.length, data: splits });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSplit = (req, res) => {
  try {
    const { title, totalAmount, paidBy, date, members } = req.body;
    if (!title || totalAmount === undefined || totalAmount === null) {
      return res.status(400).json({ success: false, message: 'Title and totalAmount are required' });
    }

    const split = db.addSplit({
      title,
      totalAmount,
      paidBy,
      date,
      members
    });

    res.status(201).json({ success: true, message: 'Split group created', data: split });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSplit = (req, res) => {
  try {
    const updated = db.updateSplit(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Split group not found' });
    }
    res.json({ success: true, message: 'Split group updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSplit = (req, res) => {
  try {
    const deleted = db.deleteSplit(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Split group not found' });
    }
    res.json({ success: true, message: 'Split group deleted', id: req.params.id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
