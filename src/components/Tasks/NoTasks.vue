<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <q-banner
      rounded
      class="bg-grey-3"
    >
      <template v-slot:avatar>
        <q-icon
          name="check"
          color="primary"
        />
      </template>
      <slot />
      <template v-slot:action>
        <q-btn
          @click="$root.$emit('showAddTask')"
          flat
          color="primary"
          label="Add Task"
        />
      </template>
    </q-banner>
  </transition>
</template>

<script>
export default {};
</script>
