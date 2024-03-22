import { useI18n } from 'vue-i18n';
import { useAppStore } from '@/stores/modules/app';
import { storeToRefs } from 'pinia';

export default function useLocale() {
  const i18n = useI18n();
  const appStore = useAppStore();
  const { changeLocale } = appStore;
  const { locale } = storeToRefs(appStore);
  const setLocale = (lang: string) => {
    changeLocale(lang);
    i18n.locale.value = lang;
    uni.setLocale(lang);
  }
  return {
    i18n,
    t: i18n.t,
    setLocale,
    locale,
  }
}