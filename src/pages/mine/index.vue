<template>
  <view class="mine">
    <text>这里是mine 页面</text>
    <uni-section :title="t('语言')" type="line">
      <uni-list>
        <changeLang v-slot="{ locale }">
          <uni-list-item showArrow :title="t('当前语言')" clickable :rightText="t(`${locale}`)" />
        </changeLang>
      </uni-list>
    </uni-section>
    {{ Api }}
    <button @click="testRequest">
      测试请求
    </button>
    <view>{{ wxpayserver }}</view>
    <button @click="toLogin">{{ t('登录') }}</button>
  </view>
</template>

<script setup lang="ts">
import changeLang from '@/components/changeLang.vue'

import useLocale from '@/hooks/useLocale'
const { t } = useLocale()


import { ref } from 'vue'
import { getTest } from '@/api/test'

const Api = import.meta.env.VITE_APP_API

const wxpayserver = ref("")

const testRequest = async () => {
  try {
    const res = await getTest({
      params: {
        versionId: 92
      }
    })
    if (res.status === 200) {
      wxpayserver.value = res.data.wxpayserver
    }
  } catch (error) {
    let err = error as IRequestData<null>
    uni.showToast({
      title: err.msg,
      icon: "error",
      duration: 2000
    })
  }
}
const toLogin = () => {
  uni.navigateTo({
    url: "/pages/login/index",
  })
}
</script>

<style lang="scss" scoped>
.mine {}
</style>