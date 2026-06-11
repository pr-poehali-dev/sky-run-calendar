import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Icon from '@/components/ui/icon';
import { races, difficultyColor, type Difficulty } from '@/data/races';

const months = [
  'Все месяцы', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];
const difficulties: ('Все' | Difficulty)[] = ['Все', 'Начинающий', 'Средний', 'Сложный', 'Экстремальный'];
const regions = ['Все регионы', 'Кавказ', 'Краснодарский край'];

const statusLabel: Record<string, { label: string; cls: string }> = {
  upcoming: { label: 'Скоро', cls: 'text-foreground bg-secondary' },
  registration: { label: 'Регистрация', cls: 'text-primary bg-primary/15' },
  finished: { label: 'Завершён', cls: 'text-muted-foreground bg-muted' },
};

export default function Calendar() {
  const [month, setMonth] = useState('Все месяцы');
  const [difficulty, setDifficulty] = useState<'Все' | Difficulty>('Все');
  const [region, setRegion] = useState('Все регионы');

  const filtered = races.filter((r) => {
    const d = new Date(r.date);
    const mName = months[d.getMonth() + 1];
    if (month !== 'Все месяцы' && mName !== month) return false;
    if (difficulty !== 'Все' && r.difficulty !== difficulty) return false;
    if (region !== 'Все регионы' && r.region !== region) return false;
    return true;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-16">
        {/* Header */}
        <div className="border-b border-border bg-secondary/40">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <p className="text-accent font-display tracking-[0.3em] text-sm mb-2">СЕЗОН 2026</p>
            <h1 className="font-display text-5xl font-bold uppercase mb-2">Календарь гонок</h1>
            <p className="text-muted-foreground">Все соревнования сезона 2026 по скайраннингу</p>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-border sticky top-16 z-30 bg-background/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-1 text-muted-foreground text-sm mr-2">
              <Icon name="SlidersHorizontal" size={16} />
              Фильтры:
            </div>

            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-secondary border border-border text-foreground text-sm px-3 py-1.5 rounded-sm font-body focus:outline-none focus:border-primary"
            >
              {months.map((m) => <option key={m}>{m}</option>)}
            </select>

            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="bg-secondary border border-border text-foreground text-sm px-3 py-1.5 rounded-sm font-body focus:outline-none focus:border-primary"
            >
              {regions.map((r) => <option key={r}>{r}</option>)}
            </select>

            <div className="flex gap-1 flex-wrap">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`text-xs font-display px-3 py-1.5 rounded-sm transition-colors ${
                    difficulty === d
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <span className="ml-auto text-muted-foreground text-sm font-display">
              {filtered.length} гонок
            </span>
          </div>
        </div>

        {/* Race list */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Icon name="Search" size={48} className="mx-auto mb-4 opacity-30" />
              <p className="font-display text-xl">Гонки не найдены</p>
              <p className="text-sm mt-2">Попробуйте изменить фильтры</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((race) => {
                const d = new Date(race.date);
                const dateStr = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
                const weekday = d.toLocaleDateString('ru-RU', { weekday: 'short' });
                const st = statusLabel[race.status];
                const pct = Math.round((race.participants / race.maxParticipants) * 100);

                return (
                  <Link
                    key={race.id}
                    to={`/races/${race.id}`}
                    className="race-card bg-card border border-border rounded-sm flex flex-col md:flex-row md:items-center gap-4 p-5 group"
                  >
                    {/* Date */}
                    <div className="shrink-0 w-20 text-center">
                      <div className="font-display text-3xl font-bold text-primary leading-none">
                        {d.getDate()}
                      </div>
                      <div className="text-muted-foreground text-xs uppercase font-display mt-1">
                        {d.toLocaleDateString('ru-RU', { month: 'short' })} · {weekday}
                      </div>
                    </div>

                    <div className="w-px bg-border hidden md:block self-stretch" />

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                          {race.name}
                        </h3>
                        <span className={`text-xs font-display px-2 py-0.5 rounded-sm ${difficultyColor[race.difficulty]}`}>
                          {race.difficulty}
                        </span>
                        <span className={`text-xs font-display px-2 py-0.5 rounded-sm ${st.cls}`}>
                          {st.label}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm flex items-center gap-1">
                        <Icon name="MapPin" size={13} />
                        {race.location}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 shrink-0">
                      <div className="text-center">
                        <div className="font-display text-lg font-bold text-foreground">{race.distance} км</div>
                        <div className="text-muted-foreground text-xs">дистанция</div>
                      </div>
                      <div className="text-center">
                        <div className="font-display text-lg font-bold text-foreground">+{race.elevationGain}</div>
                        <div className="text-muted-foreground text-xs">набор, м</div>
                      </div>
                      <div className="text-center hidden lg:block">
                        <div className="font-display text-lg font-bold text-foreground">{race.maxElevation}</div>
                        <div className="text-muted-foreground text-xs">макс. м</div>
                      </div>
                    </div>

                    {/* Participants */}
                    <div className="shrink-0 w-32 hidden lg:block">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>{race.participants}</span>
                        <span>{race.maxParticipants}</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 text-center">{pct}% заполнено</div>
                    </div>

                    <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 hidden md:block" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
