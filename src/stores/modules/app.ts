import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore(
  "app",
  () => {
    const locale = ref(uni.getStorageSync('language') as string || uni.getLocale());
    const changeLocale = (lang: string) => {
      locale.value = lang;
    };
    return {
      locale,
      changeLocale,
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
