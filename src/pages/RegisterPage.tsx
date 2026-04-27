import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';

import { Button, ButtonVariants } from '@/src/components';
import { Input } from '@/src/components/input/Input';
import { useRegister } from '@/src/queries/useRegister';
import yup from '@/src/utils/yup';

const registerSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
  name: yup.string().required(),
});

export type RegisterFormType = yup.InferType<typeof registerSchema>;

export const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutateAsync: register } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormType>({ resolver: yupResolver(registerSchema) });

  const handleRegister = async (data: RegisterFormType) => {
    await register({ email: data.email, password: data.password, name: data.name });
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-120 rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleRegister)}>
          <div className="flex justify-center">
            <h1 className="text-lg font-semibold text-gray-600 uppercase">{t('COMMON.AUTH.REGISTER_TITLE')}</h1>
          </div>
          <Input
            name="name"
            control={control}
            label={t('COMMON.AUTH.NAME_LABEL')}
            placeholder={t('COMMON.AUTH.NAME_PLACEHOLDER')}
            errorMessage={errors.name?.message}
          />
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
            {t('COMMON.BUTTONS.REGISTER')}
          </Button>
        </form>
        <Link to={'/login'}>
          <Button className="mt-4 underline" variant={ButtonVariants.GHOST}>
            {t('COMMON.BUTTONS.REGISTERED')}
          </Button>
        </Link>
      </div>
    </div>
  );
};
