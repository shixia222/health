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
import { updateType, replyType } from './updateType'

export default function Updates() {
  const tabList = [{ title: '动态', index: UPDATESTYPE.UPDATES }, { title: '回复', index: UPDATESTYPE.COMMENT }]
  const [current, setCurrent] = useState(0)
  const [updates, setUpdates] = useState<updateType[]>([])
  const [reply, setReply] = useState<replyType[]>([])
  const handleClickTabs = (value) => {
    setCurrent(value)
  }

  const tagGetReplies = () => {
    Taro.request({
      url: 'http://localhost:4000/api/reply/getListByUserId',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: { user_id: Taro.getStorageSync('openid') },
      success: (res) => {
        setReply(res.data.data)
      }
    });
  }
  const fetchUpdateData = () => {
    Taro.request({
      url: 'http://localhost:4000/api/moment/getDetails',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        user_id: Taro.getStorageSync('openid')
      },
      success: (res) => {
        setUpdates(res.data[0].moment_content)
      }
    })

    // setUpdates(tempUpdates)
  }
  useEffect(() => {
    fetchUpdateData()
    tagGetReplies()
  }, [])

  return (
    <View className='updates-body flex flex-column'>
      <AtTabs current={current} tabList={tabList} onClick={handleClickTabs}>
        <AtTabsPane current={current} index={UPDATESTYPE.UPDATES} >
          <View style='background-color: #FAFBFC;text-align: center;' >
            <View className='top-bar flex' style={{ marginBottom: 20 + 'rpx' }}>
              <AtTag
                className={'tag choice-tag'}
                type='primary'
                circle
              >
                赞过
              </AtTag>
            </View>
            <AtList>
              {updates?.map((item) => {
                return <AtListItem title={`帖子标题：${item.post_title}`} key={item.post_id} />
              })}
            </AtList>
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={UPDATESTYPE.COMMENT} >
          <View className='reply-list' >
            <AtList>
              {reply?.map((item) => {
                return <AtListItem title={`内容：${item.content}`} note={item.time} key={item._id} />
              })}
            </AtList>

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