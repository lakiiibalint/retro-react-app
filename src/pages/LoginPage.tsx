import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';

import { Button, ButtonVariants } from '@/src/components';
import { Input } from '@/src/components/input/Input';
import { AppDispatch } from '@/src/store/store';
import { login } from '@/src/utils/auth.utils';
import yup from '@/src/utils/yup';

const loginSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export type LoginFormType = yup.InferType<typeof loginSchema>;

export const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({ resolver: yupResolver(loginSchema) });

  const handleLogin = async (data: LoginFormType) => {
    // TODO - try/catch-el hibaüzenet, ha rossz a jelszo/mail
    await dispatch(login(data.email, data.password));
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-120 rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleLogin)}>
          <div className="flex justify-center">
            <h1 className="text-lg font-semibold text-gray-600 uppercase">{t('COMMON.AUTH.LOGIN_TITLE')}</h1>
          </div>
          <Input
            name="email"
            type="email"
            control={control}
            label={t('COMMON.AUTH.EMAIL_LABEL')}
            placeholder={t('COMMON.AUTH.EMAIL_PLACEHOLDER')}
            errorMessage={errors.email?.message}
          />
          <Input
            name="password"
            type="password"
            control={control}
            label={t('COMMON.AUTH.PASSWORD_LABEL')}
            placeholder={t('COMMON.AUTH.PASSWORD_PLACEHOLDER')}
            errorMessage={errors.password?.message}
          />
          <Button type="submit" className="mt-5" variant={ButtonVariants.PRIMARY} disabled={isSubmitting}>
            {t('COMMON.BUTTONS.LOGIN')}
          </Button>
        </form>
        <Link to={'/register'}>
          <Button className="mt-4 underline" variant={ButtonVariants.GHOST}>
            {t('COMMON.BUTTONS.NO_ACCOUNT')}
          </Button>
        </Link>
      </div>
    </div>
  );
};
