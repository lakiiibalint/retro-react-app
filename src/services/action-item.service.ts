import { mockActionItems } from '@/src/mocks/action-items.mock';
import { ActionItemModel, ActionItemStatus, actionItemStatusMap } from '@/src/models/action-items-model';
import request, { Methods } from '@/src/utils/request';

class ActionItemService {
  async getActionItems(projectId: string): Promise<ActionItemModel[]> {
    return Promise.resolve(mockActionItems.filter((actionitem) => actionitem.projectId === projectId));
  }

  async addActionItem(
    body: {
      name: string;
      description?: string;
      dueDate?: string;
      boardId: string;
      assignedId?: string;
      order?: string;
    },
    projectId: string
  ): Promise<ActionItemModel> {
    return request<ActionItemModel>({
      resource: '/api/action-items',
      method: Methods.POST,
      body: {
        name: body.name,
        description: body.description,
        position: body.order,
        status: ActionItemStatus.TODO,
        dueDate: body.dueDate ? new Date(body.dueDate).toISOString() : '',
        retroId: Number(body.boardId),
        assignedId: Number(body.assignedId),
      },
    });
  }

  async updateActionItem(
    actionId: string,
    body: {
      name?: string;
      description?: string;
      dueDate?: string;
      assignedId?: string;
      order?: string;
      status?: string;
    }
  ): Promise<ActionItemModel> {
    return request<ActionItemModel>({
      resource: `/api/action-items/${actionId}`,
      method: Methods.PUT,
      body: {
        name: body.name ?? '',
        description: body.description ?? '',
        position: '',
        status:
          body.status !== undefined
            ? (actionItemStatusMap[body.status] ?? ActionItemStatus.TODO)
            : ActionItemStatus.TODO,
        dueDate: body.dueDate ? new Date(body.dueDate).toISOString() : '',
        assignedId: Number(body.assignedId),
      },
    });
  }

  async noteToActionItem(
    noteId: string,
    body: {
      name?: string;
      description?: string;
      dueDate?: string;
      assignedId?: string;
      order?: string;
      status?: string;
    }
  ): Promise<ActionItemModel> {
    return request<ActionItemModel>({
      resource: `/api/notes/${noteId}/to-action`,
      method: Methods.POST,
      body: {
        name: body.name ?? '',
        description: body.description ?? '',
        position: '',
        status:
          body.status !== undefined
            ? (actionItemStatusMap[body.status] ?? ActionItemStatus.TODO)
            : ActionItemStatus.TODO,
        dueDate: body.dueDate ? new Date(body.dueDate).toISOString() : '',
        assignedUserId: Number(body.assignedId),
      },
    });
  }

  async deleteActionItem(actionId: string): Promise<void> {
    return request<void>({
      resource: `/api/action-items/${actionId}`,
      method: Methods.DELETE,
    });
  }
}

export const actionItemService = new ActionItemService();
