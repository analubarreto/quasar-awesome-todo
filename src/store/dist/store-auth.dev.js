"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _firebase = require("boot/firebase");

var _quasar = require("quasar");

var _functionShowErrorMessage = require("src/functions/function-show-error-message");

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var state = {
  loggedIn: false
};
var mutations = {
  setLoggedIn: function setLoggedIn(state, value) {
    state.loggedIn = value;
  }
};
var actions = {
  registerUser: function registerUser(_ref, payload) {
    _objectDestructuringEmpty(_ref);

    _quasar.Loading.show();

    _firebase.firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password).then(function (response) {
      console.log("response: ", response);
    })["catch"](function (error) {
      (0, _functionShowErrorMessage.showErrorMessage)(error.message);
    });
  },
  loginUser: function loginUser(_ref2, payload) {
    _objectDestructuringEmpty(_ref2);

    _quasar.Loading.show();

    _firebase.firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password).then(function (response) {
      console.log("response: ", response);
    })["catch"](function (error) {
      (0, _functionShowErrorMessage.showErrorMessage)(error.message);
    });
  },
  logoutUser: function logoutUser() {
    _firebase.firebaseAuth.signOut();
  },
  handleAuthStateChange: function handleAuthStateChange(_ref3) {
    var _this = this;

    var commit = _ref3.commit,
        dispatch = _ref3.dispatch;

    _firebase.firebaseAuth.onAuthStateChanged(function (user) {
      _quasar.Loading.hide();

      if (user) {
        commit("setLoggedIn", true);

        _quasar.LocalStorage.set("loggedIn", true);

        _this.$router.push("/")["catch"](function (err) {});

        dispatch("tasks/fbReadData", null, {
          root: true
        });
      } else {
        commit("setLoggedIn", false);

        _quasar.LocalStorage.set("loggedIn", false);

        _this.$router.replace("/auth")["catch"](function (err) {});
      }
    });
  }
};
var getters = {};
var _default = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
exports["default"] = _default;