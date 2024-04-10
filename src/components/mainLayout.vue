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
      <div v-for="item in tabs" :key="item.key" :class="['tabBar-item', { active: active === item.index }]"
        @click="changeTab(item.index)">
        <image class="icon" :src="active === item.index ? item.activeIcon : item.icon" mode="scaleToFill" />
        <span>{{ t(`${item.label}`) }}</span>
      </div>
    </div>
    <scanCodeS></scanCodeS>
  </view>
</template>
<script lang="ts">
export default {
  name: "mainLayout",
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useLocale from '@/hooks/useLocale'
import scanCodeS from "./scanCode.vue"
const { t } = useLocale()
const active = ref(0)

const { safeAreaInsets } = uni.getSystemInfoSync()
const { top, bottom } = safeAreaInsets as UniApp.SafeAreaInsets


const tabs = [
  { index: 0, label: "首页", key: "home", icon: "/static/images/home.png", activeIcon: "/static/images/home_active.png" },
  { index: 1, label: "我的", key: "mine", icon: "/static/images/mine.png", activeIcon: "/static/images/mine_active.png" },
]


const changeTab = (index: number): void => {
  active.value = index
  const { key } = tabs[index]
  emits('change', { key, index })
}
const emits = defineEmits(['change'])

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