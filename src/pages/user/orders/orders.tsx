import { View, Text } from '@tarojs/components'
import { useLoad, useReady, useRouter } from '@tarojs/taro'
import '../../../constants/common'
import './orders.scss'
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
import { AtTabs, AtTabsPane } from 'taro-ui'
import OrdersGoods from './ordersGoods/ordersGoods'
import { ordersGoodsType } from './ordersGoodsType'
import { ORDERSGOODSTYPE } from '../../../constants/common'

export default function Orders() {
  const tabList = [{ title: '全部', index: ORDERSGOODSTYPE.ALL }, { title: '待支付', index: ORDERSGOODSTYPE.WAITINGFORPAID }, { title: '代签收', index: ORDERSGOODSTYPE.WAITTINGFORORDER }, { title: '售后', index: ORDERSGOODSTYPE.AFTERSALE }]
  const [current, setCurrent] = useState(0)
  const [ordersGoods, setOrdersGoods] = useState<ordersGoodsType[]>([])
  const handleClickTabs = (value) => {
    setCurrent(value)
  }
  const currentGetGoods = () => {
    let goods: ordersGoodsType = []
    switch (current) {
      case ORDERSGOODSTYPE.ALL: {
        goods = goods1;
        break;
      }
      case ORDERSGOODSTYPE.WAITINGFORPAID: {
        goods = goods2;
        break;
      }
      case ORDERSGOODSTYPE.WAITTINGFORORDER: {
        goods = goods3;
        break;
      }
      case ORDERSGOODSTYPE.AFTERSALE: {
        goods = goods4;
        break;
      }
    }
    setOrdersGoods(goods)
  }
  useEffect(() => {
    //根据Current请求数据
    currentGetGoods()
  }, [current])
  return (
    <View className='orders-body flex flex-column'>
      <AtTabs current={current} tabList={tabList} onClick={handleClickTabs}>
        {tabList.map((item) => {
          return <AtTabsPane current={current} index={item.index} >
            <View style='background-color: #FAFBFC;text-align: center;' >
              {ordersGoods.map((item) => {
                return <OrdersGoods {...item}></OrdersGoods>
              })}
            </View>
          </AtTabsPane>
        })}
      </AtTabs>
    </View>
  )
}

const goods1 = [
  {
    name: '会员',
    state: '支付成功',
    price: '1000'
  },
  {
    name: '会员',
    state: '支付成功',
    price: '100'
  },
  {
    name: '会员',
    state: '支付成功',
    price: '10'
  }
]

const goods2 = [
  {
    name: '会员2',
    state: '支付成功',
    price: '1000'
  },
  {
    name: '会员2',
    state: '支付成功',
    price: '100'
  },
  {
    name: '会员2',
    state: '支付成功',
    price: '10'
  }
]

const goods3 = [
  {
    name: '会员3',
    state: '支付成功',
    price: '1000'
  },
  {
    name: '会员3',
    state: '支付成功',
    price: '100'
  },
  {
    name: '会员3',
    state: '支付成功',
    price: '10'
  }
]

const goods4 = [
  {
    name: '会员4',
    state: '支付成功',
    price: '1000'
  },
  {
    name: '会员4',
    state: '支付成功',
    price: '100'
  },
  {
    name: '会员4',
    state: '支付成功',
    price: '10'
  }
]