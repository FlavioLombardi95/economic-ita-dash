/**
 * Standard data point for all time series.
 * Used by every dataset in /data.
 */
export interface DataPoint {
  year: number;
  value: number;
}

/**
 * Dataset key names matching /data/*.json files.
 */
export type DatasetKey =
  | 'income'
  | 'wages'
  | 'inflation'
  | 'employment'
  | 'consumption'
  | 'poverty';

/**
 * Metadata for each indicator (title, description, unit).
 */
export interface IndicatorMeta {
  id: DatasetKey;
  title: string;
  description: string;
  unit?: string;
}
