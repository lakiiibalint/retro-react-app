import { Route, Routes } from 'react-router';

import { PMRoute } from '@/src/components/pm-route/PMRoute';
import { ProtectedRoute } from '@/src/components/protected-route/ProtectedRoute';
import { LoginPage } from '@/src/pages/LoginPage';
import { ProjectDetailPage } from '@/src/pages/ProjectDetailPage';
import ProjectsPage from '@/src/pages/ProjectsPage';
import { RegisterPage } from '@/src/pages/RegisterPage';
import { RetroBoardPage } from '@/src/pages/RetroBoardPage';
import { UsersPage } from '@/src/pages/UsersPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ProjectsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id/retros/:retroId"
        element={
          <ProtectedRoute>
            <RetroBoardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <PMRoute>
              <UsersPage />
            </PMRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
