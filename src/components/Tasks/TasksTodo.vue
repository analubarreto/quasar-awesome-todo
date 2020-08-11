<template>
  <div>
    <div v-if="!isEmpty(tasksTodo)">
      <list-header bgColor="bg-orange-4">Todo</list-header>
      <q-list
        v-if="Object.keys(tasksTodo).length"
        separator
        bordered
      >
        <task
          v-for="(task, key) in tasksTodo"
          :key="key"
          :task="task"
          :id="key"
        ></task>
      </q-list>
    </div>
    <no-tasks v-else>You have no tasks todo</no-tasks>
  </div>
</template>

<script>
export default {
  props: ["tasksTodo"],
  components: {
    task: require("components/Tasks/Task.vue").default,
    "list-header": require("components/Tasks/Shared/ListHeader.vue").default,
    "no-tasks": require("components/Tasks/NoTasks.vue").default,
  },
  methods: {
    isEmpty (obj) {
      return Object.keys(obj).length === 0
    }
  },
};
</script>