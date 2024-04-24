import { View, Text } from '@tarojs/components'
import { useLoad, useReady, useRouter } from '@tarojs/taro'
import '../../../constants/common.scss'
import './posture.scss'
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
import { AtDivider } from 'taro-ui'
import { } from 'taro-ui'
import { AtGrid } from "taro-ui"

export default function Train() {

  const handleCameraClick = async () => {
    try {
      const res = await Taro.chooseImage({
        count: 1, // 最多可以选择的图片张数，这里设置为 1 表示只能拍摄一张照片
        sourceType: ['camera'], // 从相机拍摄
      });
      // res.tempFilePaths 是一个数组，存放用户选择的图片的临时文件路径
      const tempFilePaths = res.tempFilePaths;
      // 可以将图片显示在页面上或者进行其他操作
      console.log(tempFilePaths);
    } catch (error) {
      // 错误处理
      console.error(error);
    }
  }

  return (
    <View className='posture-body flex flex-column'>
      <View className='posture-history'>
        <AtButton type='primary' size='normal' onClick={() => { }}>历史体态分析记录</AtButton>
      </View>
      <View className='posture-data text-align column-center at-row'>
        <View className='data neck at-col-4'>颈超屈伸</View>
        <View className='data uneven_shoulders at-col-4'>高低肩</View>
        <View className='data rounded_shoulders at-col-4'>圆肩驼背</View>
      </View>
      <View className='posture-data text-align column-center at-row'>
        <View className='data thigh_protrusion at-col-4'>大腿前侧突出</View>
        <View className='data legs at-col-4'>X/O型腿</View>
        <View className='data knee at-col-4'>膝关节超伸</View>
      </View>
      <View className='posture-data text-align column-center at-row'>
        <View className='data calf at-col-4'>小腿外翻</View>
        <View className='new-posture at-col-8'>
          <AtButton type='primary' size='normal' onClick={() => { }}>新一轮体态分析</AtButton>
        </View>

      </View>

      <View className='posture-course'>
        {/* {preferList.map((item) => {
          return <View className='perfer-item' key={item.value} >
            {item.content}
          </View>
        })} */}
      </View>
    </View>
  )
}
