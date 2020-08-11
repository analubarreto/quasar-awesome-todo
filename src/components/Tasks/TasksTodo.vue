<template>
  <div>
    <div>
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
  </div>
</template>

<script>
export default {
  props: ["tasksTodo"],
  components: {
    task: require("components/Tasks/Task.vue").default,
    "list-header": require("components/Tasks/Shared/ListHeader.vue").default,
  },
};
</script>