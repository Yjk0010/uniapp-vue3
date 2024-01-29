<template>
  <view class="changeLang">
    <uni-section :title="t('语言')" type="line">
      <uni-list>
        <picker mode="selector" :range="localsLabel" @change="langChange" :value="localIndex">
          <uni-list-item showArrow :title="t('当前语言')" clickable :rightText="t(`${language}`)" />
        </picker>
      </uni-list>
    </uni-section>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/modules/app';
const { t } = useI18n();
const appStore = useAppStore();
const { language } = storeToRefs(appStore);
const { changeLang } = appStore

const locales = ["zh-Hans", "en", "ru"];
const localIndex = ref(locales.indexOf(language.value))
const localsLabel = [t('zh-Hans'), t('en'), t('ru')];
const langChange = (value: any) => {
  localIndex.value = value.detail.value;
  changeLang(locales[value.detail.value])
}

</script>

<style lang="scss" scoped>
.changeLang {}
</style>