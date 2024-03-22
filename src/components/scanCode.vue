<template>
  <div class="scanCode">
    <uni-fab horizontal="right" vertical="bottom" :pattern="pattern" direction="vertical" :content="content"
      @trigger="fabTrigger" />
    <uni-popup ref="uniPopupRef" type="bottom">
      <div class="popup-content">
        <p class="tips">
          <uni-icons type="info" :color="styles.uniWarning" size="24"></uni-icons>注：在显示器上可查看桩体编码
        </p>
        <p class="tips">请输入屏幕上的电桩编号</p>
      </div>
    </uni-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import styles from "../style/uni.module.scss"
const pattern = {
  icon: "scan",
  buttonColor: styles.uniPrimary
}
const content = ref([
  {
    iconPath: '/static/images/scanCode.png',
    text: '扫描枪码'
  },
  {
    iconPath: '/static/images/inputCode.png',
    text: '输入枪码'
  },
])
type FabTrigger = {
  index: number,
  item: any
}
const fabTrigger = (data: FabTrigger) => {
  if (data.index) {
    openPopup()
  } else {
    scanCode()
  }
}
const scanCodeText = ref('')
const scanCode = () => {
  uni.scanCode({
    success: function (res) {
      scanCodeText.value = '条码类型：' + res.scanType + '条码内容：' + res.result
    }
  });
}
const uniPopupRef = ref()
const openPopup = () => {
  uniPopupRef.value?.open()
}
</script>

<style lang="scss" scoped>
.scanCode {
  .popup-content {
    background-color: $uni-white;
    padding: 32rpx;
  }

  .tips {
    display: flex;
    align-items: center;
  }
}
</style>