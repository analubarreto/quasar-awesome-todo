<template>
  <q-page class="q-pa-md">
    <tasks-todo :tasksTodo="tasksTodo" />
    <tasks-completed :tasksCompleted="tasksCompleted" />

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        @click="showAddTask = true"
        round
        color="primary"
        size="24px"
        icon="add"
      />
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data () {
    return {
      showAddTask: false,
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
  },
  components: {
    task: require("components/Tasks/Task.vue").default,
    "add-task": require("components/Tasks/Modals/AddTask.vue").default,
    "tasks-todo": require("components/Tasks/TasksTodo.vue").default,
    "tasks-completed": require("components/Tasks/TasksCompleted.vue").default,
  },
};
</script>

<style>
</style>
