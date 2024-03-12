import { View, Text } from '@tarojs/components'
import { useLoad, useReady, useRouter } from '@tarojs/taro'
import '../../constants/common.scss'
import './course.scss'
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

export default function Course() {
  const [courseList, setCourseList] = useState(course)

  const handleClickPlan = () => {
    //跳转到训练计划
    console.log('训练计划')
  }
  const handleClickStar = () => {
    //跳转到收藏课程
    console.log('收藏课程')
  }

  const handleClickCourseType = (value) => {
    //更新新的课程类型内容
    console.log(value)
  }

  const handleClickCourse = (value) => {
    //跳转到课程详情
    console.log(value)
  }
  return (
    <View className='course-body flex flex-column'>
      <View className='course at-row at-row__justify--around'>
        <View className='plan at-col at-col-5 text-align border-solid' onClick={handleClickPlan}>
          <AtIcon value='clock' size='30' color='#6190E8'></AtIcon>
          <View style={{ marginTop: 20 + 'rpx' }}>训练计划</View>
        </View>
        <View className='collect at-col at-col-5 text-align border-solid' onClick={handleClickStar}>
          <AtIcon value='star' size='30' color='#6190E8' ></AtIcon>
          <View style={{ marginTop: 20 + 'rpx' }}>收藏课程</View>
        </View>
      </View>
      <AtDivider content='' />
      <View className='top-bar'>
        <AtTag
          className='course-bar'
          type='primary'
          circle
          onClick={() => handleClickCourseType(1)}
        >
          推荐
          </AtTag>
        <AtTag
          className='course-bar'
          type='primary'
          circle
          onClick={() => handleClickCourseType(2)}
        >
          所有
          </AtTag>
      </View>
      <View className='course-more'>
        {courseList.map((item) => {
          return <View className='course-item' key={item.value} onClick={() => handleClickCourse(item.value)}>
            {item.content}
          </View>
        })}
      </View>
    </View>
  )
}

const course = [{
  content: "文章包括各种文体的著作、作品，如诗歌、戏剧、小说、科学论文，记叙文、议论文、说明文、应用文等等。“千古文章未尽才”“文章千古事”“文章憎命达”“板凳要坐十年冷、文章不写一字空”“积句而成章，积章而成篇”“言出为论，下笔成章”等，都是现在所说的文章的意思。更广义的文章，也包含“学问”“奥秘”等意思，如“洞明世事皆学问，人情练达即文章”就是。",
  value: 1
}, {
  content: "“文章”的“章”字，是个会意字，从音从十。古代奏音乐，连奏十段才能结束（十，数之终也），这十段乐就是一章。所以，文章文章，也有段落。文章既从“音乐”里会意出来，应是用文字表达出来的东西，读起来如音乐一样美妙无穷、悦耳动听的文字，传诵开来，才配得上“文章”一词的真正含义。",
  value: 2
}]