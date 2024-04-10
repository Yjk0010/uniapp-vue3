<template>
  <div class="home">
    <view class="text-area">
      <text class="title">主页</text>

    </view>
  </div>
</template>

<script setup lang="ts">
const apiKey = 'ac76cbc1-9a83-47a4-82bd-1c82c4979fdd';
PayMe.create(apiKey, {
  testMode: true
}).then(res => {
  console.log(res)
})

</script>

<style lang="scss" scoped>
.home {}
</style>