import enUSMessages from './en-us';
import zhTWMessages from './zh-tw';
import zhCNMessages from './zh-cn';

export type LocaleType = 'enUS' | 'zhCN' | 'zhTW' | string;

export type BizErrorOptionType = {
  locale?: LocaleType;
  error?: string | string[];
} & Record<string, string | number>;

export const localeMessages = (
  locale: LocaleType = 'zhCN',
): Record<number, string> => {
  switch (locale) {
    case 'enUS':
      return enUSMessages;
    case 'zhCN':
      return zhCNMessages;
    case 'zhTw':
      return zhTWMessages;
    default:
      return enUSMessages;
  }
};
