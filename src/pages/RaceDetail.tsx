import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Icon from '@/components/ui/icon';
import { races, difficultyColor } from '@/data/races';

export default function RaceDetail() {
  const { id } = useParams();
  const race = races.find((r) => r.id === Number(id));

  if (!race) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <p className="font-display text-2xl mb-4">Гонка не найдена</p>
          <Link to="/races" className="text-primary underline">← Все соревнования</Link>
        </div>
      </div>
    );
  }

  const pts = race.elevationProfile;
  const minY = Math.min(...pts.map((p) => p.y));
  const maxY = Math.max(...pts.map((p) => p.y));
  const maxX = pts[pts.length - 1].x;
  const W = 800, H = 180;
  const toSvg = (x: number, y: number) => ({
    sx: (x / maxX) * W,
    sy: H - ((y - minY) / (maxY - minY)) * H * 0.8 - 10,
  });
  const pathD = pts.map((p, i) => {
    const { sx, sy } = toSvg(p.x, p.y);
    return `${i === 0 ? 'M' : 'L'}${sx.toFixed(1)},${sy.toFixed(1)}`;
  }).join(' ');
  const fillD = pathD + ` L${W},${H} L0,${H} Z`;

  const d = new Date(race.date);
  const dateStr = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/races" className="hover:text-foreground transition-colors">Соревнования</Link>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground">{race.name}</span>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-secondary/20 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-display px-2 py-1 rounded-sm ${difficultyColor[race.difficulty]}`}>
                    {race.difficulty}
                  </span>
                  {race.status === 'registration' && (
                    <span className="text-xs font-display px-2 py-1 bg-primary/15 text-primary">
                      ОТКРЫТА РЕГИСТРАЦИЯ
                    </span>
                  )}
                  {race.status === 'finished' && (
                    <span className="text-xs font-display px-2 py-1 bg-muted text-muted-foreground">
                      ЗАВЕРШЁН
                    </span>
                  )}
                </div>
                <h1 className="font-display text-5xl font-bold uppercase mb-3">{race.name}</h1>
                <p className="text-muted-foreground flex items-center gap-2 text-lg">
                  <Icon name="MapPin" size={18} />
                  {race.location}
                </p>
              </div>
              <div className="flex flex-col gap-3 text-right">
                <div className="font-display text-2xl font-bold text-accent">{dateStr}</div>
                {race.status === 'registration' && (
                  <button className="bg-primary text-primary-foreground font-display tracking-wide px-6 py-2.5 hover:bg-primary/90 transition-colors glow-orange">
                    Зарегистрироваться
                  </button>
                )}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: 'Дистанция', value: `${race.distance} км`, icon: 'Route' },
                { label: 'Набор высоты', value: `+${race.elevationGain} м`, icon: 'TrendingUp' },
                { label: 'Макс. высота', value: `${race.maxElevation} м`, icon: 'Mountain' },
                { label: 'Контр. пунктов', value: String(race.checkpoints.length), icon: 'Flag' },
              ].map((s) => (
                <div key={s.label} className="bg-card border border-border rounded-sm p-4 flex items-center gap-3">
                  <Icon name={s.icon} size={22} className="text-primary shrink-0" />
                  <div>
                    <div className="font-display text-xl font-bold text-foreground">{s.value}</div>
                    <div className="text-muted-foreground text-xs">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
          {/* Left: details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Elevation profile */}
            <div className="bg-card border border-border rounded-sm p-6">
              <h2 className="font-display text-2xl font-bold mb-5 flex items-center gap-2">
                <Icon name="TrendingUp" size={22} className="text-primary" />
                Профиль высот
              </h2>
              <div className="bg-muted rounded-sm p-4 overflow-x-auto">
                <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full min-w-[400px]">
                  <defs>
                    <linearGradient id="profile-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(22 100% 52%)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="hsl(22 100% 52%)" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  {[0.25, 0.5, 0.75, 1].map((f) => {
                    const elev = Math.round(minY + (maxY - minY) * f);
                    const { sy } = toSvg(0, elev);
                    return (
                      <g key={f}>
                        <line x1={0} y1={sy} x2={W} y2={sy} stroke="hsl(215 18% 18%)" strokeWidth="1" />
                        <text x={4} y={sy - 3} fontSize="9" fill="hsl(215 12% 48%)" fontFamily="Oswald">{elev}м</text>
                      </g>
                    );
                  })}
                  {/* Fill */}
                  <path d={fillD} fill="url(#profile-grad)" />
                  {/* Line */}
                  <path d={pathD} fill="none" stroke="hsl(22 100% 52%)" strokeWidth="2.5" strokeLinejoin="round" className="elevation-path" />
                  {/* KM labels */}
                  {pts.filter((_, i) => i % 2 === 0).map((p) => {
                    const { sx } = toSvg(p.x, p.y);
                    return (
                      <text key={p.x} x={sx} y={H + 22} textAnchor="middle" fontSize="9" fill="hsl(215 12% 48%)" fontFamily="Oswald">
                        {p.x}км
                      </text>
                    );
                  })}
                  {/* CP dots */}
                  {race.checkpoints.map((cp) => {
                    const epPoint = pts.reduce((a, b) =>
                      Math.abs(b.x - cp.distance) < Math.abs(a.x - cp.distance) ? b : a
                    );
                    const { sx, sy } = toSvg(epPoint.x, epPoint.y);
                    return (
                      <g key={cp.name}>
                        <circle cx={sx} cy={sy} r="4" fill="hsl(195 90% 50%)" />
                        <circle cx={sx} cy={sy} r="7" fill="none" stroke="hsl(195 90% 50%)" strokeWidth="1" strokeOpacity="0.5" />
                      </g>
                    );
                  })}
                </svg>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-0.5 bg-primary rounded" />
                  Профиль высот
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent" />
                  Контрольные пункты
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card border border-border rounded-sm p-6">
              <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Info" size={22} className="text-primary" />
                О гонке
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{race.description}</p>
              <h3 className="font-display text-lg font-bold mb-2 text-foreground">Описание маршрута</h3>
              <p className="text-muted-foreground leading-relaxed">{race.routeDescription}</p>
            </div>
          </div>

          {/* Right: checkpoints + participants */}
          <div className="space-y-6">
            {/* Checkpoints */}
            <div className="bg-card border border-border rounded-sm p-6">
              <h2 className="font-display text-xl font-bold mb-5 flex items-center gap-2">
                <Icon name="Flag" size={20} className="text-primary" />
                Контрольные пункты
              </h2>
              <div className="space-y-0">
                {race.checkpoints.map((cp, i) => (
                  <div key={cp.name} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-display font-bold shrink-0 ${
                        i === 0 || i === race.checkpoints.length - 1
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-accent/20 text-accent border border-accent/40'
                      }`}>
                        {i + 1}
                      </div>
                      {i < race.checkpoints.length - 1 && (
                        <div className="w-px flex-1 bg-border min-h-[24px]" />
                      )}
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="font-body font-semibold text-foreground text-sm">{cp.name}</div>
                      <div className="text-muted-foreground text-xs flex items-center gap-3 mt-0.5">
                        <span>{cp.distance} км</span>
                        <span className="text-accent font-display">{cp.elevation} м</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Participants */}
            <div className="bg-card border border-border rounded-sm p-6">
              <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Users" size={20} className="text-primary" />
                Участники
              </h2>
              <div className="text-center mb-3">
                <span className="font-display text-4xl font-bold text-foreground">{race.participants}</span>
                <span className="text-muted-foreground font-display text-xl"> / {race.maxParticipants}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                  style={{ width: `${Math.round((race.participants / race.maxParticipants) * 100)}%` }}
                />
              </div>
              <p className="text-muted-foreground text-xs text-center">
                {Math.round((race.participants / race.maxParticipants) * 100)}% мест занято
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
