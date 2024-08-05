<script setup lang="ts">
import Bot from '../icons/Bot.vue'

interface Props {
  name: string
  avatar?: string
  tag?: string
  tagType?: 'owner' | 'admin' | 'member' | 'bot' | 'customization'
  onright?: boolean
}

withDefaults(defineProps<Props>(), {
  name: '',
  avatar: undefined,
  tag: undefined,
  tagType: 'customization',
  onright: false
})
</script>

<template>
  <section>
    <div class="message">
      <div
        class="message-container"
        :class="[onright ? 'message-container--self message-container--align-right' : '']"
      >
        <span class="avatar-span">
          <div
            v-if="avatar"
            class="avatar message-container__avatar"
            :style="{ backgroundImage: `url(${avatar})` }"
          ></div>
          <div v-else class="avatar message-container__avatar text-avatar">
            <span>{{ name[0] }}</span>
          </div>
        </span>
        <div class="user-name text-ellipsis">
          <span class="text-ellipsis">{{ name }}</span>
          <div class="member-role-tag" :class="`q-${tagType}-tag`" v-if="tag">
            <template v-if="tagType === 'bot'">
              <Bot />
            </template>
            <template v-else>
              {{ tag }}
            </template>
          </div>
        </div>
        <div class="message-content__wrapper">
          <div
            class="msg-content-container mix-message__container"
            :class="[onright ? 'container--self' : 'container--others']"
          >
            <div class="message-content mix-message__inner">
              <span class="text-element">
                <span class="text-normal">
                  <slot></slot>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
