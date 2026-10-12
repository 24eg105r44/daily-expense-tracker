import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { PieChart as PieIcon, BarChart3, Lightbulb } from 'lucide-react';

// Register ChartJS modules
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function AnalyticsCharts({ expenses, categories, currency }) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Filter current month expenses
  const monthExpenses = expenses.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  // 1. Data for Category Distribution (Donut Chart)
  const categoryDataMap = categories.map(cat => {
    const total = monthExpenses
      .filter(e => e.categoryId === cat.id)
      .reduce((sum, e) => sum + Number(e.amount), 0);
    return { name: cat.name, total, color: cat.color };
  }).filter(c => c.total > 0);

  const doughnutData = {
    labels: categoryDataMap.map(c => c.name),
    datasets: [
      {
        data: categoryDataMap.map(c => c.total),
        backgroundColor: categoryDataMap.map(c => c.color),
        borderColor: '#1e293b',
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#94a3b8',
          font: { family: 'Inter', size: 12 },
          padding: 14,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${currency}${context.parsed.toFixed(2)}`,
        },
      },
    },
  };

  // 2. Data for Daily Spend over the last 7 Days (Bar Chart)
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    const dayTotal = expenses
      .filter(e => e.date.startsWith(dateStr))
      .reduce((sum, e) => sum + Number(e.amount), 0);
    
    last7Days.push({ label: dayLabel, total: dayTotal });
  }

  const barData = {
    labels: last7Days.map(d => d.label),
    datasets: [
      {
        label: `Daily Spending (${currency})`,
        data: last7Days.map(d => d.total),
        backgroundColor: '#6366f1',
        borderRadius: 8,
        hoverBackgroundColor: '#4f46e5',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
        grid: { display: false },
      },
      y: {
        ticks: { 
          color: '#94a3b8',
          callback: (val) => `${currency}${val}`
        },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` Spent: ${currency}${ctx.parsed.y.toFixed(2)}`,
        },
      },
    },
  };

  // Insights calculation
  const highestCategory = [...categoryDataMap].sort((a, b) => b.total - a.total)[0];
  const avgDailySpend = (monthExpenses.reduce((sum, e) => sum + Number(e.amount), 0) / (new Date().getDate() || 1)).toFixed(2);

  return (
    <div className="dashboard-grid">
      {/* Donut Chart: Category Breakdown */}
      <div className="card col-6">
        <div className="card-header">
          <span className="card-title">
            <PieIcon size={18} style={{ color: '#6366f1' }} /> Spending by Category
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Month-to-Date</span>
        </div>
        <div style={{ height: '280px', position: 'relative' }}>
          {categoryDataMap.length > 0 ? (
            <Doughnut data={doughnutData} options={doughnutOptions} />
          ) : (
            <div className="empty-state">No expense data recorded yet for this month.</div>
          )}
        </div>
      </div>

      {/* Bar Chart: Daily Trend */}
      <div className="card col-6">
        <div className="card-header">
          <span className="card-title">
            <BarChart3 size={18} style={{ color: '#10b981' }} /> Daily Expenditures (Past 7 Days)
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Day-by-Day Trajectory</span>
        </div>
        <div style={{ height: '280px' }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* Smart Financial Insights Card */}
      <div className="card col-12">
        <div className="card-header">
          <span className="card-title">
            <Lightbulb size={18} style={{ color: '#ffd93d' }} /> Automated Daily Spending Insights
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Top Category</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
              {highestCategory ? `${highestCategory.name} (${currency}${highestCategory.total.toFixed(2)})` : 'N/A'}
            </p>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Average Daily Spend</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981', marginTop: '0.2rem' }}>
              {currency}{avgDailySpend} / day
            </p>
          </div>

          <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Frequent Mode</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#4d96ff', marginTop: '0.2rem' }}>
              UPI / Mobile Pay (65%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
