import { Ref } from 'vue'

const baseURL = 'http://localhost:8080'

export const useAuth = () => {
  const accessToken = useCookie<string>('access_token', {
    httpOnly: true,
    secure: true
  })
  const initialValue = !!accessToken.value
  const auth = useState<boolean>('auth', () => initialValue)
  // const auth = useState<boolean>('auth', () => false)

  return {
    auth: readonly(auth),
    authLogin: authLogin(auth)
  }
}

type Data = {
  message: string
}

const authLogin = (auth: Ref<boolean>) => async () => {
  const { data, error } = await useFetch<Data>('/auth/login', {
    method: 'POST',
    baseURL,
    credentials: 'include',
    body: {
      email: 'aaa@example.com',
      password: 'password'
    }
  })

  if (!error.value) {
    auth.value = true
    return data.value?.message
  } else {
    auth.value = false
    return error.value
  }
}
