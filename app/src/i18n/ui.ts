// ALL user-facing UI strings live here. Content text lives in ../content/.
export const languages = { en: 'English', ta: 'தமிழ்' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'site.title': 'Linga Bhairavi',
    'site.tagline': 'Placeholder tagline',
    'nav.home': 'Home',
    'nav.names': '33 Names',
    'nav.sit': 'Sit with Her',
    'nav.calendar': 'Calendar',
    'nav.lang': 'தமிழ்',
    'nav.skip': 'Skip to content',
    'home.today': 'Today’s name',
    'home.today.hint': 'One name a day, the same for everyone in India today.',
    'names.title': 'The 33 Names',
    'names.meaning': 'Meaning',
    'names.reflection': 'Reflection',
    'names.chant': 'Chant',
    'names.sources': 'Sources',
    'names.prev': 'Previous',
    'names.next': 'Next',
    'names.all': 'All names',
    'names.share': 'Share on WhatsApp',
    'sit.title': 'Sit with Her',
    'sit.intro': 'Placeholder: a quiet page for a few minutes of stillness. Works offline.',
    'lamp.light': 'Light the lamp',
    'lamp.lit': 'The lamp is lit',
    'lamp.last': 'Last lit',
    'lamp.never': 'Not lit yet on this phone',
    'mala.title': 'Mala',
    'mala.count': 'Count',
    'mala.rounds': 'Rounds',
    'mala.tap': 'Tap for each bead',
    'mala.reset': 'Reset',
    'mala.done': 'One mala complete',
    'cal.title': 'Calendar',
    'cal.intro': 'Pournami, Amavasya and Navaratri. Dates are in India time.',
    'cal.upcoming': 'Upcoming',
    'cal.fixture': 'Sample data: the real calendar is being prepared.',
    'fixture.names': 'Sample names shown: the real 33 names are being prepared.',
    'offline.ready': 'Ready to read without internet',
    'footer.note': 'A devotional offering. Placeholder footer.',
  },
  ta: {
    'site.title': 'லிங்க பைரவி',
    'site.tagline': 'மாதிரி வாசகம்',
    'nav.home': 'முகப்பு',
    'nav.names': '33 திருநாமங்கள்',
    'nav.sit': 'அவளுடன் அமர்க',
    'nav.calendar': 'நாட்காட்டி',
    'nav.lang': 'English',
    'nav.skip': 'உள்ளடக்கத்திற்குச் செல்',
    'home.today': 'இன்றைய நாமம்',
    'home.today.hint': 'தினம் ஒரு நாமம்; இன்று இந்தியாவில் அனைவருக்கும் ஒன்றே.',
    'names.title': '33 திருநாமங்கள்',
    'names.meaning': 'பொருள்',
    'names.reflection': 'சிந்தனை',
    'names.chant': 'உச்சாடனம்',
    'names.sources': 'ஆதாரங்கள்',
    'names.prev': 'முந்தையது',
    'names.next': 'அடுத்தது',
    'names.all': 'அனைத்து நாமங்கள்',
    'names.share': 'வாட்ஸ்அப்பில் பகிர்',
    'sit.title': 'அவளுடன் அமர்க',
    'sit.intro': 'மாதிரி: சில நிமிட அமைதிக்கான பக்கம். இணையம் இல்லாமலும் இயங்கும்.',
    'lamp.light': 'விளக்கேற்று',
    'lamp.lit': 'விளக்கு ஏற்றப்பட்டது',
    'lamp.last': 'கடைசியாக ஏற்றியது',
    'lamp.never': 'இந்த தொலைபேசியில் இன்னும் ஏற்றவில்லை',
    'mala.title': 'ஜபமாலை',
    'mala.count': 'எண்ணிக்கை',
    'mala.rounds': 'சுற்றுகள்',
    'mala.tap': 'ஒவ்வொரு மணிக்கும் தொடவும்',
    'mala.reset': 'மீட்டமை',
    'mala.done': 'ஒரு மாலை நிறைவு',
    'cal.title': 'நாட்காட்டி',
    'cal.intro': 'பௌர்ணமி, அமாவாசை, நவராத்திரி. நேரம் இந்திய நேரப்படி.',
    'cal.upcoming': 'வரவிருப்பவை',
    'cal.fixture': 'மாதிரித் தரவு: உண்மையான நாட்காட்டி தயாராகிறது.',
    'fixture.names': 'மாதிரி நாமங்கள்: உண்மையான 33 நாமங்கள் தயாராகின்றன.',
    'offline.ready': 'இணையம் இல்லாமல் படிக்கத் தயார்',
    'footer.note': 'பக்திச் சமர்ப்பணம். மாதிரி அடிக்குறிப்பு.',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];
export const t = (lang: Lang) => (key: UIKey): string => ui[lang][key] ?? ui[defaultLang][key];

type Localized = string | { en?: string; ta?: string } | undefined;
/** Pick a content field for a language, falling back to English. */
export const loc = (v: Localized, lang: Lang): string | undefined =>
  v == null ? undefined : typeof v === 'string' ? v : (v[lang] ?? v.en);

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'ta' : 'en');
/** Same page, other language: /en/names/x/ -> /ta/names/x/ */
export const switchPath = (path: string, to: Lang) => path.replace(/^\/(en|ta)(?=\/|$)/, `/${to}`);
export const getStaticLangPaths = () => (Object.keys(languages) as Lang[]).map((lang) => ({ params: { lang } }));
