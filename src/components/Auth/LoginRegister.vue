<template>
  <form @submit.prevent="submitForm()">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab | titleCase }} to access your Todos anywhere!
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.email"
        label="E-mail"
        placeholder="something@gmail.com"
        hint="The email you want to register"
        class="col"
        :rules="[
          val =>
            isValidEmailAddress(val) || 'Please enter a valid e-mail address'
        ]"
        lazy-rules
        ref="email"
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        outlined
        v-model="formData.password"
        :type="isPwd ? 'password' : 'text'"
        hint="Chose a password"
        class="col"
        :rules="[
          val => val.length >= 6 || 'Please enter at least 6 characters'
        ]"
        lazy-rules
        ref="password"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </div>
    <div class="row">
      <q-space />
      <q-btn color="primary" :label="tab" type="submit" />
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isPwd: true,
      formData: {
        email: "",
        password: ""
      }
    };
  },
  props: ["text", "tab"],
  methods: {
    ...mapActions("auth", ["registerUser", "loginUser"]),
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab == "login") {
          this.loginUser(this.formData);
        } else {
          this.registerUser(this.formData);
        }
      }
    },
    isValidEmailAddress(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
  filters: {
    titleCase(value) {
      return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
    }
  }
};
</script>
