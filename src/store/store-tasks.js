/* eslint-disable space-before-function-paren */
import Vue from "vue";
import { uid } from "quasar";
import { firebaseDb, firebaseAuth } from "boot/firebase";

const state = {
  tasks: {
    // ID1: {
    //   name: "Go to shop",
    //   completed: false,
    //   dueDate: "2019/05/12",
    //   dueTime: "18:30"
    // },
    // ID2: {
    //   name: "Get bananas",
    //   completed: false,
    //   dueDate: "2019/05/13",
    //   dueTime: "14:00"
    // },
    // ID3: {
    //   name: "Get apples",
    //   completed: false,
    //   dueDate: "2019/05/14",
    //   dueTime: "16:00"
    // }
  },
  search: "",
  sort: "name",
  tasksDownloaded: false
};

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task);
  },
  setsearch(state, value) {
    state.search = value;
  },
  setSort(state, value) {
    state.sort = value;
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value;
  }
};

const actions = {
  updateTask({ dispatch }, payload) {
    dispatch("fbUpdateTask", payload);
  },
  deleteTask({ dispatch }, id) {
    dispatch("fbDeleteTask", id);
  },
  addTask({ dispatch }, task) {
    const taskId = uid();
    const payload = {
      id: taskId,
      task: task
    };
    dispatch("fbAddTask", payload);
  },
  setSearch({ commit }, value) {
    commit("setsearch", value);
  },
  setSort({ commit }, value) {
    commit("setSort", value);
  },
  fbReadData({ commit }) {
    const userId = firebaseAuth.currentUser.uid;
    const userTasks = firebaseDb.ref(`tasks/ ${userId}`);

    // Initial check for data
    userTasks.once("value", snapshot => {
      commit("setTasksDownloaded", true);
    });

    // child added hook
    userTasks.on("child_added", snapshot => {
      console.log(snapshot);
      const task = snapshot.val();

      const payload = {
        id: snapshot.key,
        task: task
      };

      commit("addTask", payload);
    });

    //child changed
    userTasks.on("child_changed", snapshot => {
      const task = snapshot.val();

      const payload = {
        id: snapshot.key,
        updates: task
      };

      commit("updateTask", payload);
    });

    // child removed
    userTasks.on("child_removed", snapshot => {
      const taskId = snapshot.key;

      commit("deleteTask", taskId);
    });
  },

  fbAddTask({}, payload) {
    const userId = firebaseAuth.currentUser.uid;
    const taskRef = firebaseDb.ref(`tasks/ ${userId}/${payload.id}`);
    taskRef.set(payload.task);
  },

  fbUpdateTask({}, payload) {
    const userId = firebaseAuth.currentUser.uid;
    const taskRef = firebaseDb.ref(`tasks/ ${userId}/${payload.id}`);
    taskRef.update(payload.updates);
  },

  fbDeleteTask({}, taskId) {
    const userId = firebaseAuth.currentUser.uid;
    const taskRef = firebaseDb.ref(`tasks/ ${userId}/${taskId}`);
    taskRef.remove();
  }
};

const getters = {
  tasksSorted: state => {
    let tasksSorted = {},
      keysOrdered = Object.keys(state.tasks);
    // a and b are the two tasks being compared
    keysOrdered.sort((a, b) => {
      // lower case letters are considered greater than upper case letters
      let taskAProp = state.tasks[a][state.sort].toLowerCase(),
        taskBProp = state.tasks[b][state.sort].toLowerCase();

      if (taskAProp > taskBProp) return 1;
      else if (taskAProp < taskBProp) return -1;
      else return 0;
    });

    keysOrdered.forEach(key => {
      tasksSorted[key] = state.tasks[key];
    });
    return tasksSorted;
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted,
      tasksFiltered = {};
    if (state.search) {
      Object.keys(tasksSorted).forEach(key => {
        let task = tasksSorted[key];
        let taskNameLowerCase = task.name.toLowerCase();
        let searchLowerCase = state.search.toLowerCase();

        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task;
        }
      });
      return tasksFiltered;
    }
    return tasksSorted;
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(function(key) {
      let task = tasksFiltered[key];
      if (!task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered;
    let tasks = {};
    Object.keys(tasksFiltered).forEach(function(key) {
      let task = tasksFiltered[key];
      if (task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
