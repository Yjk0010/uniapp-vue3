<template>
  <mainLayout :active="0">
    <view class="text-area">
      <text class="title">{{ title }}这就牛逼了111</text>
      <changeLang></changeLang>
      {{ Api }}
      <button @click="testRequest">
        测试请求
      </button>
      <view>{{ wxpayserver }}</view>
    </view>
  </mainLayout>
</template>

<script setup lang="ts">
import mainLayout from '@/components/mainLayout.vue'
import changeLang from '@/components/changeLang.vue'


import { ref } from 'vue'
import { getTest } from '@/api/test'
const title = ref('Hello')

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

</script>

<style></style>
