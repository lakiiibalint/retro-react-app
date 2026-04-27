import { RetroStatus } from '@/src/models/retro.model';

export const getRetroStatus = (startedAt: string | null, closedAt: string | null): RetroStatus => {
  if (closedAt) return RetroStatus.CLOSED;
  if (startedAt) return RetroStatus.ACTIVE;
  return RetroStatus.PENDING;
};
