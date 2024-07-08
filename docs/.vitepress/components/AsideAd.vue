<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Plugin, PluginsResponse } from '../types'

const plugins = ref<PluginsResponse>([])
const filteredPlugin = ref<Plugin>()

const fetchPlugins = async () => {
  const response = await fetch('https://registry.nonebot.dev/plugins.json', { method: 'GET' })
  const data: PluginsResponse = await response.json()
  plugins.value = data
}

const getRandomValidPlugin = (): Plugin => {
  const validPlugins = plugins.value.filter((plugin) => plugin.valid)
  const randomIndex = Math.floor(Math.random() * validPlugins.length)
  return validPlugins[randomIndex]
}

onMounted(async () => {
  await fetchPlugins()
  filteredPlugin.value = getRandomValidPlugin()
})
</script>

<template>
  <a :href="filteredPlugin?.homepage" target="_blank">
    <div class="banner_wrapper">
      <div class="banner">
        <img :src="`https://github.com/${filteredPlugin?.author}.png`" alt="Plugin" />
      </div>
      <div class="card_wrapper">
        <div class="card">
          <div class="card_info">
            <img
              :src="`https://github.com/${filteredPlugin?.author}.png`"
              alt="Author"
              class="card_author_avatar"
            />
            <div>
              <span>{{ filteredPlugin?.name }}</span>
              <p>{{ filteredPlugin?.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<style scoped lang="scss">
.card_wrapper {
  display: flex;
  flex-direction: row;
}

.card {
  display: flex;
  width: 300px;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 0px 0px 12px 12px;
  justify-content: space-between;
  align-items: center;

  html.dark & {
    background-color: #252525;
    color: #e3e3e3;
  }
}

.card_info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.card_author_avatar {
  width: 35px;
  height: 35px;
  border-radius: 10px;
  object-fit: cover;
}

.card_info span {
  color: #3c4043;
  font-size: 16px;
  font-weight: 500;

  html.dark & {
    background-color: #252525;
    color: #fff;
  }
}

.card_info p {
  color: #919191;
  font-size: 13px;
  font-weight: 400;
}

button {
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
  background-color: #2d80ff;
  font-weight: 400;
  color: #fff;
  font-family: inherit;
  cursor: pointer;
  transition: 0.3s all ease;

  span {
    font-size: 12px;
    color: #656565;
  }
}

button:hover {
  opacity: 0.8;
}

button:active {
  transform: scale(0.9);
}

.banner__wrapper {
  position: relative;
  overflow: hidden;
}

.banner {
  position: relative;
  width: 100%;
  height: 150px;
}

.banner img {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 12px 12px 0px 0px;
}
</style>
