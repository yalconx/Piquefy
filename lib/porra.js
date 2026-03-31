// Generate a random room code
export function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

// Generate a unique admin token
export function generateAdminToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Calculate winnings for a given result
// Returns { winners: [{id, name, amount, payout}], losers: [{id, name, amount}], totalPot }
export function calculateResults(bets, winningOption) {
  const betsArr = Object.values(bets || {});
  const totalPot = betsArr.reduce((sum, b) => sum + b.amount, 0);
  const winners = betsArr.filter(b => b.option === winningOption);
  const losers = betsArr.filter(b => b.option !== winningOption);
  const winnersPot = winners.reduce((sum, b) => sum + b.amount, 0);

  const winnersWithPayout = winners.map(w => ({
    ...w,
    payout: winnersPot > 0 ? Math.round((w.amount / winnersPot) * totalPot * 100) / 100 : 0,
    profit: winnersPot > 0 ? Math.round(((w.amount / winnersPot) * totalPot - w.amount) * 100) / 100 : 0,
  }));

  return { winners: winnersWithPayout, losers, totalPot, winnersPot };
}

// Tricount-style debt settlement: minimize number of transfers
export function calculateTransfers(bets, winningOption) {
  const { winners, losers } = calculateResults(bets, winningOption);

  // Each loser owes their bet proportionally to each winner
  const debts = []; // { from, to, amount }

  // Build balance map: positive = owed money, negative = owes money
  const balance = {};
  const names = {};

  Object.values(bets || {}).forEach(b => {
    if (!balance[b.id]) balance[b.id] = 0;
    names[b.id] = b.name;
  });

  // Losers owe their full bet into the pot
  losers.forEach(l => { balance[l.id] = (balance[l.id] || 0) - l.amount; });

  // Winners get their payout (profit only — they keep their own bet)
  winners.forEach(w => { balance[w.id] = (balance[w.id] || 0) + w.profit; });

  // Settle debts greedily
  const creditors = Object.entries(balance).filter(([, v]) => v > 0).map(([id, v]) => ({ id, amount: v }));
  const debtors = Object.entries(balance).filter(([, v]) => v < 0).map(([id, v]) => ({ id, amount: -v }));

  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  let ci = 0, di = 0;
  while (ci < creditors.length && di < debtors.length) {
    const c = creditors[ci];
    const d = debtors[di];
    const amount = Math.min(c.amount, d.amount);
    if (amount > 0.01) {
      debts.push({ from: names[d.id], to: names[c.id], amount: Math.round(amount * 100) / 100 });
    }
    c.amount -= amount;
    d.amount -= amount;
    if (c.amount < 0.01) ci++;
    if (d.amount < 0.01) di++;
  }

  return debts;
}

// Format currency
export function fmt(n) {
  return Number(n).toFixed(2).replace(".", ",") + "€";
}

// Time remaining string
export function timeRemaining(closesAt) {
  const diff = new Date(closesAt) - new Date();
  if (diff <= 0) return "Cerrada";
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}
