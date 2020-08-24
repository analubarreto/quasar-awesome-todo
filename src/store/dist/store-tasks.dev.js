"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _quasar = require("quasar");

var _firebase = require("boot/firebase");

var _functionShowErrorMessage = require("src/functions/function-show-error-message");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

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
  sort: "name",
  tasksDownloaded: false
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
  clearTasks: function clearTasks(state) {
    state.tasks = {};
  },
  setsearch: function setsearch(state, value) {
    state.search = value;
  },
  setSort: function setSort(state, value) {
    state.sort = value;
  },
  setTasksDownloaded: function setTasksDownloaded(state, value) {
    state.tasksDownloaded = value;
  }
};
var actions = {
  updateTask: function updateTask(_ref, payload) {
    var dispatch = _ref.dispatch;
    dispatch("fbUpdateTask", payload);
  },
  deleteTask: function deleteTask(_ref2, id) {
    var dispatch = _ref2.dispatch;
    dispatch("fbDeleteTask", id);
  },
  addTask: function addTask(_ref3, task) {
    var dispatch = _ref3.dispatch;
    var taskId = (0, _quasar.uid)();
    var payload = {
      id: taskId,
      task: task
    };
    dispatch("fbAddTask", payload);
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
    var _this = this;

    var commit = _ref6.commit;
    var userId = _firebase.firebaseAuth.currentUser.uid;

    var userTasks = _firebase.firebaseDb.ref("tasks/ ".concat(userId)); // Initial check for data


    userTasks.once("value", function (snapshot) {
      commit("setTasksDownloaded", true);
    }, function (error) {
      (0, _functionShowErrorMessage.showErrorMessage)(error.message);

      _this.$router.replace("/auth");
    }); // child added hook

    userTasks.on("child_added", function (snapshot) {
      var task = snapshot.val();
      var payload = {
        id: snapshot.key,
        task: task
      };
      commit("addTask", payload);
    }); //child changed

    userTasks.on("child_changed", function (snapshot) {
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
  },
  fbAddTask: function fbAddTask(_ref7, payload) {
    _objectDestructuringEmpty(_ref7);

    var userId = _firebase.firebaseAuth.currentUser.uid;

    var taskRef = _firebase.firebaseDb.ref("tasks/ ".concat(userId, "/").concat(payload.id));

    taskRef.set(payload.task, function (error) {
      if (error) {
        (0, _functionShowErrorMessage.showErrorMessage)(error.message);
      } else {
        _quasar.Notify.create("Task added");
      }
    });
  },
  fbUpdateTask: function fbUpdateTask(_ref8, payload) {
    _objectDestructuringEmpty(_ref8);

    var userId = _firebase.firebaseAuth.currentUser.uid;

    var taskRef = _firebase.firebaseDb.ref("tasks/ ".concat(userId, "/").concat(payload.id));

    taskRef.update(payload.updates, function (error) {
      if (error) {
        (0, _functionShowErrorMessage.showErrorMessage)(error.message);
      } else {
        var keys = Object.keys(payload.updates);

        if (!(keys.includes("completed") && keys.length == 1)) {
          _quasar.Notify.create("Task updated");
        }
      }
    });
  },
  fbDeleteTask: function fbDeleteTask(_ref9, taskId) {
    _objectDestructuringEmpty(_ref9);

    var userId = _firebase.firebaseAuth.currentUser.uid;

    var taskRef = _firebase.firebaseDb.ref("tasks/ ".concat(userId, "/").concat(taskId));

    taskRef.remove(function (error) {
      if (error) {
        (0, _functionShowErrorMessage.showErrorMessage)(error.message);
      } else {
        _quasar.Notify.create("Task deleted");
      }
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