import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Icon from '@/components/ui/icon';
import { athletes } from '@/data/races';

type SortKey = 'totalPoints' | 'wins' | 'podiums' | 'races';

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'totalPoints', label: 'Очки' },
  { key: 'wins', label: 'Победы' },
  { key: 'podiums', label: 'Подиумы' },
  { key: 'races', label: 'Гонки' },
];

const medalColor = (rank: number) => {
  if (rank === 1) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
  if (rank === 2) return 'text-slate-300 bg-slate-300/10 border-slate-300/30';
  if (rank === 3) return 'text-amber-600 bg-amber-600/10 border-amber-600/30';
  return 'text-muted-foreground bg-secondary border-border';
};

const medalIcon = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return null;
};

export default function Ratings() {
  const [sortBy, setSortBy] = useState<SortKey>('totalPoints');

  const sorted = [...athletes].sort((a, b) => b[sortBy] - a[sortBy]);

  const maxPoints = Math.max(...athletes.map((a) => a.totalPoints));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-16">
        <div className="border-b border-border bg-secondary/40">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <p className="text-accent font-display tracking-[0.3em] text-sm mb-2">СЕЗОН 2026</p>
            <h1 className="font-display text-5xl font-bold uppercase mb-2">Рейтинги</h1>
            <p className="text-muted-foreground">Индивидуальный зачёт атлетов по итогам соревнований</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Top 3 podium */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {sorted.slice(0, 3).map((athlete, i) => {
              const rank = i + 1;
              const pct = Math.round((athlete.totalPoints / maxPoints) * 100);
              return (
                <div
                  key={athlete.id}
                  className={`bg-card border rounded-sm p-6 ${i === 0 ? 'border-yellow-400/40 ring-1 ring-yellow-400/20' : 'border-border'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`w-10 h-10 rounded-full border flex items-center justify-center font-display font-bold text-lg ${medalColor(rank)}`}>
                      {rank}
                    </span>
                    {medalIcon(rank) && <span className="text-2xl">{medalIcon(rank)}</span>}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-0.5">{athlete.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{athlete.country} · {athlete.age} лет</p>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Очки</span>
                      <span className="text-foreground font-display font-bold">{athlete.totalPoints}</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center border-t border-border pt-4">
                    <div>
                      <div className="font-display text-lg font-bold text-foreground">{athlete.wins}</div>
                      <div className="text-muted-foreground text-xs">победы</div>
                    </div>
                    <div>
                      <div className="font-display text-lg font-bold text-foreground">{athlete.podiums}</div>
                      <div className="text-muted-foreground text-xs">подиумы</div>
                    </div>
                    <div>
                      <div className="font-display text-lg font-bold text-foreground">{athlete.races}</div>
                      <div className="text-muted-foreground text-xs">гонки</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full table */}
          <div className="bg-card border border-border rounded-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-secondary/40 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-xl font-bold">Полный рейтинг</h2>
              <div className="flex gap-1">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setSortBy(opt.key)}
                    className={`px-3 py-1.5 font-display text-xs tracking-wide transition-colors rounded-sm ${
                      sortBy === opt.key
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background text-muted-foreground hover:text-foreground border border-border'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/20">
                    <th className="text-left px-6 py-3 font-display text-xs tracking-wider text-muted-foreground w-12">РНК</th>
                    <th className="text-left px-4 py-3 font-display text-xs tracking-wider text-muted-foreground">СПОРТСМЕН</th>
                    <th className="text-right px-4 py-3 font-display text-xs tracking-wider text-muted-foreground">ОЧКИ</th>
                    <th className="text-right px-4 py-3 font-display text-xs tracking-wider text-muted-foreground hidden sm:table-cell">ПОБЕДЫ</th>
                    <th className="text-right px-4 py-3 font-display text-xs tracking-wider text-muted-foreground hidden md:table-cell">ПОДИУМЫ</th>
                    <th className="text-right px-6 py-3 font-display text-xs tracking-wider text-muted-foreground hidden lg:table-cell">ГОНКИ</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((athlete, i) => {
                    const rank = i + 1;
                    const pct = Math.round((athlete.totalPoints / maxPoints) * 100);
                    return (
                      <tr key={athlete.id} className="border-b border-border/40 hover:bg-secondary/20 transition-colors group">
                        <td className="px-6 py-4">
                          <span className={`w-7 h-7 rounded-full border flex items-center justify-center font-display font-bold text-sm ${medalColor(rank)}`}>
                            {rank}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-body font-semibold text-foreground">{athlete.name}</div>
                          <div className="text-muted-foreground text-xs mt-0.5">{athlete.country} · {athlete.age} лет</div>
                          <div className="h-1 bg-secondary rounded-full overflow-hidden mt-1.5 max-w-[120px]">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="font-display font-bold text-foreground text-lg">{athlete.totalPoints}</span>
                        </td>
                        <td className="px-4 py-4 text-right font-display font-bold text-foreground hidden sm:table-cell">{athlete.wins}</td>
                        <td className="px-4 py-4 text-right font-display text-foreground hidden md:table-cell">{athlete.podiums}</td>
                        <td className="px-6 py-4 text-right text-muted-foreground hidden lg:table-cell">{athlete.races}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
