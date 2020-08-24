"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _quasar = require("quasar");

var _firebase = require("boot/firebase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable space-before-function-paren */
var state = {
  tasks: {// ID1: {
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
  sort: "name"
};
var mutations = {
  updateTask: function updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask: function deleteTask(state, id) {
    _vue["default"]["delete"](state.tasks, id);
  },
  addTask: function addTask(state, payload) {
    _vue["default"].set(state.tasks, payload.id, payload.task);
  },
  setsearch: function setsearch(state, value) {
    state.search = value;
  },
  setSort: function setSort(state, value) {
    state.sort = value;
  }
};
var actions = {
  updateTask: function updateTask(_ref, payload) {
    var commit = _ref.commit;
    commit("updateTask", payload);
  },
  deleteTask: function deleteTask(_ref2, id) {
    var commit = _ref2.commit;
    commit("deleteTask", id);
  },
  addTask: function addTask(_ref3, task) {
    var commit = _ref3.commit;
    var taskId = (0, _quasar.uid)();
    var payload = {
      id: taskId,
      task: task
    };
    commit("addTask", payload);
  },
  setSearch: function setSearch(_ref4, value) {
    var commit = _ref4.commit;
    commit("setsearch", value);
  },
  setSort: function setSort(_ref5, value) {
    var commit = _ref5.commit;
    commit("setSort", value);
  },
  fbReadData: function fbReadData(_ref6) {
    var commit = _ref6.commit;
    console.log("start reading data from firebase");
    var userId = _firebase.firebaseAuth.currentUser.uid;

    var userTasks = _firebase.firebaseDb.ref("tasks/ ".concat(userId)); // child added hook


    userTasks.on("child_added", function (snapshot) {
      console.log(snapshot);
      var task = snapshot.val();
      var payload = {
        id: snapshot.key,
        task: task
      };
      commit("addTask", payload);
    }); //child changed

    userTasks.on("child_changed", function (snapshot) {
      console.log(snapshot);
      var task = snapshot.val();
      var payload = {
        id: snapshot.key,
        updates: task
      };
      commit("updateTask", payload);
    }); // child removed

    userTasks.on("child_removed", function (snapshot) {
      var taskId = snapshot.key;
      commit("deleteTask", taskId);
    });
  }
};
var getters = {
  tasksSorted: function tasksSorted(state) {
    var tasksSorted = {},
        keysOrdered = Object.keys(state.tasks); // a and b are the two tasks being compared

    keysOrdered.sort(function (a, b) {
      // lower case letters are considered greater than upper case letters
      var taskAProp = state.tasks[a][state.sort].toLowerCase(),
          taskBProp = state.tasks[b][state.sort].toLowerCase();
      if (taskAProp > taskBProp) return 1;else if (taskAProp < taskBProp) return -1;else return 0;
    });
    keysOrdered.forEach(function (key) {
      tasksSorted[key] = state.tasks[key];
    });
    return tasksSorted;
  },
  tasksFiltered: function tasksFiltered(state, getters) {
    var tasksSorted = getters.tasksSorted,
        tasksFiltered = {};

    if (state.search) {
      Object.keys(tasksSorted).forEach(function (key) {
        var task = tasksSorted[key];
        var taskNameLowerCase = task.name.toLowerCase();
        var searchLowerCase = state.search.toLowerCase();

        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task;
        }
      });
      return tasksFiltered;
    }

    return tasksSorted;
  },
  tasksTodo: function tasksTodo(state, getters) {
    var tasksFiltered = getters.tasksFiltered;
    var tasks = {};
    Object.keys(tasksFiltered).forEach(function (key) {
      var task = tasksFiltered[key];

      if (!task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  },
  tasksCompleted: function tasksCompleted(state, getters) {
    var tasksFiltered = getters.tasksFiltered;
    var tasks = {};
    Object.keys(tasksFiltered).forEach(function (key) {
      var task = tasksFiltered[key];

      if (task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  }
};
var _default = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;