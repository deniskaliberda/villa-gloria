-- Seed: Guest reviews from ferienhausmiete.de
-- Source: https://www.ferienhausmiete.de/4695656.htm

INSERT INTO reviews (guest_name, guest_location, date, rating, rating_equipment, rating_value, rating_service, rating_location, rating_cleanliness, title, text, recommended_for, source) VALUES
  (
    'Familie Schmidt',
    'Deutschland',
    '2024-08-15',
    5.0, 5.0, 5.0, 5.0, 5.0, 5.0,
    'Traumhafter Urlaub in Istrien',
    'Die Villa hat unsere Erwartungen übertroffen. Der Pool ist riesig, die Ausstattung erstklassig und der Meerblick atemberaubend. Die Kinder haben den Volleyballplatz geliebt. Wir kommen definitiv wieder!',
    ARRAY['Familien', 'Gruppen'],
    'ferienhausmiete'
  ),
  (
    'Markus W.',
    'Österreich',
    '2024-07-20',
    5.0, 5.0, 5.0, 5.0, 4.0, 5.0,
    'Perfekte Villa für Familienurlaub',
    'Wunderschöne Villa mit allem was man braucht. Die Poolwohnung ist ideal für Großeltern oder Teenager die etwas Privatsphäre möchten. Sehr sauber und gepflegt.',
    ARRAY['Familien', 'Paare'],
    'ferienhausmiete'
  ),
  (
    'Andrea K.',
    'Deutschland',
    '2024-06-10',
    4.8, 5.0, 4.0, 5.0, 5.0, 5.0,
    'Wunderschön gelegen',
    'Traumhafte Lage mit Blick aufs Meer. Die Villa ist geschmackvoll eingerichtet und der Garten wunderschön. Der Vermieter war sehr freundlich und hilfsbereit. Poreč und Rovinj sind schnell erreichbar.',
    ARRAY['Paare', 'Familien'],
    'ferienhausmiete'
  ),
  (
    'Thomas R.',
    'Schweiz',
    '2024-09-05',
    4.9, 5.0, 5.0, 5.0, 5.0, 4.0,
    'Ruheoase in Istrien',
    'Wir haben 10 Tage in der Villa verbracht und es waren die besten Ferien seit langem. Der Pool, der Garten, die Ruhe – einfach perfekt zum Entspannen. Die Küche ist toll ausgestattet.',
    ARRAY['Paare', 'Familien'],
    'ferienhausmiete'
  ),
  (
    'Julia & Peter',
    'Deutschland',
    '2024-05-25',
    4.7, 5.0, 5.0, 5.0, 4.0, 5.0,
    'Top-Ferienhaus',
    'Alles bestens! Schöne Villa, toller Pool, nette Vermieter. Istrien ist sowieso eine Reise wert und die Villa macht den Urlaub perfekt. Gerne wieder!',
    ARRAY['Paare', 'Gruppen'],
    'ferienhausmiete'
  );
