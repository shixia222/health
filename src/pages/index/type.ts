export interface indexPostType {
  _id: string,
  title: string,
  content: string,
  user_id: string,
  username: string,
  userHeader: string,
  img: [{ type: string }],
  time: string,
  type: string,
  indexImg: string
}

export interface ReplyType {
  _id: string,
  post_id: string,
  user_id: string,
  content: string,
  time: string,
}