export interface ColumnModel {
  id: number;
  name: string;
  position: number;
  retroId: string;
  columnType: string;
}

export enum ColumnType {
  ACTION_ITEMS = 'ActionItems',
  WENT_WELL = 'WentWell',
  TO_IMPROVE = 'ToImprove',
}
