<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div>
    <form @submit.prevent="($event) => createTask(newTask)">
      <input v-model="newTask" autocomplete="off">
      <button>Add</button>
    </form>
    <ul>
      <li v-for="task in tasks">
        {{ task.id }}
        <input v-model="task.name" type="text">
        <input v-model="task.isComplete" type="checkbox">
        <button @click="updateTask(task)">
          Update
        </button>
        <button @click="deleteTask(task.id)">
          Delete
        </button>
      </li>
    </ul>
    <button @click="clearTask">
      Clear
    </button>
  </div>
</template>

<script setup lang="ts">
const { tasks, createTask, updateTask, deleteTask, clearTask } = useTasksState()
// const { tasks, createTask, updateTask, deleteTask, clearTask } = useTaskCookie()

const newTask = ref('')
</script>
