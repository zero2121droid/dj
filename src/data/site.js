// Shared content for the Klub redesign. Add new gigs, mixes and articles here.

export const CONTACT = {
  email: 'djdekli996@gmail.com',
  instagram: 'jorgacevicdj',
  tiktok: 'jorgacevicdj',
  youtube: 'https://www.youtube.com/@JorgacevicDJ/videos',
};

// Newest first: the first mix is featured on Home and YouTube and loads first in the mini player.
export const MIXES = [
  { id: 'uHXUZfDbmKI', number: '008', title: 'Balkan Mix 008', artists: 'Jala&Buba, Teodora, Desingerica, 2soma' },
  { id: 'bXnClsjuhjE', number: '007', title: 'Balkan Mix 007', artists: 'Jala&Buba, Teodora, Nucci, Cunami, Coby' },
  { id: 'ErOt_ZTD3cs', number: '006', title: 'Balkan Mix 006', artists: 'Jala&Buba, Rasta, Nucci, Corona&Rimski' },
  { id: '1-ObER9kUb0', number: null, title: 'Viki - Maris li', artists: 'Jorgaćević & D.U.F.N. Afro Mashup' },
  { id: 'FUb43UZqrK4', number: '005', title: 'Balkan Club Mix 005', artists: 'Biba, Rasta, Tea, Corona&Rimski' },
  { id: 'uFHcia4IoGA', number: '004', title: 'Balkan Club Mix 004', artists: 'Nucci, Rasta, Relja, Corona&Rimski' },
];

export const ARTISTS = [
  'DJ Dea', 'Igor Garnier', 'DJ Architect', 'Geo Da Silva', 'Cavin Viviano', 'Erick Kasell',
  'Divolly & Markward', 'Raffa Guido', 'Coby', 'Edita', 'Biba', 'Voyage', 'Desingerica',
  'Tropico', 'Ema Raduljko', 'Mike Ride', 'Gru', 'Gazda Paja', 'Sanja Vučić',
];

export const GIGS = [
  { when: '02.10.26', title: 'TomorrowLE 2026', detail: 'La Casa, Leskovac · sa Raffa Guido', status: 'Održano' },
  { when: 'Rezident', title: 'La Casa', detail: 'Leskovac', status: 'Rezidencija' },
  { when: 'Rezident', title: 'Safari ABC', detail: 'Klub', status: 'Rezidencija' },
];

export const ARTICLES = [
  {
    title: 'TomorrowLE 2026: Raffa Guido & Dejan Jorgaćević | Leskovac, La Casa | 2. okt 2026.',
    source: 'urbanbug.net',
    url: 'https://urbanbug.net/desavanje/tomorrowle-2026-raffa-guido-dejan-jorgacevic-2026-10-02',
  },
];

export const PAGES = [
  { path: '/', name: 'Početna' },
  { path: '/gallery', name: 'Galerija' },
  { path: '/videos', name: 'YouTube' },
  { path: '/booking', name: 'Booking' },
];
