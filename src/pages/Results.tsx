import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Icon from '@/components/ui/icon';
import { results, races } from '@/data/races';

export default function Results() {
  const finishedRaces = races.filter((r) => r.status === 'finished');
  const [selectedRace, setSelectedRace] = useState(finishedRaces[0]?.id ?? 0);
  const [category, setCategory] = useState('Мужчины');

  const raceResults = results
    .filter((r) => r.raceId === selectedRace && r.category === category)
    .sort((a, b) => a.place - b.place);

  const selectedRaceData = races.find((r) => r.id === selectedRace);

  const medalColor = (place: number) => {
    if (place === 1) return 'text-yellow-400';
    if (place === 2) return 'text-slate-300';
    if (place === 3) return 'text-amber-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-16">
        <div className="border-b border-border bg-secondary/40">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <p className="text-accent font-display tracking-[0.3em] text-sm mb-2">ПРОТОКОЛЫ</p>
            <h1 className="font-display text-5xl font-bold uppercase mb-2">Результаты</h1>
            <p className="text-muted-foreground">Финишные протоколы завершённых соревнований</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Race selector */}
          <div className="flex flex-wrap gap-3 mb-6">
            {finishedRaces.map((r) => {
              const d = new Date(r.date);
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRace(r.id)}
                  className={`px-5 py-3 font-display text-sm tracking-wide transition-colors rounded-sm border ${
                    selectedRace === r.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                  }`}
                >
                  <div>{r.name}</div>
                  <div className="text-xs opacity-70 font-body mt-0.5">
                    {d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedRaceData && (
            <div className="bg-card border border-border rounded-sm overflow-hidden">
              {/* Header */}
              <div className="bg-secondary/60 px-6 py-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold">{selectedRaceData.name}</h2>
                  <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                    <Icon name="MapPin" size={13} />
                    {selectedRaceData.location} · {selectedRaceData.distance} км
                  </p>
                </div>
                <div className="flex gap-1">
                  {['Мужчины', 'Женщины'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-2 font-display text-sm tracking-wide transition-colors rounded-sm ${
                        category === cat
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background text-muted-foreground hover:text-foreground border border-border'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Podium */}
              {raceResults.length > 0 && (
                <div className="px-6 py-6 border-b border-border">
                  <div className="flex items-end justify-center gap-4">
                    {[raceResults[1], raceResults[0], raceResults[2]].filter(Boolean).map((r, i) => {
                      const heights = ['h-20', 'h-28', 'h-16'];
                      const places = [2, 1, 3];
                      const icons = ['🥈', '🥇', '🥉'];
                      return (
                        <div key={r.id} className="text-center flex flex-col items-center gap-2">
                          <div className="font-body text-sm text-foreground font-semibold">{r.athleteName}</div>
                          <div className={`font-display text-lg font-bold ${medalColor(places[i])}`}>{r.time}</div>
                          <div className={`${heights[i]} w-24 bg-secondary border border-border flex items-center justify-center text-2xl`}>
                            {icons[i]}
                          </div>
                          <div className={`font-display text-xs font-bold ${medalColor(places[i])}`}>
                            МЕСТО {places[i]}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Full results table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th className="text-left px-6 py-3 font-display text-xs tracking-wider text-muted-foreground">#</th>
                      <th className="text-left px-4 py-3 font-display text-xs tracking-wider text-muted-foreground">СПОРТСМЕН</th>
                      <th className="text-left px-4 py-3 font-display text-xs tracking-wider text-muted-foreground hidden md:table-cell">СТРАНА</th>
                      <th className="text-right px-6 py-3 font-display text-xs tracking-wider text-muted-foreground">ВРЕМЯ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {raceResults.map((r) => (
                      <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`font-display text-lg font-bold ${medalColor(r.place)}`}>
                            {r.place}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-body font-semibold text-foreground">{r.athleteName}</td>
                        <td className="px-4 py-4 text-muted-foreground text-sm hidden md:table-cell">{r.country}</td>
                        <td className="px-6 py-4 text-right font-display font-bold text-foreground">{r.time}</td>
                      </tr>
                    ))}
                    {raceResults.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-12 text-muted-foreground">
                          Нет данных для выбранной категории
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
