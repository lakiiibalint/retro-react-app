import { mockColumns } from '@/src/mocks/columns.mock';
import { mockNotes } from '@/src/mocks/notes.mock';
import { mockRetros } from '@/src/mocks/retros.mock';
import { ProjectStatsModel } from '@/src/models/project-stats-model';
import { ProjectModel } from '@/src/models/project.model';
import { UserModel } from '@/src/models/user.model';
import request, { Methods } from '@/src/utils/request';
class ProjectService {
  async getProjects(): Promise<ProjectModel[]> {
    return request<ProjectModel[]>({
      resource: '/api/projects',
      method: Methods.GET,
    });
  }

  async addProject(body: {
    name: string;
    description: string;
    coverImage?: string;
    memberIds: number[];
  }): Promise<{ project: ProjectModel }> {
    return request<{ project: ProjectModel }>({
      resource: '/api/projects',
      method: Methods.POST,
      body: { ...body },
    });
  }

  async updateProject(
    id: string,
    body: {
      name?: string;
      description?: string;
      coverImage?: string;
    }
  ): Promise<ProjectModel> {
    return request<ProjectModel>({
      resource: `/api/projects/${id}`,
      method: Methods.PUT,
      body: { ...body },
    });
  }

  async getProjectById(id: string): Promise<ProjectModel> {
    return request<ProjectModel>({
      resource: `/api/projects/${id}`,
      method: Methods.GET,
    });
  }

  async deleteProject(id: string): Promise<void> {
    return request<void>({
      resource: `/api/projects/${id}`,
      method: Methods.DELETE,
    });
  }

  async addMembers(projectId: string, userIds: number[]): Promise<UserModel[]> {
    return request<UserModel[]>({
      resource: `/api/projects/${projectId}/members`,
      method: Methods.POST,
      body: userIds,
    });
  }

  async removeMember(projectId: string, userId: number): Promise<void> {
    return request<void>({
      resource: `/api/projects/${projectId}/members/${userId}`,
      method: Methods.DELETE,
    });
  }

  async getProjectStats(projectId: string): Promise<ProjectStatsModel> {
    //TODO - connect endpoints
    const projectRetros = mockRetros.filter((retro) => retro.projectId === projectId);
    const retroIds = projectRetros.map((retro) => retro.id);
    const projectNotes = mockNotes.filter((note) => retroIds.includes(note.retroId));
    const projectColumns = mockColumns.filter((column) => retroIds.includes(column.retroId));

    const columnMap: Record<string, number> = {};
    projectColumns.forEach((column) => {
      const noteCount = projectNotes.filter((note) => note.columnId === column.id).length;
      columnMap[column.name] = (columnMap[column.name] ?? 0) + noteCount;
    });

    const notesByColumn = Object.entries(columnMap).map(([columnName, count]) => ({ columnName, count }));

    const topVoted = [...projectNotes]
      .sort((a, b) => b.agree - a.agree)
      .slice(0, 3)
      .map((note) => ({ noteId: note.id, text: note.text, agree: note.agree, color: note.color }));

    const COLOR_NAMES: Record<string, string> = {
      '#DC2626': 'red',
      '#16A34A': 'green',
      '#2563EB': 'blue',
      '#dbd539': 'yellow',
    };

    const colorMap: Record<string, number> = {};
    projectNotes.forEach((note) => (colorMap[note.color] = (colorMap[note.color] ?? 0) + 1));

    const notesByColor = Object.entries(colorMap).map(([color, count]) => ({ color: COLOR_NAMES[color], count }));

    return Promise.resolve({
      notesByColumn,
      topVoted,
      retroCount: projectRetros.length,
      notesByColor,
    });
  }
}

export const projectService = new ProjectService();
