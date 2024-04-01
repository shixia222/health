import { View, Text } from '@tarojs/components'
import { useLoad, useReady, useRouter } from '@tarojs/taro'
import '../../../../constants/common.scss'
import './star.scss'
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
import { AtSwipeAction } from "taro-ui"
export default function Star() {
  const [management, setManagement] = useState(false)
  const [starList, setStarList] = useState(star)
  const handleManagement = () => {
    //打开课程删除
    setManagement(!management)
  }


  return (
    <View className='star-body flex flex-column'>
      <View className='management-body flex column-center'>
        <View className='at-icon at-icon-bullet-list'></View>
        <AtButton type='primary' size='small' onClick={handleManagement}>管理</AtButton>
      </View>
      <View className='star-list'>
        {starList.map((item) => {
          return <View className='star-item flex flex-column'>
            {management && <View className='delete-item text-align'>删除</View>}
            <Text>{item.content}</Text>
          </View>
        })}
      </View>
    </View>
  )
}

const star = [{
  content: "文章包括各种文体的著作、作品，如诗歌、戏剧、小说、科学论文，记叙文、议论文、说明文、应用文等等。“千古文章未尽才”“文章千古事”“文章憎命达”“板凳要坐十年冷、文章不写一字空”“积句而成章，积章而成篇”“言出为论，下笔成章”等，都是现在所说的文章的意思。更广义的文章，也包含“学问”“奥秘”等意思，如“洞明世事皆学问，人情练达即文章”就是。",
  value: 1
}, {
  content: "“文章”的“章”字，是个会意字，从音从十。古代奏音乐，连奏十段才能结束（十，数之终也），这十段乐就是一章。所以，文章文章，也有段落。文章既从“音乐”里会意出来，应是用文字表达出来的东西，读起来如音乐一样美妙无穷、悦耳动听的文字，传诵开来，才配得上“文章”一词的真正含义。",
  value: 2
}]