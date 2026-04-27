import { useSelector } from 'react-redux';

import { RootState } from '@/src/store/store';

export const useAppSelector = <T>(fn: (state: RootState) => T): T => useSelector(fn);
