import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Icon from '@/components/ui/icon';
import { races, difficultyColor } from '@/data/races';

export default function Races() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-16">
        <div className="border-b border-border bg-secondary/40">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <p className="text-accent font-display tracking-[0.3em] text-sm mb-2">МАРШРУТЫ</p>
            <h1 className="font-display text-5xl font-bold uppercase mb-2">Соревнования</h1>
            <p className="text-muted-foreground">Профили высот, контрольные пункты и описания трасс</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {races.map((race) => {
            const d = new Date(race.date);
            const dateStr = d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
            const pct = Math.round((race.participants / race.maxParticipants) * 100);

            const pts = race.elevationProfile;
            const minY = Math.min(...pts.map((p) => p.y));
            const maxY = Math.max(...pts.map((p) => p.y));
            const maxX = pts[pts.length - 1].x;
            const W = 300, H = 80;
            const toSvg = (x: number, y: number) => ({
              sx: (x / maxX) * W,
              sy: H - ((y - minY) / (maxY - minY)) * H * 0.85 - 4,
            });
            const pathD = pts.map((p, i) => {
              const { sx, sy } = toSvg(p.x, p.y);
              return `${i === 0 ? 'M' : 'L'}${sx.toFixed(1)},${sy.toFixed(1)}`;
            }).join(' ');
            const fillD = pathD + ` L${W},${H} L0,${H} Z`;

            return (
              <Link
                key={race.id}
                to={`/races/${race.id}`}
                className="race-card bg-card border border-border rounded-sm overflow-hidden group flex flex-col"
              >
                <div className="h-1.5 bg-gradient-to-r from-primary to-accent" />

                {/* Elevation preview */}
                <div className="bg-muted px-4 pt-4 pb-2">
                  <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-16">
                    <defs>
                      <linearGradient id={`grad-${race.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(22 100% 52%)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="hsl(22 100% 52%)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={fillD} fill={`url(#grad-${race.id})`} />
                    <path d={pathD} fill="none" stroke="hsl(22 100% 52%)" strokeWidth="2" strokeLinejoin="round" />
                    {/* Peak marker */}
                    {(() => {
                      const peak = pts.reduce((a, b) => (b.y > a.y ? b : a));
                      const { sx, sy } = toSvg(peak.x, peak.y);
                      return (
                        <g>
                          <circle cx={sx} cy={sy} r="3" fill="hsl(22 100% 52%)" />
                          <text x={sx} y={sy - 6} textAnchor="middle" fontSize="9" fill="hsl(22 100% 52%)" fontFamily="Oswald">
                            {peak.y}м
                          </text>
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                      {race.name}
                    </h3>
                    <span className={`text-xs font-display px-2 py-0.5 rounded-sm shrink-0 ${difficultyColor[race.difficulty]}`}>
                      {race.difficulty}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm flex items-center gap-1 mb-1">
                    <Icon name="MapPin" size={13} />
                    {race.location}
                  </p>
                  <p className="text-muted-foreground text-sm flex items-center gap-1 mb-4">
                    <Icon name="Calendar" size={13} />
                    {dateStr}
                  </p>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {race.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 border-t border-border pt-4 mb-4">
                    <div className="text-center">
                      <div className="font-display text-lg font-bold text-foreground">{race.distance}</div>
                      <div className="text-muted-foreground text-xs">км</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-lg font-bold text-foreground">+{race.elevationGain}</div>
                      <div className="text-muted-foreground text-xs">набор, м</div>
                    </div>
                    <div className="text-center">
                      <div className="font-display text-lg font-bold text-foreground">{race.checkpoints.length}</div>
                      <div className="text-muted-foreground text-xs">КП</div>
                    </div>
                  </div>

                  {/* Participants bar */}
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{race.participants} участников</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
