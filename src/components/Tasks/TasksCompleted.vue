<template>
  <div class="q-mt-lg">
    <div v-if="!isEmpty(tasksCompleted)">
      <list-header bgColor="bg-green-4">Completed</list-header>
      <q-list
        v-if="Object.keys(tasksCompleted).length"
        separator
        bordered
      >
        <task
          v-for="(task, key) in tasksCompleted"
          :key="key"
          :task="task"
          :id="key"
        ></task>
      </q-list>
    </div>
    <div
      v-else
      class="text-center"
    >
      <p class="text-body-1">You haven't completed any tasks today</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tasksCompleted"],
  components: {
    task: require("components/Tasks/Task.vue").default,
    "list-header": require("components/Tasks/Shared/ListHeader.vue").default,
  },
  methods: {
    isEmpty (obj) {
      return Object.keys(obj).length === 0
    }
  },
};
</script>