import { RetroModel } from '@/src/models/retro.model';

export const mockRetros: RetroModel[] = [
  {
    id: '1',
    name: 'Sprint 24 Retrospektív',
    isActive: true,
    projectId: '1',
    startsAt: '2025-01-20',
    startedAt: '2025-01-20',
    closedAt: null,
    noteCount: 18,
    actionItemCount: 5,
  },
  {
    id: '2',
    name: 'Sprint 23 Retrospektív',
    isActive: null,
    projectId: '1',
    startsAt: '2025-01-06',
    startedAt: null,
    closedAt: null,
    noteCount: 22,
    actionItemCount: 7,
  },
  {
    id: '3',
    name: 'Sprint 22 Retrospektív',
    isActive: false,
    projectId: '1',
    startsAt: '2024-12-23',
    startedAt: '2024-12-23',
    closedAt: '2024-12-24',
    noteCount: 15,
    actionItemCount: 4,
  },
];
