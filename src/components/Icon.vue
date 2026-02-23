<script setup>
import * as icons from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 24
  },
  color: {
    type: String,
    default: 'currentColor'
  }
})

// Convert kebab-case to PascalCase (e.g., 'arrow-up' -> 'ArrowUp')
const iconName = computed(() => {
  return props.name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
})

// Get the icon component from lucide-vue-next
const iconComponent = computed(() => {
  // Try with the Icon suffix first (e.g., MenuIcon)
  const iconNameCapitalized = iconName.value
  return icons[iconNameCapitalized] || icons[`${iconNameCapitalized}Icon`]
})
</script>

<template>
  <component
    :is="iconComponent"
    :size="size"
    :color="color"
    :class="$attrs.class"
  />
</template>
