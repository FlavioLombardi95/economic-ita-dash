import type { IndicatorMeta } from './types';

export const INDICATORS: IndicatorMeta[] = [
  {
    id: 'income',
    title: 'Il reddito reale è cresciuto?',
    description:
      'Il reddito disponibile reale pro capite (anno base 2000) mostra il potere d’acquisto del cittadino medio. L’andamento riflette le crisi del 2008 e del 2012 e la ripresa successiva, con un calo nel 2020 e una parziale ripresa.',
  },
  {
    id: 'wages',
    title: 'Il problema dei salari italiani',
    description:
      'I salari reali (deflazionati) sono rimasti pressoché stagnanti per oltre vent’anni. La crescita modesta rispetto all’inflazione, soprattutto dopo il 2022, ha eroso il potere d’acquisto dei lavoratori.',
  },
  {
    id: 'inflation',
    title: 'Le crisi economiche e il carovita',
    description:
      'L’inflazione (indice dei prezzi al consumo, variazione percentuale annua) è rimasta contenuta per anni. Picchi nel 2008, 2012 e soprattutto nel 2022 con lo shock energetico e post-pandemia.',
  },
  {
    id: 'employment',
    title: 'Lavoro e occupazione',
    description:
      'Il tasso di occupazione (15-64 anni) è un indicatore chiave del mercato del lavoro. Dopo il calo durante la crisi del debito, è risalito fino a superare il 61% nel 2022-2023.',
  },
  {
    id: 'consumption',
    title: 'Consumi e percezione del benessere',
    description:
      'I consumi reali delle famiglie (anno base 2000) riflettono la fiducia e la capacità di spesa. Il crollo nel 2020 e la ripresa successiva mostrano l’impatto della pandemia e degli shock successivi.',
  },
  {
    id: 'poverty',
    title: 'Fragilità sociale',
    description:
      'La percentuale di persone a rischio di povertà o esclusione sociale è aumentata dopo la crisi del 2012, toccando livelli molto alti, e solo di recente ha iniziato a ridursi.',
  },
];
