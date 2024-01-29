import en from './locales/en'
import zhHans from './locales/zh-Hans'
import ru from './locales/ru'

import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: uni.getLocale(),
  fallbackLocale: 'zh-Hans',
  globalInjection: true,
  messages: {
    "zh-Hans": zhHans,
    en: en,
    ru: ru,
  }
})

export default i18n