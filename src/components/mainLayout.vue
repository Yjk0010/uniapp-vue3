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
      <scanCodeS>
        <!-- <div class="tabBar-item sys" @click="scanCode">
          <image v-if="props.active === 1" class="icon" src="/static/images/saoyisao.png" mode="scaleToFill" />
          <image v-else class="icon" src="/static/images/saoyisao.png" mode="scaleToFill" />
        </div> -->
      </scanCodeS>
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
import { ref, onMounted } from 'vue';
import useLocale from '@/hooks/useLocale'
import scanCodeS from "./scanCode.vue"
const { t } = useLocale()
const props = withDefaults(
  defineProps<{
    active: number
  }>(), {
  active: 0
})
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
    box-shadow: $uni-shadow-base;
    background-color: $uni-primary;
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
    box-shadow: $uni-shadow-base;
    padding: 10rpx;
    position: relative;

    .tabBar-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;

      .icon {
        height: 48rpx;
        width: 48rpx;
      }

      &.active {
        color: $uni-black;
      }

      &.sys {
        border-radius: 50%;
        flex: 0 0 120rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 50rpx;
        z-index: 2;

        .icon {
          position: absolute;
          width: 120rpx;
          height: 120rpx;
        }
      }
    }
  }
}
</style>