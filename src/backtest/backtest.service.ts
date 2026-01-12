export function backtest(data) {
  let wins = 0;
  data.forEach((d, i) => {
    if (i === 0) return;
    if (d.signal === 'BUY' && data[i + 1]?.price > d.price) wins++;
  });
  return wins / data.length;
}
