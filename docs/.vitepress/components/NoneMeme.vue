<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref<boolean>(false)
const nonememeName = ref<string>('')
const nonememeUrl = ref<string>('')

const fetchGitHubFile = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3.raw'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const fileContent = await response.text()
    return fileContent
  } catch (error) {
    console.error('Error fetching the file:', error)
    return null
  }
}

const extractItems = (fileContent: string): string[] | null => {
  const itemsMatch = fileContent.match(/items:\s*\[(.*?)\]/s)
  if (itemsMatch) {
    const itemsArray = itemsMatch[1].split(',').map((item) => item.trim().replace(/['"]/g, ''))
    return itemsArray
  }
  return null
}

const getItems = async () => {
  const url = 'https://nonememe.icu/static/scripts/config.js'
  const fileContent = await fetchGitHubFile(url)

  if (fileContent) {
    const items = extractItems(fileContent)
    if (items) {
      return items
    } else {
      console.log('Could not find items in the file content.')
    }
  }
}

function getRandomItem<T>(list: T[]): T {
  const randomIndex = Math.floor(Math.random() * list.length)
  return list[randomIndex]
}

const getNoneMeme = async () => {
  const items = await getItems()
  if (!items) {
    nonememeName.value = 'Oops'
    nonememeUrl.value = '/avatar/404.webp'
  } else {
    const randomItem = getRandomItem(items)
    const filename = randomItem.split('/')[1]
    nonememeName.value = filename.substring(0, filename.lastIndexOf('.'))
    nonememeUrl.value = `https://nonememe.icu/${randomItem}?raw=true`
  }
  showModal.value = true
}
</script>

<template>
  <button class="modal-open-button" @click="getNoneMeme">NoneMeme</button>

  <Teleport to="body">
    <Transition name="modal">
      <div v-show="showModal" class="modal-mask">
        <div class="modal-container">
          <img :src="nonememeUrl" />
          <div class="model-footer">
            <p># {{ nonememeName }}</p>
            <button class="modal-close-button" @click="showModal = false">Close</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  max-width: 90%;
  max-height: 80%;
  overflow-y: auto;
  background-color: var(--vp-c-bg);
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.model-footer {
  display: flex;
  gap: 10px;
  margin-top: 8px;
  align-items: center;
  justify-content: space-between;
}

.modal-open-button {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 5px;
  border-radius: 10px;
  background:
    linear-gradient(#f1f1f1, #f1f1f1) padding-box,
    linear-gradient(45deg, #ff4d4d, #ff4d4d) border-box;
  border: 2px solid transparent;
  color: #476582;
  transition:
    background-color 0.5s,
    color 0.5s;

  html.dark & {
    color: #aac8e4;
    background:
      linear-gradient(#3a3a3a, #3a3a3a) padding-box,
      linear-gradient(45deg, #d35542, #ff6471) border-box;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}

.modal-close-button {
  padding: 0.3rem 1rem;
  border-radius: 10px;
  background-color: #f6f6f7;

  html.dark & {
    background-color: #3a3a3a;
  }
}
</style>
