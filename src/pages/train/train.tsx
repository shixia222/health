import { View, Text } from '@tarojs/components'
import { useLoad, useReady, useRouter } from '@tarojs/taro'
import '../../constants/common.scss'
import './motion.scss'
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
import WeekdayTable from '../../components/date/date'

export default function Train() {
  const [preferList, setPreferList] = useState()
  const handleClickMotion = (value: number) => {
    console.log(value)
    Taro.navigateTo({
      url: `./motion/motion?type=${value}`,
    })
  }

  const handleClickPosture = () => {
    Taro.navigateTo({
      url: `./posture/posture`,
    })
  }

  return (
    <View className='motion-body flex flex-column'>
      <View className='motion at-row at-row'>
        <View className='motion at-col  border-solid' onClick={() => handleClickMotion(0)}>
          <AtIcon value='clock' size='30' color='#6190E8'></AtIcon>
          <View style={{ marginTop: 20 + 'rpx' }}>跑步</View>
        </View>
        <View className='motion at-col   border-solid' onClick={() => handleClickMotion(1)}>
          <AtIcon value='star' size='30' color='#6190E8' ></AtIcon>
          <View style={{ marginTop: 20 + 'rpx' }}>步行</View>
        </View>
        <View className='motion at-col border-solid' onClick={() => handleClickMotion(2)}>
          <AtIcon value='star' size='30' color='#6190E8' ></AtIcon>
          <View style={{ marginTop: 20 + 'rpx' }}>骑行</View>
        </View>
      </View>
      <View className='motion-body-analysis'>
        <AtButton type='primary' size='normal' onClick={handleClickPosture}>体态分析</AtButton>
      </View>
    </View>
  )
}

const prefer = [{
  content: "文章包括各种文体的著作、作品，如诗歌、戏剧、小说、科学论文，记叙文、议论文、说明文、应用文等等。“千古文章未尽才”“文章千古事”“文章憎命达”“板凳要坐十年冷、文章不写一字空”“积句而成章，积章而成篇”“言出为论，下笔成章”等，都是现在所说的文章的意思。更广义的文章，也包含“学问”“奥秘”等意思，如“洞明世事皆学问，人情练达即文章”就是。",
  value: 1
}, {
  content: "“文章”的“章”字，是个会意字，从音从十。古代奏音乐，连奏十段才能结束（十，数之终也），这十段乐就是一章。所以，文章文章，也有段落。文章既从“音乐”里会意出来，应是用文字表达出来的东西，读起来如音乐一样美妙无穷、悦耳动听的文字，传诵开来，才配得上“文章”一词的真正含义。",
  value: 2
}]