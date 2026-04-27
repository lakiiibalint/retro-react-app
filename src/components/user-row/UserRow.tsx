import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconName, IconSize } from '@/src/assets/iconCollection';
import { Button } from '@/src/components/button/Button';
import { Icon } from '@/src/components/icon/Icon';
import { UserModel, UserRole } from '@/src/models/user.model';

interface UserRowProps {
  user: UserModel;
  onDelete?: (userId: number) => void;
  onRoleChange: (userId: number, role: UserRole) => void;
}

export const UserRow = ({ user, onDelete, onRoleChange }: UserRowProps) => {
  const { t } = useTranslation();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => setShowDropdown((prev) => !prev);
  const handleCloseDropdown = () => setShowDropdown(false);

  const handleRoleChange = () => {
    onRoleChange(user.id, user.role === 'PM' ? 'User' : 'PM');
    handleCloseDropdown();
  };
  const handleDelete = () => {
    if (!onDelete) return;
    onDelete(user.id);
    handleCloseDropdown();
  };

  return (
    <tr className="border-b border-gray-200 transition hover:bg-gray-200">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 shrink-0 rounded-full bg-blue-200" />
          <div>
            <p className="font-medium text-gray-800">{user.username}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-gray-500">{user.role}</td>
      <td className="text-sm text-gray-500">{user.email}</td>
      <td className="px-4 py-3 text-right">
        <div className="relative inline-block">
          <Button onClick={handleToggleDropdown} className="cursor-pointer rounded-md p-1 hover:bg-gray-300">
            <Icon name={IconName.DROPDOWN} color={'blue'} size={IconSize.LG} />
          </Button>
          {showDropdown && (
            <>
              <div className="fixed inset-0 z-0" onClick={handleCloseDropdown} />

              <div className="absolute top-8 right-0 z-10 w-48 rounded-xl border border-gray-200 bg-white shadow-lg">
                <Button
                  onClick={handleRoleChange}
                  className="w-full cursor-pointer px-4 py-2 text-left text-gray-700 hover:rounded-xl hover:bg-blue-50"
                >
                  {t('USERS.ROLE_CHANGE')}
                </Button>
                {onDelete && (
                  <Button
                    onClick={handleDelete}
                    className="w-full cursor-pointer px-4 py-2 text-left text-red-500 hover:rounded-xl hover:bg-red-50"
                  >
                    {t('COMMON.BUTTONS.DELETE')}
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
