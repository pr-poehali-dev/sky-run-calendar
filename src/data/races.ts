export type Difficulty = 'Начинающий' | 'Средний' | 'Сложный' | 'Экстремальный';
export type RaceStatus = 'upcoming' | 'registration' | 'finished';

export interface Race {
  id: number;
  name: string;
  date: string;
  location: string;
  region: string;
  distance: number;
  elevationGain: number;
  maxElevation: number;
  difficulty: Difficulty;
  status: RaceStatus;
  participants: number;
  maxParticipants: number;
  description: string;
  routeDescription: string;
  checkpoints: { name: string; distance: number; elevation: number }[];
  elevationProfile: { x: number; y: number }[];
  image?: string;
  registrationUrl?: string;
}

export interface Result {
  id: number;
  raceId: number;
  raceName: string;
  date: string;
  place: number;
  athleteName: string;
  country: string;
  time: string;
  timeSeconds: number;
  category: string;
}

export interface Athlete {
  id: number;
  name: string;
  country: string;
  age: number;
  totalPoints: number;
  wins: number;
  podiums: number;
  races: number;
  avatar?: string;
}

export const races: Race[] = [
  {
    id: 1,
    name: 'Эльбрус Рейс',
    date: '2026-07-12',
    location: 'Терскол, Кабардино-Балкария',
    region: 'Кавказ',
    distance: 21,
    elevationGain: 3200,
    maxElevation: 5642,
    difficulty: 'Экстремальный',
    status: 'registration',
    participants: 187,
    maxParticipants: 250,
    description: 'Легендарная гонка на высшую точку Европы. Маршрут пролегает через ледники и снежные поля с набором высоты более 3200 метров.',
    routeDescription: 'Старт у поляны Азау (2350 м). Подъём через Бочки (3750 м) и скалы Пастухова (4800 м) к Восточной вершине Эльбруса (5621 м). Спуск по южному склону. Финиш у канатной дороги.',
    checkpoints: [
      { name: 'Поляна Азау', distance: 0, elevation: 2350 },
      { name: 'Станция Мир', distance: 4, elevation: 3500 },
      { name: 'Бочки', distance: 6, elevation: 3750 },
      { name: 'Скалы Пастухова', distance: 10, elevation: 4800 },
      { name: 'Седловина', distance: 14, elevation: 5300 },
      { name: 'Вершина Восточная', distance: 17, elevation: 5621 },
      { name: 'Финиш', distance: 21, elevation: 2350 },
    ],
    elevationProfile: [
      { x: 0, y: 2350 }, { x: 2, y: 2800 }, { x: 4, y: 3500 }, { x: 6, y: 3750 },
      { x: 8, y: 4200 }, { x: 10, y: 4800 }, { x: 12, y: 5100 }, { x: 14, y: 5300 },
      { x: 17, y: 5621 }, { x: 19, y: 4200 }, { x: 21, y: 2350 }
    ],
  },
  {
    id: 2,
    name: 'Казбек Вертикальный Километр',
    date: '2026-08-03',
    location: 'Степанцминда, Грузия',
    region: 'Кавказ',
    distance: 7,
    elevationGain: 1000,
    maxElevation: 4000,
    difficulty: 'Сложный',
    status: 'upcoming',
    participants: 92,
    maxParticipants: 150,
    description: 'Классический вертикальный километр у подножия Казбека. Крутой подъём по травянистым склонам и моренам с финишем на гребне.',
    routeDescription: 'Старт от монастыря Гергети (2170 м). Крутой подъём по травянистым склонам через каменистые морены. Финиш на пике Самеба (3170 м). Разница высот — ровно 1000 м.',
    checkpoints: [
      { name: 'Монастырь Гергети', distance: 0, elevation: 2170 },
      { name: 'Травянистый гребень', distance: 2, elevation: 2700 },
      { name: 'Морены', distance: 4.5, elevation: 3000 },
      { name: 'Финиш Самеба', distance: 7, elevation: 3170 },
    ],
    elevationProfile: [
      { x: 0, y: 2170 }, { x: 1.5, y: 2500 }, { x: 3, y: 2800 },
      { x: 4.5, y: 3000 }, { x: 6, y: 3100 }, { x: 7, y: 3170 }
    ],
  },
  {
    id: 3,
    name: 'Домбай Трейл',
    date: '2026-09-20',
    location: 'Домбай, Карачаево-Черкесия',
    region: 'Кавказ',
    distance: 42,
    elevationGain: 2800,
    maxElevation: 3200,
    difficulty: 'Сложный',
    status: 'upcoming',
    participants: 215,
    maxParticipants: 300,
    description: 'Горный марафон по живописным долинам и перевалам Домбая. Маршрут охватывает лучшие виды на ледник Алибек и пик Домбай-Ульген.',
    routeDescription: 'Старт в посёлке Домбай (1630 м). Подъём к леднику Алибек, траверс через перевал Алибек (3011 м), спуск в долину и подъём на перевал Птыш (3100 м). Финиш в посёлке.',
    checkpoints: [
      { name: 'Домбай', distance: 0, elevation: 1630 },
      { name: 'Ледник Алибек', distance: 8, elevation: 2550 },
      { name: 'Перевал Алибек', distance: 12, elevation: 3011 },
      { name: 'Долина Птыш', distance: 22, elevation: 1800 },
      { name: 'Перевал Птыш', distance: 32, elevation: 3100 },
      { name: 'Финиш Домбай', distance: 42, elevation: 1630 },
    ],
    elevationProfile: [
      { x: 0, y: 1630 }, { x: 5, y: 2000 }, { x: 8, y: 2550 }, { x: 12, y: 3011 },
      { x: 17, y: 2200 }, { x: 22, y: 1800 }, { x: 27, y: 2400 }, { x: 32, y: 3100 },
      { x: 37, y: 2200 }, { x: 42, y: 1630 }
    ],
  },
  {
    id: 4,
    name: 'Фишт Скайрейс',
    date: '2026-06-28',
    location: 'Адыгея',
    region: 'Кавказ',
    distance: 33,
    elevationGain: 2100,
    maxElevation: 2867,
    difficulty: 'Средний',
    status: 'finished',
    participants: 180,
    maxParticipants: 180,
    description: 'Скайрейс по уникальному карстовому плато Лагонаки с финишем у горы Фишт. Один из красивейших маршрутов России.',
    routeDescription: 'Старт с кордона Лагонаки (1700 м). Плато Лагонаки, ущелье, подъём к приюту Фишт (2000 м). Финальный штурм на вершину Фишт (2867 м).',
    checkpoints: [
      { name: 'Кордон Лагонаки', distance: 0, elevation: 1700 },
      { name: 'Плато', distance: 10, elevation: 2100 },
      { name: 'Приют Фишт', distance: 20, elevation: 2000 },
      { name: 'Вершина Фишт', distance: 28, elevation: 2867 },
      { name: 'Финиш', distance: 33, elevation: 1700 },
    ],
    elevationProfile: [
      { x: 0, y: 1700 }, { x: 5, y: 1900 }, { x: 10, y: 2100 }, { x: 15, y: 2000 },
      { x: 20, y: 2000 }, { x: 24, y: 2400 }, { x: 28, y: 2867 }, { x: 33, y: 1700 }
    ],
  },
  {
    id: 5,
    name: 'Безенги Экстрим',
    date: '2026-10-05',
    location: 'Безенги, Кабардино-Балкария',
    region: 'Кавказ',
    distance: 55,
    elevationGain: 4500,
    maxElevation: 4100,
    difficulty: 'Экстремальный',
    status: 'upcoming',
    participants: 64,
    maxParticipants: 100,
    description: 'Ультрамарафон в горном районе Безенги — «Маленькие Гималаи». Технически сложный маршрут с несколькими высокогорными перевалами.',
    routeDescription: 'Старт от альплагеря Безенги (2200 м). Подъём через три перевала: Укю (3800 м), Цаннер (4100 м) и Гюльчи (3900 м). Сложный рельеф, морены, ледниковые языки.',
    checkpoints: [
      { name: 'Альплагерь Безенги', distance: 0, elevation: 2200 },
      { name: 'Перевал Укю', distance: 15, elevation: 3800 },
      { name: 'Перевал Цаннер', distance: 28, elevation: 4100 },
      { name: 'Долина', distance: 38, elevation: 2600 },
      { name: 'Перевал Гюльчи', distance: 45, elevation: 3900 },
      { name: 'Финиш', distance: 55, elevation: 2200 },
    ],
    elevationProfile: [
      { x: 0, y: 2200 }, { x: 8, y: 3000 }, { x: 15, y: 3800 }, { x: 20, y: 3200 },
      { x: 28, y: 4100 }, { x: 33, y: 3000 }, { x: 38, y: 2600 }, { x: 45, y: 3900 },
      { x: 50, y: 3200 }, { x: 55, y: 2200 }
    ],
  },
  {
    id: 6,
    name: 'Красная Поляна Вертикаль',
    date: '2026-05-18',
    location: 'Красная Поляна, Сочи',
    region: 'Краснодарский край',
    distance: 5,
    elevationGain: 1000,
    maxElevation: 2320,
    difficulty: 'Средний',
    status: 'finished',
    participants: 320,
    maxParticipants: 320,
    description: 'Популярная вертикальная гонка на горнолыжном курорте Красная Поляна. Открывает сезон соревнований на юге России.',
    routeDescription: 'Старт у подножия горы Аибга (1320 м). Подъём по горнолыжным трассам и внетрассовым склонам. Финиш на вершине Аибга (2320 м).',
    checkpoints: [
      { name: 'Старт Аибга', distance: 0, elevation: 1320 },
      { name: 'Промежуточный', distance: 2.5, elevation: 1820 },
      { name: 'Финиш вершина', distance: 5, elevation: 2320 },
    ],
    elevationProfile: [
      { x: 0, y: 1320 }, { x: 1, y: 1550 }, { x: 2.5, y: 1820 },
      { x: 3.5, y: 2000 }, { x: 5, y: 2320 }
    ],
  },
];

