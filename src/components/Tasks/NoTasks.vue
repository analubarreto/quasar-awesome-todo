<template>
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
        flat
        color="primary"
        label="Add Task"
      />
    </template>
  </q-banner>
</template>