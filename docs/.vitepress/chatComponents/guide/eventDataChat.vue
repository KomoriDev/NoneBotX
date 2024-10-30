<script setup lang="ts">
import { ref } from 'vue'

const cheated = ref(false)
</script>

<template>
  <q-window title="NoneBot Console">
    <q-text name="Komorebi（ID:1234567890）" avatar="/avatar/komorebi.webp" onright>
      /来张涩图
    </q-text>
    <q-text name="Hibiscus" tag="机器人" tagType="bot" avatar="/avatar/hibiscus.webp">
      你太坏了，不给你看
    </q-text>
    <q-text name="NCBM" avatar="/avatar/ncbm.webp">/来张涩图</q-text>
    <q-image
      name="Hibiscus"
      tag="机器人"
      tagType="bot"
      avatar="/avatar/hibiscus.webp"
      src="/images/guide/shining-1.png"
      @click="cheated = true"
      v-if="cheated == false"
    ></q-image>
    <q-tip v-if="cheated == true">Hibiscus 撤回了一张涩图</q-tip>
    <q-text
      v-if="cheated == true"
      name="Hibiscus"
      tag="机器人"
      tagType="bot"
      avatar="/avatar/hibiscus.webp"
    >
      你被骗了（
      <img src="/images/guide/cheated.jpg" style="margin-top: 10px" alt="你被骗了.jpg" />
    </q-text>
  </q-window>
</template>