export const results: Result[] = [
  { id: 1, raceId: 4, raceName: 'Фишт Скайрейс', date: '2026-06-28', place: 1, athleteName: 'Алексей Воронов', country: 'RU', time: '4:23:17', timeSeconds: 15797, category: 'Мужчины' },
  { id: 2, raceId: 4, raceName: 'Фишт Скайрейс', date: '2026-06-28', place: 2, athleteName: 'Дмитрий Слободчиков', country: 'RU', time: '4:31:44', timeSeconds: 16304, category: 'Мужчины' },
  { id: 3, raceId: 4, raceName: 'Фишт Скайрейс', date: '2026-06-28', place: 3, athleteName: 'Асланбек Тлехурай', country: 'RU', time: '4:38:02', timeSeconds: 16682, category: 'Мужчины' },
  { id: 4, raceId: 4, raceName: 'Фишт Скайрейс', date: '2026-06-28', place: 4, athleteName: 'Тимур Ахмедов', country: 'RU', time: '4:45:19', timeSeconds: 17119, category: 'Мужчины' },
  { id: 5, raceId: 4, raceName: 'Фишт Скайрейс', date: '2026-06-28', place: 5, athleteName: 'Иван Рябов', country: 'RU', time: '4:52:31', timeSeconds: 17551, category: 'Мужчины' },
  { id: 6, raceId: 4, raceName: 'Фишт Скайрейс', date: '2026-06-28', place: 1, athleteName: 'Марина Коваль', country: 'RU', time: '5:11:04', timeSeconds: 18664, category: 'Женщины' },
  { id: 7, raceId: 4, raceName: 'Фишт Скайрейс', date: '2026-06-28', place: 2, athleteName: 'Елена Петрова', country: 'RU', time: '5:24:38', timeSeconds: 19478, category: 'Женщины' },
  { id: 8, raceId: 4, raceName: 'Фишт Скайрейс', date: '2026-06-28', place: 3, athleteName: 'Анна Степнова', country: 'RU', time: '5:39:12', timeSeconds: 20352, category: 'Женщины' },
  { id: 9, raceId: 6, raceName: 'Красная Поляна Вертикаль', date: '2026-05-18', place: 1, athleteName: 'Алексей Воронов', country: 'RU', time: '42:18', timeSeconds: 2538, category: 'Мужчины' },
  { id: 10, raceId: 6, raceName: 'Красная Поляна Вертикаль', date: '2026-05-18', place: 2, athleteName: 'Марат Исаев', country: 'RU', time: '43:51', timeSeconds: 2631, category: 'Мужчины' },
  { id: 11, raceId: 6, raceName: 'Красная Поляна Вертикаль', date: '2026-05-18', place: 3, athleteName: 'Роман Гришин', country: 'RU', time: '44:07', timeSeconds: 2647, category: 'Мужчины' },
  { id: 12, raceId: 6, raceName: 'Красная Поляна Вертикаль', date: '2026-05-18', place: 1, athleteName: 'Марина Коваль', country: 'RU', time: '51:22', timeSeconds: 3082, category: 'Женщины' },
  { id: 13, raceId: 6, raceName: 'Красная Поляна Вертикаль', date: '2026-05-18', place: 2, athleteName: 'Ольга Федосеева', country: 'RU', time: '53:44', timeSeconds: 3224, category: 'Женщины' },
  { id: 14, raceId: 6, raceName: 'Красная Поляна Вертикаль', date: '2026-05-18', place: 3, athleteName: 'Светлана Назарова', country: 'RU', time: '55:01', timeSeconds: 3301, category: 'Женщины' },
];

