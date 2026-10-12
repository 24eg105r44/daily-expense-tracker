import React from 'react';
import { 
  TrendingUp, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Coffee, 
  Bus, 
  Utensils, 
  ShoppingBag, 
  PlusCircle,
  PiggyBank,
  ShieldCheck,
  Zap,
  Car,
  Film,
  HeartPulse,
  Tag,
  Box
} from 'lucide-react';

export default function DashboardOverview({ 
  expenses, 
  categories, 
  currency, 
  onQuickAdd, 
  onOpenAddModal 
}) {
  const todayStr = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Helper icon lookup
  const getCatIcon = (iconName) => {
    switch (iconName) {
      case 'Utensils': return <Utensils size={15} />;
      case 'Car': return <Car size={15} />;
      case 'ShoppingBag': return <ShoppingBag size={15} />;
      case 'Zap': return <Zap size={15} />;
      case 'Film': return <Film size={15} />;
      case 'HeartPulse': return <HeartPulse size={15} />;
      case 'Tag': return <Tag size={15} />;
      default: return <Box size={15} />;
    }
  };

  // 1. Calculate Today's Spending
  const todayExpenses = expenses.filter(e => e.date.startsWith(todayStr));
  const totalToday = todayExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

  // 2. Calculate This Month's Spending
  const monthExpenses = expenses.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });
  const totalMonth = monthExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

  // 3. Category Spending Breakdown & Budget Alerts
  const categoryStats = categories.map(cat => {
    const spent = monthExpenses
      .filter(e => e.categoryId === cat.id)
      .reduce((sum, e) => sum + Number(e.amount), 0);
    
    const percentage = cat.limit > 0 ? Math.min(Math.round((spent / cat.limit) * 100), 100) : 0;
    
    let status = 'normal'; // normal, warning (>80%), exceeded (>100%)
    if (spent >= cat.limit) status = 'exceeded';
    else if (percentage >= 80) status = 'warning';

    return { ...cat, spent, percentage, status };
  });

  const totalMonthlyBudget = categories.reduce((sum, c) => sum + c.limit, 0);
  const remainingBudget = Math.max(0, totalMonthlyBudget - totalMonth);

  // Spending Health Index
  const overallUsedPercentage = totalMonthlyBudget > 0 ? Math.round((totalMonth / totalMonthlyBudget) * 100) : 0;
  let healthLabel = 'Excellent Health';
  let healthColor = '#10b981';
  if (overallUsedPercentage >= 90) {
    healthLabel = 'Critical Limit Near';
    healthColor = '#f43f5e';
  } else if (overallUsedPercentage >= 75) {
    healthLabel = 'Moderate Caution';
    healthColor = '#f59e0b';
  }

  // High usage categories alerts
  const alertCategories = categoryStats.filter(c => c.status !== 'normal');

  // Quick preset daily expenses
  const quickPresets = [
    { label: 'Morning Coffee', amount: 3.50, categoryId: 'cat-1', icon: Coffee },
    { label: 'Bus / Metro Ticket', amount: 5.00, categoryId: 'cat-2', icon: Bus },
    { label: 'Office Lunch', amount: 9.50, categoryId: 'cat-1', icon: Utensils },
    { label: 'Evening Tea & Snack', amount: 3.00, categoryId: 'cat-1', icon: Coffee },
    { label: 'Fresh Grocery Item', amount: 15.00, categoryId: 'cat-3', icon: ShoppingBag },
  ];

  return (
    <div className="dashboard-summary">
      {/* Budget Alerts Banner */}
      {alertCategories.length > 0 && (
        <div style={{
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          borderRadius: 'var(--radius-md)',
          padding: '1.1rem 1.4rem',
          marginBottom: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.2rem',
          color: '#fbbf24',
          boxShadow: '0 4px 16px rgba(245, 158, 11, 0.15)'
        }}>
          <AlertTriangle size={28} style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ fontSize: '1rem' }}>Active Budget Threshold Warnings:</strong>
            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.25rem', fontSize: '0.875rem' }}>
              {alertCategories.map(c => (
                <li key={c.id}>
                  <strong>{c.name}</strong>: {currency}{c.spent.toFixed(2)} spent of {currency}{c.limit.toFixed(2)} limit ({c.percentage}%)
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="metrics-row">
        <div className="metric-card">
          <div className="metric-icon-wrap" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#6366f1' }}>
            <Calendar size={26} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Today's Expenditure</span>
            <span className="metric-value">{currency}{totalToday.toFixed(2)}</span>
            <span className="metric-sub">{todayExpenses.length} transaction(s) recorded today</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap" style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899' }}>
            <TrendingUp size={26} />
          </div>
          <div className="metric-info">
            <span className="metric-label">This Month Total</span>
            <span className="metric-value">{currency}{totalMonth.toFixed(2)}</span>
            <span className="metric-sub">{monthExpenses.length} transactions this month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
            <PiggyBank size={26} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Remaining Monthly Budget</span>
            <span className="metric-value">{currency}{remainingBudget.toFixed(2)}</span>
            <span className="metric-sub">Out of {currency}{totalMonthlyBudget.toFixed(2)} limit</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap" style={{ background: `${healthColor}25`, color: healthColor }}>
            <ShieldCheck size={26} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Spending Health</span>
            <span className="metric-value" style={{ fontSize: '1.3rem', color: healthColor }}>
              {healthLabel}
            </span>
            <span className="metric-sub">{overallUsedPercentage}% of monthly limit spent</span>
          </div>
        </div>
      </div>

      {/* Quick Add Presets Bar */}
      <div className="card" style={{ marginBottom: '1.75rem' }}>
        <div className="card-header" style={{ marginBottom: '0.85rem' }}>
          <span className="card-title">
            <PlusCircle size={20} style={{ color: 'var(--accent-indigo)' }} /> Instant Daily Expense Logger
          </span>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Tap to instantly log daily purchases</span>
        </div>
        <div className="quick-add-bar" style={{ margin: 0 }}>
          {quickPresets.map((preset, idx) => {
            const IconComponent = preset.icon;
            return (
              <button 
                key={idx} 
                className="quick-chip"
                onClick={() => onQuickAdd(preset)}
              >
                <IconComponent size={15} />
                <span>+ {preset.label}</span>
                <span style={{ 
                  background: 'rgba(255, 255, 255, 0.15)', 
                  padding: '0.1rem 0.5rem', 
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem' 
                }}>
                  {currency}{preset.amount.toFixed(2)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Budget Progress Indicators */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <CheckCircle size={20} style={{ color: '#10b981' }} /> Monthly Category Budgets & Alerts
          </span>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Real-time usage tracker</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {categoryStats.map(cat => (
            <div key={cat.id} className="category-progress-item">
              <div className="category-progress-header">
                <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: '8px', 
                    backgroundColor: cat.color,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}>
                    {getCatIcon(cat.icon)}
                  </span>
                  {cat.name}
                </span>
                <span className={`badge ${
                  cat.status === 'exceeded' ? 'badge-danger' : 
                  cat.status === 'warning' ? 'badge-warning' : 'badge-success'
                }`}>
                  {cat.status === 'exceeded' ? '• Limit Exceeded' : 
                   cat.status === 'warning' ? '• 80% Reached' : '• On Track'}
                </span>
              </div>
              <div className="progress-container">
                <div 
                  className="progress-bar"
                  style={{ 
                    width: `${cat.percentage}%`,
                    backgroundColor: cat.status === 'exceeded' ? '#f43f5e' : cat.status === 'warning' ? '#f59e0b' : cat.color 
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                <span>Spent: <strong>{currency}{cat.spent.toFixed(2)}</strong></span>
                <span>Budget: {currency}{cat.limit.toFixed(2)} ({cat.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
