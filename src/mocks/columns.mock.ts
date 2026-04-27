import { ColumnModel } from '@/src/models/column.model';

export const mockColumns: ColumnModel[] = [
  {
    id: 1,
    name: 'Went well',
    position: 1,
    retroId: '1',
    columnType: 'WentWell',
  },
  {
    id: 2,
    name: 'To improve',
    position: 2,
    retroId: '1',
    columnType: 'ToImprove',
  },
  {
    id: 3,
    name: 'Action items',
    position: 3,
    retroId: '1',
    columnType: 'ActionItems',
  },
  {
    id: 4,
    name: 'Went well',
    position: 1,
    retroId: '2',
    columnType: 'WentWell',
  },
  {
    id: 5,
    name: 'To improve',
    position: 2,
    retroId: '2',
    columnType: 'ToImprove',
  },
  {
    id: 6,
    name: 'Action items',
    position: 3,
    retroId: '2',
    columnType: 'ActionItems',
  },
  {
    id: 7,
    name: 'Custom',
    position: 4,
    retroId: '2',
    columnType: 'Custom',
  },
];
