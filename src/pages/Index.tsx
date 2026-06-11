import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Icon from '@/components/ui/icon';
import { races } from '@/data/races';

const HERO_IMG = 'https://cdn.poehali.dev/projects/dfa1f7c2-9af5-4c1b-b70c-d15d7a0ac5bc/files/889197b3-cc86-468f-88aa-864ce0b83f29.jpg';

const stats = [
  { value: '18', label: 'Гонок в сезоне', icon: 'Flag' },
  { value: '3 200+', label: 'Участников', icon: 'Users' },
  { value: '5 642 м', label: 'Максимальная высота', icon: 'Mountain' },
  { value: '6', label: 'Регионов', icon: 'MapPin' },
];

const sections = [
  {
    to: '/calendar',
    icon: 'CalendarDays',
    title: 'Календарь',
    desc: 'Все гонки сезона 2026 в одном месте. Фильтры по региону, дате и сложности.',
    border: 'border-primary/30',
    glow: 'from-primary/10',
  },
  {
    to: '/races',
    icon: 'Route',
    title: 'Соревнования',
    desc: 'Подробные маршруты с профилями высот, КП и описанием трасс.',
    border: 'border-accent/30',
    glow: 'from-accent/10',
  },
  {
    to: '/results',
    icon: 'Trophy',
    title: 'Результаты',
    desc: 'Финишные протоколы прошедших гонок. Мужчины и женщины отдельно.',
    border: 'border-yellow-500/30',
    glow: 'from-yellow-500/10',
  },
  {
    to: '/ratings',
    icon: 'BarChart2',
    title: 'Рейтинги',
    desc: 'Индивидуальные рейтинги атлетов по сумме очков за сезон.',
    border: 'border-green-500/30',
    glow: 'from-green-500/10',
  },
];

const upcoming = races.filter((r) => r.status !== 'finished').slice(0, 3);

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Скайраннинг"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-background terrain-clip opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-24 w-full">
          <p className="animate-fade-up text-accent font-display tracking-[0.3em] text-sm mb-4">
            СЕЗОН 2026 · РОССИЯ И СНГ
          </p>
          <h1 className="animate-fade-up-delay-1 font-display text-6xl md:text-8xl font-bold leading-none mb-6 uppercase">
            Скай<span className="text-primary">ран</span><br />инг
          </h1>
          <p className="animate-fade-up-delay-2 text-muted-foreground text-lg max-w-xl mb-8">
            Официальный календарь горных гонок. Вертикальные километры, скайрейсы и ультра-трейлы по вершинам России.
          </p>
          <div className="animate-fade-up-delay-3 flex flex-wrap gap-4">
            <Link
              to="/calendar"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display tracking-wide px-8 py-3 hover:bg-primary/90 transition-colors glow-orange"
            >
              <Icon name="CalendarDays" size={18} />
              Смотреть календарь
            </Link>
            <Link
              to="/races"
              className="inline-flex items-center gap-2 border border-foreground/30 text-foreground font-display tracking-wide px-8 py-3 hover:border-primary hover:text-primary transition-colors"
            >
              <Icon name="Route" size={18} />
              Маршруты
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {stats.map((s) => (
            <div key={s.label} className="bg-secondary px-6 py-6 flex items-center gap-4">
              <Icon name={s.icon} size={28} className="text-primary shrink-0" />
              <div>
                <div className="font-display text-3xl font-bold text-foreground">{s.value}</div>
                <div className="text-muted-foreground text-sm mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="font-display text-4xl font-bold mb-12 uppercase">Разделы сайта</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className={`race-card border ${s.border} bg-gradient-to-b ${s.glow} to-card bg-card p-6 rounded-sm group`}
            >
              <Icon name={s.icon} size={32} className="text-foreground mb-4 group-hover:text-primary transition-colors" />
              <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-display text-muted-foreground group-hover:text-primary transition-colors">
                Перейти <Icon name="ChevronRight" size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Races */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-4xl font-bold uppercase">Ближайшие гонки</h2>
          <Link to="/calendar" className="text-primary font-display tracking-wide text-sm flex items-center gap-1 hover:gap-2 transition-all">
            Все гонки <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {upcoming.map((race) => {
            const d = new Date(race.date);
            const dayStr = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
            return (
              <Link
                key={race.id}
                to={`/races/${race.id}`}
                className="race-card bg-card border border-border rounded-sm overflow-hidden group"
              >
                <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display text-accent text-sm tracking-wider">{dayStr}</span>
                    {race.status === 'registration' && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 font-display">
                        РЕГИСТРАЦИЯ
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {race.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex items-center gap-1">
                    <Icon name="MapPin" size={13} />
                    {race.location}
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center border-t border-border pt-4">
                    <div>
                      <div className="font-display text-lg font-bold text-foreground">{race.distance}</div>
                      <div className="text-muted-foreground text-xs">км</div>
                    </div>
                    <div>
                      <div className="font-display text-lg font-bold text-foreground">+{(race.elevationGain / 1000).toFixed(1)}к</div>
                      <div className="text-muted-foreground text-xs">набор</div>
                    </div>
                    <div>
                      <div className="font-display text-lg font-bold text-foreground">{(race.maxElevation / 1000).toFixed(2)}</div>
                      <div className="text-muted-foreground text-xs">макс. км</div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-lg font-bold">
            <span className="text-primary">▲</span> SKYRUN<span className="text-accent">RU</span>
          </div>
          <p className="text-muted-foreground text-sm">© 2026 Skyrun Russia. Официальный календарь соревнований.</p>
        </div>
      </footer>
    </div>
  );
}