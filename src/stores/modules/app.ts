import { ref } from "vue";
import { defineStore } from "pinia";
import { useI18n } from 'vue-i18n';
export const useAppStore = defineStore(
  "app",
  () => {
    const language = ref(uni.getStorageSync('language') || uni.getLocale());
    const { locale } = useI18n();
    const changeLang = (lang: string) => {
      language.value = lang;
      locale.value = lang;
      uni.setLocale(lang);
    };
    return {
      language,
      changeLang,
    };
  },
  {
    persist: {
      storage: {
        getItem: (key) => uni.getStorageSync(key),
        setItem: (key, value) => uni.setStorageSync(key, value),
      },
    },
  }
);
