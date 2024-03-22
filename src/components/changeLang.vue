<template>
  <view class="changeLang">
    <picker mode="selector" :range="localsLabel" @change="langChange" :value="localIndex">
      <slot :locale="locale"></slot>
    </picker>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useLocale from '@/hooks/useLocale';
const { t, setLocale, locale } = useLocale();

const locales = ["zh-Hans", "en", "ru"];
const localIndex = ref(locales.indexOf(locale.value))

const localsLabel = [t('zh-Hans'), t('en'), t('ru')];
const langChange = (value: any) => {
  localIndex.value = value.detail.value;
  console.log(localIndex.value);
  setLocale(locales[value.detail.value])
}

</script>

<style lang="scss" scoped>
.changeLang {}
</style>