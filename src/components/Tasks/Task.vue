<template>
  <q-item
    @click="updateTask({ id: id, updates: { completed: !task.completed } })"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    clickable
    v-ripple
    v-touch-hold:1000.mouse="showEditTaskModal"
  >
    <q-item-section side top>
      <q-checkbox v-model="task.completed" class="no-pointer-events" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-strikethrough': task.completed }"
        v-html="$options.filters.searchHighlight(task.name, search)"
      ></q-item-label>
    </q-item-section>

    <q-item-section v-if="task.dueDate" side>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label class="row justify-end" caption>{{
            task.dueDate
          }}</q-item-label>
          <q-item-label class="row justify-end" caption>
            <small>{{ task.dueTime | niceDate }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditTaskModal"
          flat
          round
          dense
          color="primary"
          icon="edit"
        />
        <q-btn
          @click.stop="promptToDelete(id)"
          flat
          round
          dense
          color="red"
          icon="delete"
        />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edit-task @close="showEditTask = false" :task="task" :id="id" />
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Dialog, date } from "quasar";

export default {
  props: ["task", "id"],
  data() {
    return {
      showEditTask: false
    };
  },
  computed: {
    ...mapState("tasks", ["search"])
  },
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Really delete?",
          ok: {
            push: true
          },
          cancel: {
            color: "negative"
          },
          persistent: true
        })
        .onOk(() => {
          this.deleteTask(id);
        });
    },
    showEditTaskModal() {
      this.showEditTask = true;
    }
  },
  components: {
    "edit-task": require("components/Tasks/Modals/EditTask.vue").default
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, "MMM D");
    },
    searchHighlight(value, search) {
      if (search) {
        let searchRegExp = new RegExp(search, "ig");
        return value.replace(searchRegExp, match => {
          return `<span class="bg-yellow-6">${match}</span>`;
        });
      }
      return value;
    }
  }
};
</script>

<style></style>
