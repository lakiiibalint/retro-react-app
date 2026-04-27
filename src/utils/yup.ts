import * as yup from 'yup';

import i18n from '@/src/i18n/i18n';

yup.setLocale({
  mixed: { required: () => i18n.t('COMMON.ERRORS.FIELD_REQUIRED') },
  string: {
    min: ({ min }: any) => i18n.t('COMMON.ERRORS.ERRORS.FIELD_MIN_LENGTH', { min }),
    max: ({ max }: any) => i18n.t('COMMON.ERRORS.ERRORS.FIELD_MAX_LENGTH', { max }),
  },
});

export default yup;
