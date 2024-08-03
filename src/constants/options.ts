import { $t } from '@/locales';

export const booleanStatusOptions: CommonType.Option<boolean>[] = [
  {
    label: $t('common.status.enable'),
    value: true
  },
  {
    label: $t('common.status.disable'),
    value: false
  }
];
export const lockedStatusOptions: CommonType.Option<boolean>[] = [
  {
    label: $t('common.status.enable'),
    value: false
  },
  {
    label: $t('common.status.disable'),
    value: true
  }
];
