<template>
  <q-page class="q-pa-md">
    <search class="q-mb-lg" />
    <tasks-todo
      :tasksTodo="tasksTodo"
      v-if="!isEmpty(tasksTodo)"
    />
    <no-tasks v-else>You have no tasks todo</no-tasks>

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
  mounted () {
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true
    })
  },
  components: {
    task: require("components/Tasks/Task.vue").default,
    "add-task": require("components/Tasks/Modals/AddTask.vue").default,
    "tasks-todo": require("components/Tasks/TasksTodo.vue").default,
    "tasks-completed": require("components/Tasks/TasksCompleted.vue").default,
    "no-tasks": require("components/Tasks/NoTasks.vue").default,
    "search": require("components/Tasks/Tools/Search.vue").default,
  },
  methods: {
    isEmpty (obj) {
      return Object.keys(obj).length === 0
    }
  },
};
</script>

<style>
</style>
