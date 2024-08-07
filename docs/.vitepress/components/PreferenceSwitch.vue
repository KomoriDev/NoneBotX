<script setup lang="ts">
import { useRoute } from 'vitepress'
import { ref, type Ref, computed } from 'vue'

import { preferClassic, preferClassicKey } from '../theme/preferences'
import SwitchButton from './SwitchButton.vue'
import ChevronDown from './icons/ChevronDown.vue'

const route = useRoute()
const show = computed(() => /^\/(guide)\//.test(route.path))

let isOpen = ref(true)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const removeOutline = (e: Event) => {
  ;(e.target as HTMLElement).classList.add('no-outline')
}

const restoreOutline = (e: Event) => {
  ;(e.target as HTMLElement).classList.remove('no-outline')
}

const toggleClassic = useToggleFn(preferClassicKey, preferClassic, 'prefer-classic')

function useToggleFn(storageKey: string, state: Ref<boolean>, className: string) {
  if (typeof localStorage === 'undefined') {
    return () => {}
  }
  const classList = document.documentElement.classList
  return (value = !state.value) => {
    if ((state.value = value)) {
      classList.add(className)
    } else {
      classList.remove(className)
    }
    localStorage.setItem(storageKey, String(state.value))
  }
}
</script>

<template>
  <div v-if="show" class="classic-switch">
    <button
      class="toggle"
      aria-label="preference switches toggle"
      aria-controls="classic-switches"
      :aria-expanded="isOpen"
      @click="toggleOpen"
      @mousedown="removeOutline"
      @blur="restoreOutline"
    >
      <span>侧边栏偏好设定</span>
      <ChevronDown class="vt-link-icon" :class="{ open: isOpen }" />
    </button>
    <div id="classic-switches" :hidden="!isOpen" :aria-hidden="!isOpen">
      <div class="switch-container">
        <label class="origin-label" @click="toggleClassic(false)">原汁原味</label>
        <SwitchButton
          class="preference-switch"
          aria-label="prefer classic docs"
          :aria-checked="preferClassic"
          @click="toggleClassic()"
        />

        <label class="classic-label" @click="toggleClassic(true)">经典</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.classic-switch {
  font-size: 12px;
  border-bottom: 1px solid #3c3c3c1f;
  transition:
    border-color 0.5s,
    background-color 0.5s ease;
  margin-bottom: 20px;
  position: sticky;
  top: -0.5px;
  padding-top: 10px;
  z-index: 10;

  html.dark & {
    border-bottom: 1px solid #5454547a;
  }
}

.toggle {
  color: #3c3c3cb3;
  transition: color 0.5s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2px;
  width: 100%;
  font-weight: 600;

  html.dark & {
    color: #ebebeb99;
  }
}

.toggle:hover {
  color: #213547;
}

.no-outline {
  outline: 0;
}

.vt-link-icon {
  position: relative;
  top: 1px;
  width: 12px;
  fill: #3c3c3c54;

  html.dark & {
    fill: #797979;
  }
}

.vt-link-icon.open {
  transform: rotate(180deg);
}

#classic-switches {
  padding: 12px 16px;
  background-color: #e4e4e7;
  transition: background-color 0.5s;
  margin: 6px 0 12px;
  border-radius: 8px;
  font-weight: 600;

  html.dark & {
    background-color: #242424;
  }
}

.switch-container {
  display: flex;
  align-items: center;
}

@media (max-width: 959px) {
  .switch-container {
    padding: 0 1em;
  }
}

.switch-container:nth-child(2) {
  margin-top: 10px;
}

.vt-switch {
  margin-right: 5px;
  transform: scale(0.8);
}

.switch-container label {
  transition: color 0.5s;
  cursor: pointer;
}

.switch-container label:first-child {
  width: 50px;
}

@media (max-width: 1439px) {
  #classic-switches {
    font-size: 11px;
    padding: 8px 15px;
  }

  .vt-switch {
    margin: auto;
  }

  .switch-link {
    margin-left: auto;
  }
  .switch-container label:first-child {
    width: 46px;
  }
}
</style>

<style>
.classic {
  display: none;
}

.prefer-classic .origin,
.html {
  display: none;
}

.prefer-classic .classic {
  display: initial;
}

.prefer-classic .preference-switch .vt-switch-check {
  transform: translateX(18px);
}

.classic-label,
.prefer-classic .origin-label {
  color: #3c3c3c54;

  html.dark & {
    color: #ebebeb61;
  }
}

.prefer-classic .classic-label {
  color: #213547;

  html.dark & {
    color: #ffffffde;
  }
}
</style>
