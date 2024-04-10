<template>
  <mainLayout @change="tabChange">
    <home v-if="refKey === `home`"></home>
    <mine v-if="refKey === `mine`"></mine>
  </mainLayout>
</template>

<script setup lang="ts">
import { ref } from "vue"
import mainLayout from '@/components/mainLayout.vue'
import home from "@/pages/home/index.vue"
import mine from "@/pages/mine/index.vue"

const refKey = ref("home")

type TabChange = {
  key: string,
  index: number
}
const tabChange = (arg: TabChange) => {
  refKey.value = arg.key
}

</script>

<style></style>
