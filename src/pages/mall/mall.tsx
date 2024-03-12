import { View, Text } from '@tarojs/components'
import { useLoad, useReady, useRouter } from '@tarojs/taro'
import '../../constants/common.scss'
import './mall.scss'
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


export default function Mall() {

  const [commodityClassifcationList, setCommodityClassifcationList] = useState(commodityClassifcation)

  const handleClickSearch = () => {
    Taro.navigateTo({
      url: '../../components/search/search'
    })
  }
  return (
    <View className='mall-body flex flex-column'>
      <View className='mall-navBar at-row at-row__justify--around '>
        <View className='commodity-type at-col at-col-5 flex'>
          <AtButton className='commodity-type-item' type='primary' circle>运动补剂</AtButton>
          <AtButton className='commodity-type-item' type='primary' circle>运动装备</AtButton>
        </View>
        <View className='mall-search at-col at-col-5 flex column-center ' onClick={handleClickSearch}>
          <View className='at-icon at-icon-search'></View>
          <Text>搜索</Text>
        </View>
      </View>
      <View className='commodity-classifcation flex column-center border-solid'>
        {commodityClassifcationList.map((item) => {
          return <View className='commodityClassifcation-item flex flex-column' key={item.value}>
            <View>icon</View>
            <View>{item.name}</View>
          </View>
        })}
      </View>
      <View className='commodity flex column-center border-solid'>
        商品
      </View>
    </View>
  )
}

const commodityClassifcation = [{
  value: 1,
  name: '护肤'
}, {
  value: 2,
  name: '健康'
}, {
  value: 3,
  name: '运动'
}, {
  value: 4,
  name: '手表'
}, {
  value: 5,
  name: '补剂'
}, {
  value: 6,
  name: '蛋白粉'
}, {
  value: 7,
  name: '水'
}, {
  value: 8,
  name: '护肤'
}, {
  value: 9,
  name: '护肤'
}, {
  value: 10,
  name: '护肤'
}]