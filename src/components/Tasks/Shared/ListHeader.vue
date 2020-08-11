<template>
  <q-banner
    rounded
    class="text-white text-center"
    :class="bgColor"
  >
    <span class="text-bold text-h5">
      <slot />
    </span>
  </q-banner>
</template>

<script>
export default {
  props: ["bgColor"]
}
</script>