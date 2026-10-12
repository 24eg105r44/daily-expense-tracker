import { db } from '../data/store.js';

export const getStatsSummary = (req, res) => {
  try {
    const expenses = db.getExpenses();
    const categories = db.getCategories();

    // Total spent
    const totalSpent = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

    // Spend by category
    const categorySpending = {};
    categories.forEach(cat => {
      categorySpending[cat.id] = {
        id: cat.id,
        name: cat.name,
        color: cat.color,
        limit: cat.limit,
        spent: 0
      };
    });

    expenses.forEach(e => {
      if (categorySpending[e.categoryId]) {
        categorySpending[e.categoryId].spent += Number(e.amount) || 0;
      }
    });

    const categoryBreakdown = Object.values(categorySpending).map(item => ({
      ...item,
      percentage: totalSpent > 0 ? ((item.spent / totalSpent) * 100).toFixed(1) : 0,
      overBudget: item.spent > item.limit
    }));

    // Recent 7 days spending
    const now = new Date();
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayStr = d.toISOString().split('T')[0];
      const dayTotal = expenses
        .filter(e => e.date && e.date.startsWith(dayStr))
        .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
      last7Days.push({ date: dayStr, total: dayTotal });
    }

    res.json({
      success: true,
      data: {
        totalSpent: Number(totalSpent.toFixed(2)),
        totalTransactions: expenses.length,
        categoryBreakdown,
        last7Days
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
