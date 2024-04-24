import { View, Text } from '@tarojs/components'
import { useLoad, useReady, useRouter } from '@tarojs/taro'
import '../../../constants/common'
import './updates.scss'
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
import { UPDATESTYPE } from '../../../constants/common'
import classNames from 'classnames'
import { updateType } from './updateType'

export default function Updates() {
  const tabList = [{ title: '动态', index: UPDATESTYPE.UPDATES }, { title: '评论', index: UPDATESTYPE.COMMENT }]
  const [current, setCurrent] = useState(0)
  const [tagChoice, setTagChoice] = useState(0)
  const [updates, setUpdates] = useState<updateType[]>([])
  const handleClickTabs = (value) => {
    setCurrent(value)
  }
  const handleClickTag = (value) => {
    setTagChoice(value)
  }
  const tagGetUpdates = () => {
    let tempUpdates = []
    switch (tagChoice) {
      case UPDATESTYPE.UPDATES: {
        tempUpdates = collect;
        break;
      }
      case UPDATESTYPE.COMMENT: {
        tempUpdates = star;
        break;
      }
    }
    setUpdates(tempUpdates)
  }
  useEffect(() => {
    //根据Current请求数据
    tagGetUpdates()
  }, [tagChoice])
  return (
    <View className='updates-body flex flex-column'>
      <AtTabs current={current} tabList={tabList} onClick={handleClickTabs}>
        <AtTabsPane current={current} index={UPDATESTYPE.UPDATES} >
          <View style='background-color: #FAFBFC;text-align: center;' >
            <View className='top-bar flex'>
              <AtTag
                className={classNames('tag', { 'choice-tag': tagChoice == 0 })}
                type='primary'
                circle
                onClick={() => handleClickTag(0)}
              >
                收藏
              </AtTag>
              <AtTag
                className={classNames('tag', { 'choice-tag': tagChoice == 1 })}
                type='primary'
                circle
                onClick={() => handleClickTag(1)}
              >
                赞过
              </AtTag>
            </View>
            {updates.map((item) => {
              return <View>{item.content}</View>
            })}
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={UPDATESTYPE.COMMENT} >
          <View style='background-color: #FAFBFC;text-align: center;' >

          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}

const collect = [
  {
    content: "收藏收藏",
    value: 1
  },
  {
    content: "收藏收藏",
    value: 2
  },
  {
    content: "收藏收藏",
    value: 3
  },
]

const star = [
  {
    content: "赞过赞过",
    value: 1
  },
  {
    content: "赞过赞过",
    value: 2
  },
  {
    content: "赞过赞过",
    value: 3
  },
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