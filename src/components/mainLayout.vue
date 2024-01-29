<template>
  <view class="main-layout">
    <div class="header" :style="{ paddingTop: (top + 'px') }">
      <image class="logo" src="/static/logo.png" />
      <text class="title">{{ t('appName') }}</text>
    </div>
    <div class="content">
      <slot></slot>
    </div>

    <div class="tabBar" :style="{ paddingBottom: (bottom + 'px') }">
      <div :class="['tabBar-item', { active: active === 0 }]" @click="changeTab(0)">
        <image v-if="props.active === 0" class="icon" src="/static/images/home_active.png" mode="scaleToFill" />
        <image v-else class="icon" src="/static/images/home.png" mode="scaleToFill" />
        <span>{{ t('首页') }}</span>
      </div>
      <div class="tabBar-item" @click="changeTab(1)">
        <image v-if="props.active === 1" class="icon" src="/static/images/mine_active.png" mode="scaleToFill" />
        <image v-else class="icon" src="/static/images/mine.png" mode="scaleToFill" />
        <span>{{ t('我的') }}</span>
      </div>
    </div>
  </view>
</template>
<script lang="ts">
export default {
  name: "mainLayout"
}
</script>
<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const props = withDefaults(
  defineProps<{
    active: number
  }>(), {
  active: 0
})
const { t } = useI18n()
const { safeAreaInsets } = uni.getSystemInfoSync()
const { top, bottom } = safeAreaInsets as UniApp.SafeAreaInsets


const routeForm = {
  0: '/pages/index/index',
  1: '/pages/mine/index'
}

const changeTab = (index: number): void => {
  uni.switchTab({
    url: routeForm[index as keyof typeof routeForm]
  })
}

onMounted(() => {
  uni.hideTabBar()
})
</script>

<style lang="scss" scoped>
.main-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f7f8fa;

  .header {
    display: flex;
    align-items: center;
    color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    background-color: #3379ff;
    font-size: 36rpx;

    .logo {
      height: 64rpx;
      width: 64rpx;
      padding: 20rpx;
    }
  }

  .content {
    flex: 1;
    overflow: auto;
  }

  .tabBar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #666;
    font-size: 24rpx;
    box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.1);
    padding: 10rpx;

    .tabBar-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .icon {
        height: 48rpx;
        width: 48rpx;
      }

      &.active {
        color: #000;
      }
    }
  }
}
</style>