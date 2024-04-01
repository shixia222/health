import { View, Text } from '@tarojs/components'
import { useLoad, useReady, useRouter } from '@tarojs/taro'
import '../../../../constants/common.scss'
import './operate.scss'
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
import { AtDivider } from 'taro-ui'


export default function Operate() {

  const [pause, setPause] = useState(false)
  const [lock, setLock] = useState(false)
  const [longPressTimer, setLongPressTimer] = useState<number | null>(null);

  const handleClickLock = () => {
    setLock(true)
  }

  const handleClickUnLock = () => {
    setLock(false)
  }

  const handleCLickPlay = () => {
    setPause(false)
  }

  const handleCLickPause = () => {
    setPause(true)
  }

  const touchStart = (e) => {
    //@ts-ignore
    setLongPressTimer(setTimeout(() => setPause(false), 3000));
    //结束
  }

  const touchEnd = (e) => {
    //@ts-ignore
    clearTimeout(longPressTimer);
  }


  return (
    <View className='operate-body flex flex-column'>
      <View className='operate-km-data'>
        <View className='km'>400.00</View>
        <Text>公里</Text>
      </View>
      <View className='operate-other-data at-row'>
        <View className='other-data-item at-col at-col-3'>
          <View className='speed'>5</View>
          <Text>配速</Text>
        </View>
        <View className='other-data-item at-col at-col-6'>
          <View className='time'>44.44</View>
          <Text>用时</Text>
        </View>
        <View className='other-data-item at-col at-col-3'>
          <View className='calorie'>300</View>
          <Text>千卡</Text>
        </View>
      </View>
      <View className='operate-setting '>
        {lock ? <View className='lock'>
          <AtIcon onClick={handleClickUnLock} value='lock' size='60' color='white'></AtIcon>
        </View> : <View className='unlock at-row'>
            <View className='setting-item at-col at-col-3'>
              <AtIcon onClick={handleClickLock} value='lock' size='30' color='white'></AtIcon>
            </View>
            <View className='setting-pause at-col at-col-6 flex flex-column'>
              {pause ? <View className='flex '>
                <View style={{ marginRight: 60 + 'rpx', marginLeft: 80 + 'rpx' }}>
                  <AtIcon onClick={handleCLickPlay} value='play' size='30' color='white'></AtIcon>
                </View>
                <View onTouchStart={touchStart} onTouchEnd={touchEnd}>
                  <AtIcon value='stop' size='30' color='white'></AtIcon>
                </View>
              </View> : <View><AtIcon onClick={handleCLickPause} value='pause' size='30' color='white'></AtIcon></View>}
            </View>
            <View className='setting-item at-col at-col-3'>
              <AtIcon value='settings' size='30' color='white'></AtIcon>
            </View>
          </View>}


      </View>
    </View>
  )
}

