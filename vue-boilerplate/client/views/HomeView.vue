<script setup>
import { ref } from 'vue';
import { useRugoStore } from '../stores/rugo';

const rugoStore = useRugoStore();

const todoList = ref([]);

async function load() {
  todoList.value = await rugoStore.model(`todos`).find();
}

async function submitTodo(e) {
  e.preventDefault();

  const form = {};
  for (const { name, value } of e.target) if (name) form[name] = value;

  await rugoStore.model('todos').create(form);

  rugoStore.pushNotice('success', 'Success', 'Todo was added');

  await load();
}

if (rugoStore.token) {
  load();
}
</script>

<template>
  <div>
    <RHeading type="h2">Homepage</RHeading>

    <p class="italic">Hello, {{ rugoStore.user?.email || 'Anonymous' }}!</p>

    <div
      v-if="rugoStore.token"
      class="mt-4"
    >
      <form
        class="mb-4"
        @submit="submitTodo"
      >
        <RInput
          label="What do you want to do?"
          name="todo"
        />
      </form>

      <div
        class="border border-success-100 px-3 py-2 rounded bg-success-50 flex items-center justify-start my-2"
        v-for="item of todoList"
        :key="item.id"
      >
        <input type="checkbox" />
        <span class="mt-1 ml-3">{{ item.todo }}</span>
      </div>
    </div>
  </div>
</template>
