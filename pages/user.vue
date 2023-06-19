<template>
  <div>
    <h1>user</h1>
    <div>
      <button @click="get()">
        Get Profile
      </button>
    </div>
    <div>
      <input v-model="user.nickName" type="text">
      <button @click="updateTask(user.nickName)" />
    </div>
  </div>
</template>

<script setup lang="ts">

const { user, getUser, updateUser } = useUser()

const get = async () => {
  await getUser()
}

</script>
