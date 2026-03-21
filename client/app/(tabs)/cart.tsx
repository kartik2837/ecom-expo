import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { ScrollView } from 'react-native-gesture-handler'
import CartItem from '@/components/CartItem'

export default function Cart() {

  const {cartItems,cartTotal,removeFromCart,updateQuantity} = useCart()
  const router = useRouter()

  const Shipping  = 2.00;
  const total = cartTotal+Shipping

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
      <Header title='My Cart' showBack/>
      {cartItems.length> 0?(
        <>
        <ScrollView className='flex-1 px-4 mt-4'showsVerticalScrollIndicator={false}>
          {cartItems.map((item,index)=>(
                 <CartItem key={index} item={item} onRemove={()=>removeFromCart(item.id,item.size)} onUpdateQuantity={(q)=>updateQuantity(item.id,q,item.size)} />
          ))}
        </ScrollView>

        <View className='p-4 bg-white rounded-t-3xl shadow-sm'>
            <View className='flex-row justify-between mb-2'>
              <Text className='text-secondary font-bold'>Subtotal</Text>
              <Text className='text-primary font-bold'>₹{cartTotal.toFixed(2)}</Text>
            </View>



             <View className='flex-row justify-between mb-2'>
              <Text className='text-secondary font-bold'>Shipping</Text>
              <Text className='text-primary font-bold'>₹{Shipping.toFixed(2)}</Text>
            </View>
            <View className='h-1[1px] bg-border mb-4'>
              <View className='flex-row justify-between mb-6'>
              <Text className='text-secondary font-bold text-lg'>Total</Text>
              <Text className='text-primary font-bold text-lg'>₹{total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity className='bg-blue-600 py-4 rounded-full items-center' onPress={()=>router.push('/checkout')}>
              <Text className='text-white font-bold text-base'>Checkout</Text>
            </TouchableOpacity>

            </View>
        </View>



        
        </>
      ):(
        <View className='flex-1 items-center justify-center'>
          <Text>Your Cart is empty</Text>
          <TouchableOpacity onPress={()=>router.push('/')}>
            <Text className='text-primary font-bold'>Start shopping</Text>
          </TouchableOpacity>

        </View>
      )}
    </SafeAreaView>
  )
}