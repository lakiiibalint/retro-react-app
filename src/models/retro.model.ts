export enum RetroStatus {
  ACTIVE = 'Active',
  CLOSED = 'Closed',
  PENDING = 'Pending',
}

export interface RetroModel {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean | null;
  status?: RetroStatus;
  projectId: string;
  startsAt?: string;
  startedAt: string | null;
  closedAt: string | null;
  noteCount?: number;
  actionItemCount?: number;
}
