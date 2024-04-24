import { View, Text, Input, Textarea, Button } from '@tarojs/components'
import '../../../../../constants/common.scss'
import { AtSearchBar, AtIndexes } from 'taro-ui'
import Taro from '@tarojs/taro'
import { useRef, useState } from 'react'
import { city } from '../../constant'

export default function City() {
  const [user, setUser] = useState(Taro.getStorageSync('userInfo'))

  const handleClick = (item) => {
    Taro.request({
      url: 'http://localhost:4000/api/users/updateUser',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: { ...user, city: item.name },
    }).then(() => {
      Taro.setStorageSync('userInfo', { ...user, city: item.name })
    }).catch((error) => {
      Taro.showToast({
        title: '网络错误！',
        icon: 'none',
      });
    });
    Taro.navigateBack()
  }
  return (
    <View className='city-body '>
      <AtIndexes
        list={city}
        onClick={handleClick}
      >
      </AtIndexes>
    </View>
  )
}