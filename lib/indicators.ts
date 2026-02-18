import type { IndicatorMeta } from './types';

export const INDICATORS: IndicatorMeta[] = [
  {
    id: 'income',
    title: 'Quanto è aumentato (o diminuito) il reddito in Italia?',
    description:
      'Il grafico mostra quanto è cambiato il reddito medio degli italiani, considerando il carovita. Se la linea sale, in media la gente ha più soldi da spendere; se scende, ne ha meno. Si vedono bene i cali dopo le crisi del 2008 e 2012 e il colpo del 2020.',
    takeaway: 'In pratica: oggi il reddito medio è poco più alto che nel 2000, ma con molti alti e bassi nel mezzo.',
  },
  {
    id: 'wages',
    title: 'Gli stipendi sono davvero cresciuti?',
    description:
      'Qui si guardano i salari “al netto del carovita”: cioè quanto puoi comprare con quello che prendi, non il numero in busta. Se i prezzi salgono e lo stipendio no, in realtà compri meno.',
    takeaway: 'In pratica: in vent’anni gli stipendi (in termini di cosa ci compri) sono quasi fermi. I rincari se li sono mangiati.',
  },
  {
    id: 'inflation',
    title: 'Quanto sono aumentati i prezzi?',
    description:
      'L’inflazione è l’aumento dei prezzi di quello che compri tutti i giorni: spesa, bollette, benzina. Il grafico mostra di quanto sono saliti i prezzi ogni anno. Quando la linea va in alto, la vita costa di più.',
    takeaway: 'In pratica: dopo anni di prezzi stabili, nel 2022 tutto è costato molto di più in pochi mesi.',
  },
  {
    id: 'employment',
    title: 'Quante persone hanno un lavoro?',
    description:
      'La linea indica quante persone in età da lavoro (fra 15 e 64 anni) hanno un’occupazione. Più alta è, più gente lavora; quando scende, vuol dire che il lavoro scarseggia.',
    takeaway: 'In pratica: dopo la crisi del 2012 il lavoro era crollato; negli ultimi anni è risalito e ora siamo sopra il 61%.',
  },
  {
    id: 'consumption',
    title: 'Quanto spendono le famiglie?',
    description:
      'Quanto le famiglie italiane spendono davvero (aggiustato per il carovita). Se la gente si sente sicura e ha soldi, spende; se ha paura o non arriva a fine mese, stringe la cinghia.',
    takeaway: 'In pratica: nel 2020 la spesa è crollata; poi è risalita, ma con alti e bassi.',
  },
  {
    id: 'poverty',
    title: 'Quante persone sono in difficoltà economica?',
    description:
      'La linea mostra la percentuale di persone che sono in povertà o in una situazione molto fragile (reddito basso, non riescono a far fronte alle spese, poco lavoro). Più alta è la linea, più famiglie soffrono.',
    takeaway: 'In pratica: dopo il 2012 le difficoltà sono aumentate molto; da qualche anno la situazione sta migliorando un po’.',
  },
];

export function getIndicatorById(id: IndicatorMeta['id']): IndicatorMeta | undefined {
  return INDICATORS.find((i) => i.id === id);
}
