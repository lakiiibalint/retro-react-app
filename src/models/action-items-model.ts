export enum ActionItemStatus {
  TODO = 0,
  DONE = 2,
}

export const actionItemStatusMap: Record<string, ActionItemStatus> = {
  ToDo: ActionItemStatus.TODO,
  Done: ActionItemStatus.DONE,
};

export interface ActionItemModel {
  actionId: string;
  name: string;
  description?: string;
  status: string;
  dueDate?: string;
  boardId: string;
  assignedId?: string;
  projectId: string;
}
