import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonVariants } from '@/src/components';
import { Modal } from '@/src/components/modal/Modal';
import { Sidebar } from '@/src/components/sidebar/Sidebar';
import { UserRow } from '@/src/components/user-row/UserRow';
import { UserRole } from '@/src/models/user.model';
import { useAuth } from '@/src/queries/useAuth';
import { useDeleteUser } from '@/src/queries/useDeleteUser';
import { useUpdateUserRole } from '@/src/queries/useUpdateUserRole';
import { useUsers } from '@/src/queries/useUsers';

export const UsersPage = () => {
  const { t } = useTranslation();

  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: updateUserRole } = useUpdateUserRole();
  const { data: allUsers } = useUsers();
  const { user: currentUser } = useAuth();

  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const allAvailableUsers = allUsers?.items?.filter((user) => user.id !== currentUser?.id);

  const handleOpenDeleteModal = (userId: number) => setUserToDelete(userId);

  const handleCloseDeleteModal = () => setUserToDelete(null);

  const handleRoleChange = (userId: number, role: UserRole) => {
    updateUserRole({ userId: userId, role: role });
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;

    deleteUser(userToDelete);

    setUserToDelete(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="max-w-8xl flex min-h-[95vh] w-full overflow-hidden rounded-3xl bg-white shadow-2xl">
        <Sidebar />
        <main className="flex-1 space-y-12 bg-gray-50 p-8">
          <div className="rounded-2xl border border-gray-200 p-3 shadow">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500 uppercase">
                    {t('USERS.NAME')}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500 uppercase">
                    {t('USERS.ROLE')}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500 uppercase">
                    {t('USERS.EMAIL')}
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {allAvailableUsers?.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onDelete={user.role === 'User' ? handleOpenDeleteModal : undefined}
                    onRoleChange={handleRoleChange}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <Modal
          show={userToDelete !== null}
          onClose={handleCloseDeleteModal}
          title={t('RETRO.NOTES.DELETE_MODAL.TITLE')}
        >
          <div className="mt-2 flex justify-start gap-2">
            <Button
              variant={ButtonVariants.PRIMARY}
              className="bg-red-500 transition hover:bg-red-600"
              onClick={handleConfirmDelete}
            >
              {t('COMMON.BUTTONS.DELETE')}
            </Button>
            <Button variant={ButtonVariants.PRIMARY} onClick={handleCloseDeleteModal}>
              {t('COMMON.BUTTONS.CANCEL')}
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
