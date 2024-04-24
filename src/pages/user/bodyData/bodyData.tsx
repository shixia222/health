import { View, Text, Input } from '@tarojs/components'
import { useLoad, useReady, useRouter } from '@tarojs/taro'
import '../../../constants/common'
import './bodydata.scss'
import { AtProgress } from 'taro-ui'
import * as echarts from 'echarts';
import { useEffect, useState, useRef } from 'react'
import Taro from '@tarojs/taro'
import { userType } from '../type'
import { AtInput, AtForm } from 'taro-ui'
import userConfig from '../user.config'

type EChartsOption = echarts.EChartsOption;

export default function Bodydata() {
  const [data, setdata] = useState<userType>({} as userType)
  const [targetWeight, setTargetWeight] = useState('')
  // 输入事件处理函数，更新状态保存用户输入的数字
  const handleChange = (e, name) => {
    const { value } = e.detail;
    // 使用正则表达式检查输入的值是否为整数或者双精度浮点数
    const regExp = /^\d*\.?\d*$/;
    if (regExp.test(value)) {
      // 如果输入的值不符合要求，则清空输入框的值
      setdata({ ...data, [name]: value });
    }
  };

  // 输入事件处理函数，更新状态保存用户输入的数字
  const handleTargetWeightChange = (e) => {
    const { value } = e.detail;
    const regExp = /^\d*\.?\d*$/;
    if (regExp.test(value)) {
      // 如果输入的值不符合要求，则清空输入框的值
      setTargetWeight(value);
    }
  };

  const BMI = () => {
    if (Object.keys(data).length !== 0) {
      if (data.weight.length !== 0 && data.height.length !== 0) {
        //@ts-ignore
        return (parseFloat(data.weight) / (parseFloat(data.height / 100) * parseFloat(data.height / 100))).toFixed(1)
      }
    }
    return ''
  }

  const percent = () => {
    if (Object.keys(data).length !== 0) {
      if (data.weight.length !== 0 && targetWeight.length !== 0) {
        //@ts-ignore
        return parseInt(((parseFloat(targetWeight) / parseFloat(data.weight)) * 100).toFixed(0))
      }
    }
    return 0
  }

  useEffect(() => {
    Taro.request({
      url: 'http://localhost:4000/api/targetWeight/getDetails',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: { openid: Taro.getStorageSync('openid') },
      success: (res) => {
        if (res.data.length !== 0) {
          setTargetWeight(res.data[0].targetWeight)
        }
      }
    });
    setdata(Taro.getStorageSync('userInfo'))
  }, []);

  Taro.useUnload(() => {
    //进行数据的更新
    Taro.request({
      url: 'http://localhost:4000/api/users/updateUser',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data,
    }).then(() => {
      Taro.setStorageSync('userInfo', data)
    }).catch((error) => {
      Taro.showToast({
        title: '网络错误！',
        icon: 'none',
      });
    });
    Taro.request({
      url: 'http://localhost:4000/api/targetWeight/addTargetWeight',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: { openid: Taro.getStorageSync('openid'), targetWeight },
    });
    console.log('创建成功');
  })
  return (
    <View className='bodydata-body flex flex-column font-size-30rpx'>
      <View className='bodydata-info at-row'>
        <View className='weight at-col square flex flex-column'>
          <Text>体重（公斤）</Text>
          <View className="container">
            <Input
              className="weight"
              type="number"
              placeholder="请输入体重"
              value={data.weight}
              onInput={(e) => handleChange(e, 'weight')}
            />
          </View>
        </View>
        <View className='height at-col square flex flex-column'>
          <Text>身高（厘米）</Text>
          <View className="container">
            <Input
              className="height"
              type="number"
              placeholder="请输入身高"
              value={data.height}
              onInput={(e) => handleChange(e, 'height')}
            />
          </View>
        </View>
        <View className='BMI at-col square flex flex-column'>
          <Text>BMI</Text>
          <Text>{BMI()}</Text>
        </View>
        <View className='bodyFatPercentage at-col square flex flex-column'>
          <Text>体脂率（%）</Text>
          <View className="container">
            <Input
              className="weight"
              type="number"
              placeholder="请输入体脂"
              value={data.body_fat}
              onInput={(e) => handleChange(e, 'body_fat')}
            />
          </View>
        </View>
      </View>
      <View className='target at-row '>
        <View className='targetWeight at-col flex flex-column font-size-24rpx'>
          <Text >当前/目标体重（公斤）</Text>
          <View style={{ marginTop: 10 + 'rpx' }}>
            <Text style={{ fontSize: 40 + 'rpx' }}>{data.weight}</Text>
            <Text>/</Text>
            <Input
              className="targetWeight"
              type="number"
              placeholder="0"
              value={targetWeight}
              onInput={handleTargetWeightChange}
            />
          </View>
        </View>
        <View className='progress at-col flex flex-column'>
          <View style={{ marginBottom: 30 + 'rpx' }}>完成进度条</View>
          <AtProgress percent={percent()} color='#13CE66' isHidePercent={true} />
        </View>
      </View>
      <View>折线图</View>
    </View>
  )
}
