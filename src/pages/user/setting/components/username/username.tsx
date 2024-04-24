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

export default function UserName() {
  const [user, setUser] = useState(Taro.getStorageSync('userInfo'))
  const [username, setUsername] = useState(user.username)

  const handleInput = (e) => {
    setUsername(e.detail.value)
  }

  const handleClick = () => {
    Taro.request({
      url: 'http://localhost:4000/api/users/updateUser',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: { ...user, username },
    }).then(() => {
      Taro.setStorageSync('userInfo', { ...user, username })
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
        title='昵称'

      >
        <Input style={{ marginBottom: 60 + 'rpx' }} value={username} auto-focus onInput={handleInput} />
        <Button onClick={handleClick}>保存</Button>
      </AtCard>
    </View>
  )
}