<script setup>
import { useRugoStore } from '../stores/rugo';

const rugoStore = useRugoStore();
</script>

<template>
  <div>
    <RHeading type="h2">Homepage</RHeading>

    <p class="italic">Hello, {{ rugoStore.user?.email || 'Anonymous' }}!</p>
  </div>
</template>
