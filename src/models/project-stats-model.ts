export interface ProjectStatsModel {
  notesByColor: { color: string; count: number }[];
  notesByColumn: { columnName: string; count: number }[];
  topVoted: { noteId: string; text: string; agree: number; color: string }[];
  retroCount: number;
}
