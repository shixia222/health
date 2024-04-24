import { View, Text, Input, Textarea, Button } from '@tarojs/components'
import { useLoad, useReady, useRouter } from '@tarojs/taro'
import '../../../../../constants/common.scss'
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
import { userType } from '../type'
import { AtForm, AtInput } from 'taro-ui'
import { AtCard } from "taro-ui"

export default function Email() {
  const [user, setUser] = useState(Taro.getStorageSync('userInfo'))
  const [email, setEmail] = useState(user.email)

  const handleInput = (e) => {
    setEmail(e.detail.value)
  }

  const handleClick = () => {
    Taro.request({
      url: 'http://localhost:4000/api/users/updateUser',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: { ...user, email },
    }).then(() => {
      Taro.setStorageSync('userInfo', { ...user, email })
      console.log(Taro.getStorageSync('userInfo'))
    }).catch((error) => {
      Taro.showToast({
        title: '网络错误！',
        icon: 'none',
      });
    });
    Taro.navigateBack()
  }
  return (
    <View className='introduce-body '>
      <AtCard
        title='邮箱'

      >
        <Input style={{ marginBottom: 60 + 'rpx' }} value={email} auto-focus onInput={handleInput} />
        <Button onClick={handleClick}>保存</Button>
      </AtCard>
    </View>
  )
}