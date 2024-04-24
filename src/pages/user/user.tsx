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
import { useEffect, useState } from 'react'
import { AtAvatar } from 'taro-ui'
import { AtList, AtListItem } from "taro-ui"
import { userType } from './type'

export default function User() {
  const [user, setUser] = useState<userType>(Taro.getStorageSync('userInfo'))
    

  const handleClickCart = () => {
    Taro.navigateTo({
      url: '../../components/cart/cart'
    })
  }
  const handleClickTo = (url: string) => {
    Taro.navigateTo({
      url: `./${url}`
    })
  }
  return (
    <View className='user-body flex flex-column'>
      <View className='user-info flex'>
        <AtAvatar image={user.header} className='avatar' text=''></AtAvatar>
        <View className='user-basic-info flex flex-column column-center'>
          <Text>昵称：{user.username}</Text>
          <Text>简介：{user.introduce}</Text>
        </View>
      </View>
      <View className='user-choice'>
        <AtList>
          <AtListItem className='user-choice-item' title='我的动态' arrow='right' iconInfo={{ size: 25, color: '#6190E8', value: 'message' }} onClick={() => handleClickTo('updates/updates')} />
          <AtListItem className='user-choice-item' title='身体数据' arrow='right' iconInfo={{ size: 25, color: '#6190E8', value: 'heart' }} onClick={() => handleClickTo('bodyData/bodyData')} />
          <AtListItem className='user-choice-item' title='账户设置' arrow='right' iconInfo={{ size: 25, color: '#6190E8', value: 'settings' }} onClick={() => handleClickTo('setting/setting')} />
        </AtList>
      </View>
    </View>
  )
}