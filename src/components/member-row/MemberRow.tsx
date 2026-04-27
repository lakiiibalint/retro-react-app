import { Button, ButtonVariants } from '@/src/components/button/Button';
import { UserModel } from '@/src/models/user.model';

interface MemberRowProps {
  user: UserModel;
  onClick: (userId: number) => void;
  actionLabel: string;
  actionClassName?: string;
  variant?: ButtonVariants;
}

export const MemberRow = ({
  user,
  onClick,
  actionLabel,
  actionClassName,
  variant = ButtonVariants.GHOST,
}: MemberRowProps) => {
  const handleClick = () => {
    onClick(user.id);
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 py-2">
      <div>
        <p className="text-sm font-medium text-gray-800">{user.username}</p>
        <p className="text-xs text-gray-400">
          {user.email} • {user.role}
        </p>
      </div>
      <Button variant={variant} className={actionClassName} onClick={handleClick}>
        {actionLabel}
      </Button>
    </div>
  );
};
