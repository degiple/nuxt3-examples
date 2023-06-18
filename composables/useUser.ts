import { Ref } from 'vue'

const baseURL = 'http://localhost:8080'

type User = {
  id: number
  createAt: Date
  updateAt: Date
  email: string
  nickName: string | null
} | null

export const useUser = () => {
  const user = useState<User>('user')

  return {
    user: readonly(user),
    getUser: getUser(user)
  }
}

const getUser = (user: Ref<User>) => async () => {
  const accessToken = useCookie('access_token').value
  const { data, error } = await useFetch<User>('/user', {
    method: 'GET',
    baseURL,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(accessToken ? { access_token: accessToken } : {})
    }
  })

  if (!error.value) {
    console.log(data.value)
    user.value = data.value
    return user
  } else {
    return error.value
  }
}
