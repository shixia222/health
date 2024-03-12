
import { View, Button } from '@tarojs/components'
import './cartItem.scss'
import '../../../constants/common.scss'
import { AtForm } from 'taro-ui'
import { useState } from 'react'

interface cartItem {
  name: string,
  property: string,
  num: number,
  price: number
}

interface CartItemProps {
  item: cartItem;
  onChange: (newItem: cartItem) => void;
}

export default function CartItem({ item, onChange }: CartItemProps) {
  const { name, property, num, price, thumb } = item
  const [quantity, setQuantity] = useState(num || 1)
  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  return (
    <View className='cartItem-body flex'>
      <View className='goods-picture flex column-center'>
        照片
        {/* <img src={thumb} style={{ width: 100 + 'rpx', height: 100 + 'rpx' }} /> */}
      </View>
      <View className='goods-details'>
        <View className='goods-name'>{name}</View>
        <View className='goods-property'>{property}</View>
        <View className='goods-price'>¥ {price}</View>
      </View>
      <View className='goods-num flex column-center'>
        <Button type="default" plain={true} size="mini" onClick={handleDecrement} disabled={quantity === 1}>-</Button>
        {quantity}
        <Button type="default" plain={true} size="mini" onClick={handleIncrement}>+</Button>
      </View>
    </View>
  )
}