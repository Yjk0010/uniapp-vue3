<template>
  <div class="login">
    <div class="logo"></div>
    <p class="slogan">{{ t("login.您身边的充电管家") }}</p>

    <div class="form">
      <uni-forms ref="valiFormRef" :modelValue="formData" label-position="top">
        <uni-forms-item :label-width="160" :label="t('手机号')" required>
          <uni-easyinput focus v-model="formData.phone" :placeholder="t('请输入手机号')" :primaryColor="styles.uniPrimary" />
        </uni-forms-item>
        <uni-forms-item :label-width="160" :label="t('验证码')" required>
          <uni-easyinput v-model="formData.code" :placeholder="t('请输入验证码')" :primaryColor="styles.uniPrimary" />
        </uni-forms-item>
      </uni-forms>
      <button @click="submit()">{{ t("提交") }}</button>
    </div>
    <div class="changeLang">
      <changeLang>
        <span>{{ t("changeLang") }}</span>
      </changeLang>
    </div>
    <view class="tips">
      <span>{{ t("login.温馨提示：若账号未注册，将自动注册") }}</span>
    </view>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import useLocale from "@/hooks/useLocale";
import changeLang from "@/components/changeLang.vue";
import styles from "../../style/uni.module.scss";

const { t } = useLocale()
const formData = ref({
  phone: "",
  code: ""
})

const valiFormRef = ref(null);
const submit = () => {
  console.log(valiFormRef.value);
  if (valiFormRef.value) {
    (valiFormRef.value as any).validate().then((res: Promise<any>) => {
      console.log('success', res);
      uni.showToast({
        title: `校验通过`
      })
    }).catch((err: Promise<any>) => {
      console.log('err', err);
    })
  }
}
</script>

<style lang="scss" scoped>
.login {
  .logo {
    width: 128rpx;
    height: 128rpx;
    background: url(data:image/png;base64,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);
    background-size: 100% 100%;
    margin: 60rpx auto 15rpx;
  }

  .slogan {
    font-size: 16px;
    color: $uni-main-color;
    margin-bottom: 20rpx;
    text-align: center;
    letter-spacing: 4.5px;
  }

  .form {
    padding: 48rpx;
  }

  .changeLang {
    width: 100%;
    font-size: 14px;
    color: $uni-primary;
    position: fixed;
    bottom: 90rpx;
    text-align: center;
  }

  .tips {
    width: 100%;
    font-size: 12px;
    color: $uni-secondary-color;
    position: fixed;
    bottom: 25rpx;
    text-align: center;
  }
}
</style>