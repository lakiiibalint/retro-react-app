import { mockUsers } from '@/src/mocks/users.mock';
import { ProjectModel } from '@/src/models/project.model';
export const mockProjects: ProjectModel[] = [
  {
    id: '1',
    name: 'Phoenix Platform',
    description: 'Backend refaktor és microservice migráció',
    isActive: true,
    users: [mockUsers[0], mockUsers[1], mockUsers[2]],
    lastRetroDate: '2025-01-20',
    coverImage:
      'https://img.freepik.com/premium-photo/phoenix-bird-fire-mythological-fenix-bird-with-flames-fantasy-illustration_691560-3576.jpg?w=1060',
  },
  {
    id: '2',
    name: 'Mobile App v3',
    description: 'iOS és Android natív alkalmazás fejlesztés',
    isActive: false,
    users: [mockUsers[0]],
    lastRetroDate: '2025-01-10',
    coverImage: 'https://picsum.photos/seed/mobile/400/200',
  },
  {
    id: '3',
    name: 'Data Pipeline',
    description: 'ETL folyamatok modernizálása',
    isActive: false,
    users: [],
    lastRetroDate: '2024-12-18',
    coverImage: 'https://picsum.photos/seed/data/400/200',
  },
];
