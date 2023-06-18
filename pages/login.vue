<template>
  <div>
    {{ auth }}
    <button @click="login()">
      Login
    </button>
    {{ result }}
  </div>
</template>

<script setup lang="ts">
import type { FetchError } from 'ofetch'

const { auth, authLogin } = useAuth()
const result: Ref<string | FetchError<any> | undefined> = ref('')

const login = async () => {
  result.value = await authLogin()
}
</script>
