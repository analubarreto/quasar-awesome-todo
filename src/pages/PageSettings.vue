<template>
  <q-page padding>
    <q-list bordered padding>
      <q-item-label header>Notifications</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 hout time format</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="show12HourTimeFormat" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("settings", ["settings"]),
    show12HourTimeFormat() {
      return this.settings.shshow12HourTimeFormat;
    }
  }
};
</script>

<style></style>
