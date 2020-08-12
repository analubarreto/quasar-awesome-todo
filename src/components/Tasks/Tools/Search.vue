<template>
  <q-input
    v-model="searchField"
    bottom-slots
    label="Search Bar"
    outlined
  >
    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="searchField = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('tasks', ['searchBar']),
    searchField: {
      get () {
        return this.searchBar
      },
      set () {
        this.setSearch(value)
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['setSearch'])
  }
}
</script>