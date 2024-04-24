import { View, Text } from '@tarojs/components'
import { useLoad, useReady, useRouter } from '@tarojs/taro'
import '../../../../constants/common'
import './ordersGoods.scss'
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
import { AtTabs, AtTabsPane } from 'taro-ui'
import { ordersGoodsType } from '../ordersGoodsType'

export default function OrdersGoods(ordersGoods: ordersGoodsType) {
  const { name, state, imgUrl, price } = ordersGoods
  return (
    <View className='ordersGoods-body flex flex-column'>
      <View className='goods-basic-info at-row at-row__justify--between'>
        <View className='goods-name at-col at-col-3'>{name}</View>
        <View className='goods-state at-col at-col-3'>{state}</View>
      </View>
      <View className='goods-info at-row at-row__justify--between'>
        <View className='goods-info at-col at-col-3'>商品信息</View>
        <View className='goods-price at-col at-col-3 flex column-center'>{price}</View>
      </View>
    </View>
  )
}