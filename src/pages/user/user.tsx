import { View, Text } from '@tarojs/components'
import { useLoad, useReady, useRouter } from '@tarojs/taro'
import '../../constants/common.scss'
import './user.scss'
import { AtButton } from 'taro-ui'
import { AtIcon } from 'taro-ui'
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { AtNoticebar } from 'taro-ui'
import { AtTag } from 'taro-ui'
import { useState } from 'react'
import { AtAvatar } from 'taro-ui'
import { AtList, AtListItem } from "taro-ui"

interface userType {
  name: string;
  phone: string;
  city: string;
  introduce: string;
  gender: string;
  height: string;
  weight: string;
}

export default function User() {
  const [user, setUser] = useState<userType>({} as userType)
  useLoad(() => {
    //完成对用户数据的获取
    const userInfo = { name: '测试用户', phone: '133333333', city: '成都', introduce: '我是测试用户', gender: '1', height: '177', weight: '70' }
    setUser(userInfo)
  })

  const handleClickCart = () => {
    Taro.navigateTo({
      url: '../../components/cart/cart'
    })
  }
  return (
    <View className='user-body flex flex-column'>
      <View className='user-info flex'>
        <AtAvatar className='avatar' text='凹凸实验室'></AtAvatar>
        <View className='user-basic-info flex flex-column column-center'>
          <Text>{user.name}</Text>
          <Text>{user.phone}</Text>
        </View>
      </View>
      <View className='user-choice'>
        <AtList>
          <AtListItem className='user-choice-item' title='我的购物车' arrow='right' iconInfo={{ size: 25, color: '#6190E8', value: 'shopping-cart' }} onClick={handleClickCart} />
          <AtListItem className='user-choice-item' title='历史订单' arrow='right' iconInfo={{ size: 25, color: '#6190E8', value: 'shopping-bag' }} />
          <AtListItem className='user-choice-item' title='我的评论' arrow='right' iconInfo={{ size: 25, color: '#6190E8', value: 'message' }} />
          <AtListItem className='user-choice-item' title='身体数据' arrow='right' iconInfo={{ size: 25, color: '#6190E8', value: 'heart' }} />
          <AtListItem className='user-choice-item' title='账户设置' arrow='right' iconInfo={{ size: 25, color: '#6190E8', value: 'settings' }} />
        </AtList>
      </View>
    </View>
  )
}