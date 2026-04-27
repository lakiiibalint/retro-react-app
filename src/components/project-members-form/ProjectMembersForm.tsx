import { useTranslation } from 'react-i18next';

import { ButtonVariants } from '@/src/components/button/Button';
import { MemberRow } from '@/src/components/member-row/MemberRow';
import { UserModel } from '@/src/models/user.model';
import { useAddMembers } from '@/src/queries/useAddMembers';
import { useAuth } from '@/src/queries/useAuth';
import { useRemoveMember } from '@/src/queries/useRemoveMember';
import { useUsers } from '@/src/queries/useUsers';

interface projectMembersFormProps {
  projectId: string;
  members: UserModel[];
}

export const ProjectMembersForm = ({ projectId, members }: projectMembersFormProps) => {
  const { mutate: addMembers } = useAddMembers(projectId);
  const { mutate: removeMembers } = useRemoveMember(projectId);
  const { data: allUsers } = useUsers();

  const { t } = useTranslation();

  const { user: currentUser } = useAuth();

  const handleAddMember = (userId: number) => {
    addMembers([userId]);
  };

  const handleRemoveMember = (userId: number) => {
    removeMembers(userId);
  };

  const filteredMembers = members.filter((member) => member.id !== currentUser?.id);

  const availableUsers =
    allUsers?.items?.filter(
      (user) => user.id !== currentUser?.id && !members.some((member) => member.id === user.id)
    ) ?? [];
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-gray-200 p-3 shadow">
      <h3 className="text-sm font-semibold text-gray-800 uppercase">{t('PROJECTS.SETTINGS.CURRENT_MEMBER_DELETE')}</h3>
      {members.length === 0 && (
        <p className="overflow-y-auto text-sm text-gray-400">{t('PROJECTS.SETTINGS.MEMBERS_EMPTY')}</p>
      )}
      <div className="flex max-h-45 flex-col gap-2 overflow-y-auto">
        {filteredMembers.map((member) => (
          <MemberRow
            key={member.id}
            user={member}
            onClick={handleRemoveMember}
            actionLabel={t('COMMON.BUTTONS.DELETE')}
            actionClassName="bg-red-500 text-sm text-white transition hover:bg-red-600"
          />
        ))}
      </div>

      <div className="flex max-h-50 flex-col gap-2 overflow-y-auto">
        {availableUsers.map((user) => (
          <MemberRow
            key={user.id}
            user={user}
            onClick={handleAddMember}
            actionLabel={t('PROJECTS.ADD_MEMBER')}
            variant={ButtonVariants.PRIMARY}
            actionClassName="text-sm"
          />
        ))}
      </div>
    </div>
  );
};
