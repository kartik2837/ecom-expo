import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'expo-router'
import { Address } from '@/constants/types'
import { dummyAddress } from '@/assets/assets'
import Toast from 'react-native-toast-message'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '@/constants'
import Header from '@/components/Header'
import { ScrollView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

export default function Checkout() {
    const {cartTotal} = useCart()
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [pageLoading,setPageLoading] = useState(true)
    const [selectedAddress,setSelectedAddress] = useState<Address | null>(null)
    const [paymentMethod,setPaymentMethod] = useState<"cash"| "stripe">('cash');
    const shipping = 100.00;
    const tax= 0;
    const total = cartTotal+shipping+tax;
    const fetchAddress = async()=>{
        const addressList = dummyAddress;
        if(addressList.length>0){
            const def = addressList.find((a:any)=>a.isDefault)||addressList[0]
            setSelectedAddress(def as Address)
        }
        setPageLoading(false)
    }
    const handlePlaceOrder = async()=>{
        if(!selectedAddress){
            Toast.show({
                type:"error",
                text1:'error',
                text2:"please add a shipping address"
            })
            return;
        }
        if(paymentMethod==="stripe")
            return Toast.show({
         type:"error",
                text1:'Info',
                text2:"please stripe not implement"
        })
        router.replace('/orders')
    }

    useEffect(()=>{
        fetchAddress()
    },[])
    if(pageLoading){
        return(
            <SafeAreaView className='flex-1 bg-surface justify-center items-center'>
                <ActivityIndicator size='large'color={COLORS.primary}/>

            </SafeAreaView>
        )
    }

  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
        <Header title='Checkout' showBack/>
        <ScrollView className='flex-1 px-4 mt-4'>
            <Text className='text-lg font-bold text-primary mb-4'>Shipping Address</Text>
            {selectedAddress ?(
                <View className='bg-white p-4 rounded-xl mb-6 shadow-sm'>
                    <View className='flex-row items-center justify-between mb-2'>
                        <Text className='text-base font-bold'>{selectedAddress.type}</Text>
                        <TouchableOpacity onPress={()=>router.push('/addresses')}>
                            <Text className='text-accent font-bold'>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>{selectedAddress.street},{selectedAddress.city},{selectedAddress.state},{selectedAddress.zipCode}
                        {'\n'}
                        {selectedAddress.country}
                    </Text>
                </View>
            ):(
                <TouchableOpacity onPress={()=>router.push('/address')} className='bg-white p-6 rounded-xl mb-6 items-center justify-center border-dashed border-2 border-gray-100'>
                    <Text className='text-primary font-bold'>Add Address</Text>
                </TouchableOpacity>
            )}

            <Text className='text-lg font-bold text-primary mb-4'>Payment Method</Text>
            <TouchableOpacity onPress={()=>setPaymentMethod('cash')} className={`bg-white p-4 rounded-xl mb-4 shadow-sm flex-row items-center border-2 ${paymentMethod==='cash'?'border-primary':'border-transparent'}`}>
                <Ionicons name='cash-outline' size={24} color={COLORS.primary} className='mr-3'/>
                <View className='ml-3 flex-1'>
                    <Text className='ext-base font-bold  text-primary'>Cash on Delivery</Text>
                    <Text className='text-secondary text-xs mt-1'>Pay When You Recieve the order</Text>
                </View>
                {paymentMethod==="cash" && <Ionicons name='checkmark-circle' size={24}  color={COLORS.primary}/>}
            </TouchableOpacity>

            {/*stripe online*/}


            <TouchableOpacity onPress={()=>setPaymentMethod('cash')} className={`bg-white p-4 rounded-xl mb-4 shadow-sm flex-row items-center border-2 ${paymentMethod==='stripe'?'border-primary':'border-transparent'}`}>
                <Ionicons name='card-outline' size={24} color={COLORS.primary} className='mr-3'/>
                <View className='ml-3 flex-1'>
                    <Text className='ext-base font-bold  text-primary'>Pay with card</Text>
                    <Text className='text-secondary text-xs mt-1'>Upi credit or debit card</Text>
                </View>
                {paymentMethod==="cash" && <Ionicons name='checkmark-circle' size={24}  color={COLORS.primary}/>}
            </TouchableOpacity>

        </ScrollView>


        <View className='p-4 bg-white shadow-lg border-t border-gray-100'>
            <Text className='text-lg font-bold text-primary mb-4'>Order Summary</Text>

            <View className='flex-row justify-between mb-2'>
                <Text className='text-secondary'>Subtotal</Text>
                <Text className='font-bold'>₹{cartTotal.toFixed(2)}</Text>
            </View>
             <View className='flex-row justify-between mb-2'>
                <Text className='text-secondary'>Tax</Text>
                <Text className='font-bold'>₹{tax.toFixed(2)}</Text>
            </View>

            <View className='flex-row justify-between mb-2'>
                <Text className='text-secondary'>Shpping</Text>
                <Text className='font-bold'>₹{shipping.toFixed(2)}</Text>
            </View>


            <View className='flex-row justify-between mb-2'>
                <Text className='text-primary font-bold'>Total</Text>
                <Text className='font-bold'>₹{total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={handlePlaceOrder} disabled={loading} className={`p-4 rounded-xl items-center ${loading ? 'bg-gray-400':"bg-primary"}`}>
                {loading ? <ActivityIndicator color='white'/>:
                <Text className='text-white font-bold text-lg'>Place Order</Text>}
            </TouchableOpacity>
            

        </View>
    </SafeAreaView>
  )
}