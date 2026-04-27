import { ColumnModel } from '@/src/models/column.model';
import { RetroBoardResponse } from '@/src/models/retro-board.model';
import { RetroModel } from '@/src/models/retro.model';
import request, { Methods } from '@/src/utils/request';

class RetroService {
  async getRetros(projectId: string): Promise<RetroModel[]> {
    return request<RetroModel[]>({
      resource: `/api/projects/${projectId}/retros`,
      method: Methods.GET,
    });
  }

  async getColumns(retroId: string): Promise<ColumnModel[]> {
    return request<ColumnModel[]>({
      resource: `/api/retros/${retroId}/columns`,
      method: Methods.GET,
    });
  }

  async getRetroById(projectId: string, retroId: string): Promise<RetroBoardResponse> {
    return request<RetroBoardResponse>({
      resource: `/api/projects/${projectId}/retros/${retroId}`,
      method: Methods.GET,
    });
  }

  async addRetro(
    projectId: string,
    body: {
      name: string;
      description?: string;
    }
  ): Promise<RetroModel> {
    return request<RetroModel>({
      resource: `/api/projects/${projectId}/retros`,
      method: Methods.POST,
      body,
    });
  }

  async updateRetro(projectId: string, retroId: string, isActive: boolean | null): Promise<RetroModel> {
    return request<RetroModel>({
      resource: `/api/projects/${projectId}/retros/${retroId}`,
      method: Methods.PATCH,
      body: { isActive },
    });
  }

  async deleteRetro(projectId: string, retroId: string): Promise<void> {
    return request<void>({
      resource: `/api/projects/${projectId}/retros/${retroId}`,
      method: Methods.DELETE,
    });
  }

  async addColumn(retroId: string, body: { name: string }): Promise<ColumnModel> {
    return request<ColumnModel>({
      resource: `/api/retros/${retroId}/columns`,
      method: Methods.POST,
      body: { name: body.name },
    });
  }

  async updateColumn(columndId: number, body: { name?: string }): Promise<ColumnModel> {
    return request<ColumnModel>({
      resource: `/api/columns/${columndId}`,
      method: Methods.PUT,
      body: { name: body.name },
    });
  }

  async deleteColumn(columnId: number): Promise<void> {
    return request<void>({
      resource: `/api/columns/${columnId}`,
      method: Methods.DELETE,
    });
  }

  async updateColumnPosition(columnId: number, swapWithColumnId: number): Promise<ColumnModel[]> {
    return request<ColumnModel[]>({
      resource: `/api/columns/${columnId}/swap`,
      method: Methods.POST,
      body: swapWithColumnId,
    });
  }
}
export const retroService = new RetroService();
