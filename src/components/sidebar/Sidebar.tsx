import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { Button, ButtonVariants } from '@/src/components/button/Button';
import { useAuth } from '@/src/queries/useAuth';
import { AppDispatch } from '@/src/store/store';
import { logout } from '@/src/utils/auth.utils';

export const Sidebar = () => {
  const { isPM, user } = useAuth();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'rounded-lg px-4 py-2 font-medium transition hover:bg-blue-100 hover:text-blue-800',
      isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-800'
    );

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <aside className="flex w-40 flex-col justify-between border-r border-gray-300 bg-white p-3 md:w-60 md:p-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold text-blue-800">{t('COMMON.APP_NAME')}</h2>
        <nav aria-label={t('COMMON.NAV.MAIN_MENU')} className="flex flex-col gap-3">
          <NavLink to="/" className={getNavClass}>
            {t('COMMON.NAV.PROJECTS')}
          </NavLink>
          {isPM && (
            <NavLink to="/users" className={getNavClass}>
              {t('COMMON.NAV.USERS')}
            </NavLink>
          )}
        </nav>
      </div>
      <div className="mt-6 flex flex-col gap-2 border-t border-gray-200 pt-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full bg-blue-200" />
          <div>
            <p className="text-sm font-medium text-gray-800">{t('COMMON.AUTH.LOGGED_IN_AS')}</p>
            <p className="text-sm text-gray-500">{user?.username}</p>
          </div>
        </div>
        <Button variant={ButtonVariants.GHOST} className="w-full text-red-500 hover:bg-red-50" onClick={handleLogout}>
          {t('COMMON.BUTTONS.LOGOUT')}
        </Button>
      </div>
    </aside>
  );
};
