export interface Todo {
  id: string,
  userid: string,
  date: string,
  content: string,
  isCompleted: boolean
}
export interface User {
  id: string,
  name: string,
  avatar: string,
}
export const todoListData: Todo[] = [
  {
    id: "1",
    userid: "t001",
    content: "这是一条没有感情的测试数据---1",
    date: "2020年6月2日 18:34",
    isCompleted: false
  },
  {
    id: "2",
    userid: "t002",
    content: "这是一条没有感情的测试数据---2",
    date: "2020年6月2日 18:34",
    isCompleted: false
  },
  {
    id: "3",
    userid: "t003",
    content: "这是一条没有感情的测试数据---3",
    date: "2020年6月2日 18:34",
    isCompleted: false
  }
]
export const userList: User[] = [
  {
    id: "t001",
    name: "路人甲",
    avatar: "https://avatars0.githubusercontent.com/u/39240800?s=60&v=4"
  },
  {
    id: "t002",
    name: "路人乙",
    avatar: "https://avatars0.githubusercontent.com/u/23410977?s=96&v=4"
  },
  {
    id: "t003",
    name: "路人丙",
    avatar: "https://avatars1.githubusercontent.com/u/26423749?s=88&v=4"
  }
]
export function getUserById(userId: string) {
  return userList.filter(user => user.id === userId)[0];
}

