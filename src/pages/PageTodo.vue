<template>
  <q-page class="q-pa-md">
    <search class="q-mb-lg" />

    <p v-if="searchBar && isEmpty(tasksTodo) && isEmpty(tasksCompleted)">No search results.</p>

    <tasks-todo
      v-if="!isEmpty(tasksTodo)"
      :tasksTodo="tasksTodo"
    />
    <no-tasks v-if="isEmpty(tasksTodo) && !searchBar">You have no tasks todo</no-tasks>

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
import { mapGetters, mapState } from "vuex";

export default {
  data () {
    return {
      showAddTask: false,
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
    ...mapState("tasks", ["searchBar"])
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
    },
  },
};
</script>

<style>
</style>
