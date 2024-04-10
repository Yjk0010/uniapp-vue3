<template>
  <div class="scanCode">
    <uni-fab horizontal="right" vertical="bottom" :pattern="pattern" direction="vertical" :content="content"
      @trigger="fabTrigger" />
    <uni-popup ref="uniPopupRef" type="bottom">
      <div class="popup-content">
        <p class="tips mt-12">
          <uni-icons type="info" :color="styles.uniWarning" size="24"></uni-icons>
          {{ t("scanCode.注：在显示器上可查看桩体编码") }}
        </p>
        <p class="tips mt-12">{{ t("scanCode.请输入屏幕上的电桩编号") }}</p>
        <uni-easyinput class="mt-12" focus v-model="formData.pileNo" :placeholder="t('scanCode.请输入充电桩编码')"
          :primaryColor="styles.uniPrimary" />
        <button class="mt-12" type="primary" :disabled="!formData.pileNo" @click="submit()">{{
      t("提交") }}</button>
      </div>

    </uni-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import useLocale from "@/hooks/useLocale"
import styles from "../style/uni.module.scss"
import { watchEffect } from "vue"
const { t } = useLocale()
const formData = ref({ pileNo: "" })
const pattern = {
  icon: "scan",
  buttonColor: styles.uniPrimary
}
const content = ref()
watchEffect(() => {
  content.value = [
    {
      iconPath: '/static/images/scanCode.png',
      text: t('扫描枪码')
    },
    {
      iconPath: '/static/images/inputCode.png',
      text: t('输入枪码')
    },
  ]
})
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

const submit = () => {

}
</script>

<style lang="scss" scoped>
.scanCode {
  .popup-content {
    background-color: $uni-white;
    padding: 32rpx;
    padding-bottom: 250rpx;
  }

  .tips {
    display: flex;
    align-items: center;
  }
}
</style>