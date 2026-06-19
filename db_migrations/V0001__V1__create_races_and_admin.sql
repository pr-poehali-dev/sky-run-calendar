
CREATE TABLE t_p51933890_sky_run_calendar.races (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  location TEXT NOT NULL,
  region TEXT NOT NULL DEFAULT 'Кавказ',
  distance NUMERIC(6,1) NOT NULL,
  elevation_gain INT NOT NULL,
  max_elevation INT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'Средний',
  status TEXT NOT NULL DEFAULT 'upcoming',
  participants INT NOT NULL DEFAULT 0,
  max_participants INT NOT NULL DEFAULT 100,
  description TEXT NOT NULL DEFAULT '',
  route_description TEXT NOT NULL DEFAULT '',
  checkpoints JSONB NOT NULL DEFAULT '[]',
  elevation_profile JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO t_p51933890_sky_run_calendar.races
  (name, date, location, region, distance, elevation_gain, max_elevation, difficulty, status, participants, max_participants, description, route_description, checkpoints, elevation_profile)
VALUES
  ('Эльбрус Рейс','2026-07-12','Терскол, Кабардино-Балкария','Кавказ',21,3200,5642,'Экстремальный','registration',187,250,
   'Легендарная гонка на высшую точку Европы. Маршрут пролегает через ледники и снежные поля с набором высоты более 3200 метров.',
   'Старт у поляны Азау (2350 м). Подъём через Бочки (3750 м) и скалы Пастухова (4800 м) к Восточной вершине Эльбруса (5621 м).',
   '[{"name":"Поляна Азау","distance":0,"elevation":2350},{"name":"Станция Мир","distance":4,"elevation":3500},{"name":"Бочки","distance":6,"elevation":3750},{"name":"Скалы Пастухова","distance":10,"elevation":4800},{"name":"Седловина","distance":14,"elevation":5300},{"name":"Вершина Восточная","distance":17,"elevation":5621},{"name":"Финиш","distance":21,"elevation":2350}]',
   '[{"x":0,"y":2350},{"x":2,"y":2800},{"x":4,"y":3500},{"x":6,"y":3750},{"x":8,"y":4200},{"x":10,"y":4800},{"x":12,"y":5100},{"x":14,"y":5300},{"x":17,"y":5621},{"x":19,"y":4200},{"x":21,"y":2350}]'),

  ('Казбек Вертикальный Километр','2026-08-03','Степанцминда, Грузия','Кавказ',7,1000,4000,'Сложный','upcoming',92,150,
   'Классический вертикальный километр у подножия Казбека.',
   'Старт от монастыря Гергети (2170 м). Крутой подъём по травянистым склонам. Финиш на пике Самеба (3170 м).',
   '[{"name":"Монастырь Гергети","distance":0,"elevation":2170},{"name":"Травянистый гребень","distance":2,"elevation":2700},{"name":"Морены","distance":4.5,"elevation":3000},{"name":"Финиш Самеба","distance":7,"elevation":3170}]',
   '[{"x":0,"y":2170},{"x":1.5,"y":2500},{"x":3,"y":2800},{"x":4.5,"y":3000},{"x":6,"y":3100},{"x":7,"y":3170}]'),

  ('Домбай Трейл','2026-09-20','Домбай, Карачаево-Черкесия','Кавказ',42,2800,3200,'Сложный','upcoming',215,300,
   'Горный марафон по живописным долинам и перевалам Домбая.',
   'Старт в посёлке Домбай (1630 м). Подъём к леднику Алибек, перевал Алибек (3011 м), финиш в посёлке.',
   '[{"name":"Домбай","distance":0,"elevation":1630},{"name":"Ледник Алибек","distance":8,"elevation":2550},{"name":"Перевал Алибек","distance":12,"elevation":3011},{"name":"Долина Птыш","distance":22,"elevation":1800},{"name":"Перевал Птыш","distance":32,"elevation":3100},{"name":"Финиш Домбай","distance":42,"elevation":1630}]',
   '[{"x":0,"y":1630},{"x":5,"y":2000},{"x":8,"y":2550},{"x":12,"y":3011},{"x":17,"y":2200},{"x":22,"y":1800},{"x":27,"y":2400},{"x":32,"y":3100},{"x":37,"y":2200},{"x":42,"y":1630}]'),

  ('Фишт Скайрейс','2026-06-28','Адыгея','Краснодарский край',33,2100,2867,'Средний','finished',180,180,
   'Скайрейс по уникальному карстовому плато Лагонаки с финишем у горы Фишт.',
   'Старт с кордона Лагонаки (1700 м). Финальный штурм на вершину Фишт (2867 м).',
   '[{"name":"Кордон Лагонаки","distance":0,"elevation":1700},{"name":"Плато","distance":10,"elevation":2100},{"name":"Приют Фишт","distance":20,"elevation":2000},{"name":"Вершина Фишт","distance":28,"elevation":2867},{"name":"Финиш","distance":33,"elevation":1700}]',
   '[{"x":0,"y":1700},{"x":5,"y":1900},{"x":10,"y":2100},{"x":15,"y":2000},{"x":20,"y":2000},{"x":24,"y":2400},{"x":28,"y":2867},{"x":33,"y":1700}]'),

  ('Красная Поляна Вертикаль','2026-05-18','Красная Поляна, Сочи','Краснодарский край',5,1000,2320,'Средний','finished',320,320,
   'Популярная вертикальная гонка на горнолыжном курорте Красная Поляна.',
   'Старт у подножия горы Аибга (1320 м). Финиш на вершине Аибга (2320 м).',
   '[{"name":"Старт Аибга","distance":0,"elevation":1320},{"name":"Промежуточный","distance":2.5,"elevation":1820},{"name":"Финиш вершина","distance":5,"elevation":2320}]',
   '[{"x":0,"y":1320},{"x":1,"y":1550},{"x":2.5,"y":1820},{"x":3.5,"y":2000},{"x":5,"y":2320}]');

CREATE TABLE t_p51933890_sky_run_calendar.admin_sessions (
  token TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
