import type { DatasetKey } from './types';

export interface ThemeMeta {
  slug: string;
  id: DatasetKey;
  label: string;
  shortDescription: string;
}

export const THEMES: ThemeMeta[] = [
  { slug: 'reddito', id: 'income', label: 'Reddito', shortDescription: 'Quanto è cambiato il reddito reale degli italiani' },
  { slug: 'salari', id: 'wages', label: 'Salari', shortDescription: 'Potere d’acquisto degli stipendi' },
  { slug: 'inflazione', id: 'inflation', label: 'Inflazione', shortDescription: 'Aumento dei prezzi anno su anno' },
  { slug: 'lavoro', id: 'employment', label: 'Lavoro', shortDescription: 'Occupazione e tasso di occupazione' },
  { slug: 'consumi', id: 'consumption', label: 'Consumi', shortDescription: 'Quanto spendono le famiglie' },
  { slug: 'poverta', id: 'poverty', label: 'Povertà', shortDescription: 'Rischio povertà e fragilità' },
];

const SLUG_SET = new Set(THEMES.map((t) => t.slug));

export function isValidThemeSlug(slug: string): slug is ThemeMeta['slug'] {
  return SLUG_SET.has(slug);
}

export function getThemeBySlug(slug: string): ThemeMeta | undefined {
  return THEMES.find((t) => t.slug === slug);
}

export function getThemeById(id: DatasetKey): ThemeMeta | undefined {
  return THEMES.find((t) => t.id === id);
}
