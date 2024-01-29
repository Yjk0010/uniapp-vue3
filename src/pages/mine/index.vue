<template>
  <mainLayout :active="1">
    <view class="mine">
      <text>这里是mine 页面</text>
    </view>
  </mainLayout>
</template>

<script setup lang="ts">
import mainLayout from '@/components/mainLayout.vue'
</script>

<style lang="scss" scoped>
.mine {}
</style>