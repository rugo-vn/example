<script setup>
import { useRouter } from 'vue-router';
import { ROUTE_HOME, ROUTE_SIGN_IN } from './constants.js';
import { useRugoStore } from './stores/rugo.js';

const router = useRouter();
const rugoStore = useRugoStore();

const logout = () => {
  rugoStore.logout();
  router.push(ROUTE_HOME);
};
</script>

<template>
  <div>
    <div class="p-4">
      <RPanel class="mt-0">
        <RHeading>Vue Boilerplate</RHeading>

        <div class="py-2 my-6 border-t border-b">
          <RouterLink
            class="mr-4 underline"
            :to="ROUTE_HOME"
            >Home</RouterLink
          >

          <RouterLink
            v-if="!rugoStore.token"
            class="mr-4 underline"
            :to="ROUTE_SIGN_IN"
            >Sign In</RouterLink
          >

          <a
            v-if="rugoStore.token"
            class="mr-4 underline cursor-pointer"
            @click="logout"
            >Sign Out</a
          >
        </div>

        <RouterView />
      </RPanel>
    </div>

    <RNotification :notices="rugoStore.notices" />
  </div>
</template>
