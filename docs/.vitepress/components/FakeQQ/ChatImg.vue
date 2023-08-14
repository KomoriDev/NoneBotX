<script setup lang="ts">
interface Props {
  name: string
  avatar?: string
  tag?: string
  tagBgColor?: string
  tagColor?: string
  src: string
  onright: boolean
}

withDefaults(defineProps<Props>(), {
  name: '',
  avatar: undefined,
  tag: undefined,
  tagBgColor: undefined,
  tagColor: undefined,
  src: undefined,
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
          <div
            class="q-tag member-role-tag"
            v-if="tag"
            :style="{ backgroundColor: tagBgColor, color: tagColor }"
          >
            {{ tag }}
          </div>
        </div>
        <div class="message-content__wrapper">
          <div class="message-content__wrapper">
            <div
              class="msg-content-container container--others mix-message__container mix-message__container--pic"
            >
              <div class="message-content mix-message__inner">
                <div class="image pic-element">
                  <img class="image-content" :src="src" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
