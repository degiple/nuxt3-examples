<template>
  <div>
    <h1>user</h1>
    <button @click="get()">
      Get Profile
    </button>
    {{ user }}
  </div>
</template>

<script setup lang="ts">

const { user, getUser } = useUser()

// import type { FetchError } from 'ofetch'
// const result: Ref<string | FetchError<any> | undefined> = ref('')

const get = async () => {
  await getUser()
}

</script>
