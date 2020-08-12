/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import {
  uid
} from 'quasar'

const state = {
  tasks: {
    ID1: {
      name: 'Go to shop',
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    ID2: {
      name: 'Get bananas',
      completed: false,
      dueDate: '2019/05/13',
      dueTime: '14:00'
    },
    ID3: {
      name: 'Get apples',
      completed: false,
      dueDate: '2019/05/14',
      dueTime: '16:00'
    }
  },
  searchBar: ''
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  },
  setSearchBar(state, value) {
    state.searchBar = value
  }
}

const actions = {
  updateTask({
    commit
  }, payload) {
    commit('updateTask', payload)
  },
  deleteTask({
    commit
  }, id) {
    commit('deleteTask', id)
  },
  addTask({
    commit
  }, task) {
    const taskId = uid()
    const payload = {
      id: taskId,
      task: task
    }
    commit('addTask', payload)
  },
  setSearch({
    commit
  }, value) {
    commit('setSearchBar', value)
  }
}

const getters = {
  tasksFiltered: (state) => {
    let tasksFiltered = {}
    if (state.searchBar) {
      Object.keys(state.tasks).forEach(key => {
        let task = state.tasks[key]
        let taskNameLowerCase = task.name.toLowerCase()
        let searchLowerCase = state.searchBar.toLowerCase()

        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task
        }
      });
      return tasksFiltered
    }
    return state.tasks
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(tasksFiltered).forEach(function (key) {
      let task = tasksFiltered[key]
      if (!task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(tasksFiltered).forEach(function (key) {
      let task = tasksFiltered[key]
      if (task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