export const athletes: Athlete[] = [
  { id: 1, name: 'Алексей Воронов', country: 'RU', age: 28, totalPoints: 1240, wins: 4, podiums: 8, races: 12 },
  { id: 2, name: 'Марина Коваль', country: 'RU', age: 25, totalPoints: 1180, wins: 3, podiums: 7, races: 11 },
  { id: 3, name: 'Дмитрий Слободчиков', country: 'RU', age: 31, totalPoints: 980, wins: 2, podiums: 6, races: 14 },
  { id: 4, name: 'Асланбек Тлехурай', country: 'RU', age: 24, totalPoints: 870, wins: 1, podiums: 5, races: 9 },
  { id: 5, name: 'Марат Исаев', country: 'RU', age: 29, totalPoints: 760, wins: 1, podiums: 4, races: 10 },
  { id: 6, name: 'Елена Петрова', country: 'RU', age: 27, totalPoints: 710, wins: 1, podiums: 4, races: 8 },
  { id: 7, name: 'Роман Гришин', country: 'RU', age: 33, totalPoints: 680, wins: 0, podiums: 4, races: 13 },
  { id: 8, name: 'Тимур Ахмедов', country: 'RU', age: 26, totalPoints: 640, wins: 0, podiums: 3, races: 9 },
  { id: 9, name: 'Анна Степнова', country: 'RU', age: 30, totalPoints: 590, wins: 0, podiums: 3, races: 7 },
  { id: 10, name: 'Ольга Федосеева', country: 'RU', age: 23, totalPoints: 540, wins: 0, podiums: 3, races: 6 },
];

export const difficultyColor: Record<Difficulty, string> = {
  'Начинающий': 'text-green-400 bg-green-400/10',
  'Средний': 'text-yellow-400 bg-yellow-400/10',
  'Сложный': 'text-orange-400 bg-orange-400/10',
  'Экстремальный': 'text-red-400 bg-red-400/10',
};
