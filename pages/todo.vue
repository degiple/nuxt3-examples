<template>
  <div>
    title: <input v-model="title" type="text">
    description: <input v-model="description" type="text">
    <button @click="create">
      Create
    </button>
    <hr>
    <button @click="getTasks()">
      Get Tasks
    </button>
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in headers" @key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" @key="task.id">
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.isComplete }}</td>
          <td>{{ task.createAt }}</td>
          <td>{{ task.updateAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const { tasks, getTasks, createTask } = useTodo()

const title = ref("")
const description = ref("")

const create = async () => {
  createTask(title.value, description.value)
}

const headers = [
  "id",
  "title",
  "description",
  "isComplete",
  "createAt",
  "updateAt",
];
</script>
