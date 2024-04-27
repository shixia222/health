import { View, Text } from '@tarojs/components'
import { useLoad, useReady, useRouter } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { binaryToImg } from '../../../../../tools/tools'
import { AtTag, AtAvatar } from 'taro-ui'
import { ReplyUserType } from './type'
import './reply.scss'
import '../../../../../constants/common.scss'
export default function Reply(props) {
  const { content, user_id, time } = props
  const [user, setUser] = useState<ReplyUserType>({} as ReplyUserType)
  const fetchData = async () => {
    try {
      const res = await Taro.request({
        url: 'http://localhost:4000/api/users/getDetails',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        data: { openid: user_id },
      });
      const newData = await Promise.all(res.data.map(async (item) => {
        // 处理用户头像
        const userHeader = await binaryToImg(item.userHeader, item.openid);
        // 处理图片数组
        return { ...item, userHeader };
      }));
      //@ts-ignore
      setUser({ userHeader: newData[0].userHeader, userName: newData[0].username, city: newData[0].city })
    } catch (error) {
      Taro.showToast({
        title: '没有帖子',
        icon: 'none',
      });
    }
  };

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <View className='reply-body flex flex-column'>
      <View className='reply-userInfo flex'>
        <AtAvatar image={user.userHeader} size='small' circle={true}></AtAvatar>
        <Text className='userName flex column-center'>{user.userName}</Text>
      </View>
      <View className='content'>
        {content}
      </View>
      <View className='user-time-city'>
        <Text className='info-time'>{time}</Text>
        <Text className='city'>{user.city}</Text>
      </View>
    </View>
  )
}