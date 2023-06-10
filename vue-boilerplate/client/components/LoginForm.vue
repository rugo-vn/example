<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useRugoStore } from '../stores/rugo.js';
import { ROUTE_HOME } from '../constants.js';

const form = reactive({});

const router = useRouter();
const rugoStore = useRugoStore();

const signIn = async () => {
  if (!(await rugoStore.login(form))) return;

  router.push(ROUTE_HOME);
};
</script>

<template>
  <div>
    <RInput
      class="my-4"
      label="Email"
      v-model="form.email"
      @keyup.enter="signIn"
    />

    <RInput
      class="my-4"
      label="Password"
      type="password"
      v-model="form.password"
      @keyup.enter="signIn"
    />

    <RButton
      variant="primary"
      @click="signIn"
      >Sign In</RButton
    >
  </div>
</template>
