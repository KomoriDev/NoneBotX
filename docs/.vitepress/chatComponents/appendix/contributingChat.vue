<script setup lang="tsx">
import { ref } from 'vue'

withDefaults(defineProps<{ volume: number }>(), { volume: 1.0 })

const cheated = ref(false)
</script>

<template>
  <q-window title="QQ 聊天">
    <q-text self name="Komorebi" avatar="/avatar/komorebi.webp">这是一条消息</q-text>
    <q-text name="NCBM" avatar="/avatar/ncbm.webp">这是一条消息</q-text>
    <q-text is-bot name="男娘" tag-content="小男娘" avatar="/avatar/nanniang.webp">
      这是一位南梁
    </q-text>
    <q-image
      is-bot
      name="男娘"
      tag-content="小男娘"
      avatar="/avatar/nanniang.webp"
      src="/avatar/nanniang.webp"
    ></q-image>
    <q-reply
      is-bot
      name="男娘"
      tag-content="小男娘"
      avatar="/avatar/nanniang.webp"
      target="男娘"
      reply-text="test"
      reply-image-url="/avatar/nanniang.webp"
      reply-image-alt="男娘身材照"
    >
      这是男娘的照片
    </q-reply>
    <q-tip><a>男娘</a>撤回了一条消息</q-tip>
    <q-voice-legacy
      is-bot
      name="男娘"
      tag-content="小男娘"
      avatar="/avatar/nanniang.webp"
      src="http://music.163.com/song/media/outer/url?id=5221167.mp3"
      @click="cheated = true"
      :volume="volume"
    ></q-voice-legacy>
    <q-tip v-if="cheated == true">你被骗了</q-tip>
    <q-text name="Komorebi" avatar="/avatar/komorebi.webp" onright>看看男娘</q-text>
    <q-forward
      is-bot
      name="男娘"
      title="男娘"
      tag-content="小男娘"
      avatar="/avatar/nanniang.webp"
      :contents="['小男娘：男娘身材照', '小男娘: [图片]', '小男娘: [图片]', '小男娘: [图片]']"
    />
    <q-file
      is-bot
      name="男娘"
      tag-content="小男娘"
      avatar="/avatar/nanniang.webp"
      file-name="secret.zip"
      file-size="6.33MB"
      file-icon-url="/images/guide/compressed_file.webp"
      href="https://www.bilibili.com/video/BV1GJ411x7h7"
    />
  </q-window>
</template>
