// import { View, Text, ScrollView,Image, Dimensions, TouchableOpacity } from 'react-native'
// import React, { useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import Header from '@/components/Header'
// import { BANNERS } from '@/assets/assets'
// import { useRouter } from 'expo-router'
// const {width} = Dimensions.get('window')


// export default function Home() {
//   const router = useRouter();

//   const [activeBannerIndex,setActiveBannerIndex] =useState(0) 
//   return (
//     <SafeAreaView className="flex-1" edges={['top']}>

//      <Header title='Forever' showMenu showCart showLogo/>

//      <ScrollView className='flex-1 px-4' showsVerticalScrollIndicator={false}>
//       {/*Banner*/}
//       <View className='mb-6'>
//       <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} className='w-full h-48 rounded-xl' scrollEventThrottle={16}
//       onScroll={(e)=>{
//         const slide = Math.ceil(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width)
//         if(slide!==activeBannerIndex){
//           setActiveBannerIndex(slide)
//         }
//       }}>

//         {BANNERS.map((banner,index)=>(
//           <View key={index} className='relative w-full h-48 bg-gray-200 overflow-hidden' style={{width: width - 32}}>
//             <Image source={{uri: banner.image}} className='w-full h-full' resizeMode='cover'/>
//             <View className='absolute bottom-4 left-4 z-10'>
//               <Text className='text-white text-2xl font-bold'>{banner.title}</Text>
//                <Text className='text-white text-sm font-medium'>{banner.subtitle}</Text>
//                <TouchableOpacity className='mt-2 bg-white px-4 py-2 rounded-full self-start'>
//                 <Text className='text-primary font-bold text-xs'>Get Now</Text>
//                </TouchableOpacity>
//             </View>
//             <View className='absolute inset-0 bg-black/40'/>
//           </View>

//         ))}

//       </ScrollView>

//       <View className='flex-row justify-center mt-3 gap-2'>
//         {BANNERS.map((_,index)=>(
//           <View key={index} className={`h-2 rounded-full ${index===activeBannerIndex ? 'w-6 bg-primary': 'w-2 bg-gray-300'}`}/>
//         ))}
//         </View>

//       </View>

//      </ScrollView>

//     </SafeAreaView>
//   )
// }










// import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
// import React, { useState, useRef, useEffect } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import Header from '@/components/Header'
// import { BANNERS, dummyProducts } from '@/assets/assets'
// import { useRouter } from 'expo-router'
// import { CATEGORIES } from '@/constants'
// import CategoryItem from '@/components/CategoryItem'
// import { Product } from '@/constants/types'

// const { width } = Dimensions.get('window')

// export default function Home() {

//   const router = useRouter()

//   const scrollRef = useRef<ScrollView | null>(null)

//   const [activeBannerIndex, setActiveBannerIndex] = useState(0)
//   const [products,setProducts] = useState<Product[]>([])
//   const [loading,setLoading] = useState(true)
//   const categories = [{id:'all',name:"All",icon:'grid'},...CATEGORIES]
//   const fetchProducts = async()=>{
//     setProducts(dummyProducts);
//     setLoading(false)
//   }
//  useEffect(()=>{
//   fetchProducts()
//  },[])

//   // AUTO SCROLL
//   useEffect(() => {

//     const interval = setInterval(() => {

//       let nextIndex = activeBannerIndex + 1

//       if (nextIndex >= BANNERS.length) {
//         nextIndex = 0
//       }

//       scrollRef.current?.scrollTo({
//         x: nextIndex * (width - 32),
//         y: 0,
//         animated: true
//       })

//       setActiveBannerIndex(nextIndex)

//     }, 5000)

//     return () => clearInterval(interval)

//   }, [activeBannerIndex])

//   return (
//     <SafeAreaView className="flex-1" edges={['top']}>

//       <Header title='Forever' showMenu showCart showLogo />

//       <ScrollView className='flex-1 px-4' showsVerticalScrollIndicator={false}>

//         {/* Banner */}
//         <View className='mb-6'>

//           <ScrollView
//             ref={scrollRef}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             className='w-full h-48 rounded-xl'
//             scrollEventThrottle={16}
//             onMomentumScrollEnd={(e) => {

//               const slide = Math.round(
//                 e.nativeEvent.contentOffset.x / (width - 32)
//               )

//               setActiveBannerIndex(slide)

//             }}
//           >

//             {BANNERS.map((banner, index) => (

//               <View
//                 key={index}
//                 className='relative h-48 bg-gray-200 overflow-hidden'
//                 style={{ width: width - 32 }}
//               >

//                 <Image
//                   source={{ uri: banner.image }}
//                   className='w-full h-full'
//                   resizeMode='cover'
//                 />

//                 <View className='absolute bottom-4 left-4 z-10'>
//                   <Text className='text-white text-2xl font-bold'>
//                     {banner.title}
//                   </Text>

//                   <Text className='text-white text-sm font-medium'>
//                     {banner.subtitle}
//                   </Text>

//                   <TouchableOpacity className='mt-2 bg-white px-4 py-2 rounded-full self-start'>
//                     <Text className='text-primary font-bold text-xs'>
//                       Get Now
//                     </Text>
//                   </TouchableOpacity>
//                 </View>

//                 <View className='absolute inset-0 bg-black/40' />

//               </View>

//             ))}

//           </ScrollView>

//           {/* Pagination */}
//           <View className='flex-row justify-center mt-3 gap-2'>

//             {BANNERS.map((_, index) => (
//               <View
//                 key={index}
//                 className={`h-2 rounded-full ${
//                   index === activeBannerIndex
//                     ? 'w-6 bg-primary'
//                     : 'w-2 bg-gray-300'
//                 }`}
//               />
//             ))}

//           </View>

//         </View>
//     {/*categories*/}

//     <View className='mb-6'>
//       <View className='flex-row justify-between items-center mb-4'>
//         <Text className='text-xl font-bold text-primary'>Categories</Text>

//       </View>


//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         {categories.map((cat:any)=>(
//          <CategoryItem key={cat.id} item={cat} isSelected={false} onPress={()=>router.push({pathname:"/shop", params:{categories:cat.id==='all'? '' : cat.name}})}/>
//         ))}

//       </ScrollView>
      
//     </View>
//     <View className='flex-row justify-between items-center mb-4'>
//       <Text className='text-xl font-bold text-primary'>
//         Popular
//       </Text>
//       <TouchableOpacity onPress={()=>router.push('/shop ')}>
//         <Text className='text-secondry text-sm'>
//         See All
//       </Text>
//       </TouchableOpacity>
//       {loading ? (
//         <ActivityIndicator size='large'/>
//       ):(
//         <View>
//           {products.slice(0,4).map((product)=>(
//             <Text key={product._id}>{product.name}</Text>
//           ))}
//         </View>
//       )}
//     </View>
    

//       </ScrollView>

//     </SafeAreaView>
//   )
// }








import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { BANNERS, dummyProducts } from '@/assets/assets'
import { useRouter } from 'expo-router'
import { CATEGORIES } from '@/constants'
import CategoryItem from '@/components/CategoryItem'
import { Product } from '@/constants/types'
import ProductCard from '@/components/ProductCard'

const { width } = Dimensions.get('window')

export default function Home() {

  const router = useRouter()
  const scrollRef = useRef<ScrollView | null>(null)

  const [activeBannerIndex, setActiveBannerIndex] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [{ id: 'all', name: "All", icon: 'grid' }, ...CATEGORIES]

  const fetchProducts = async () => {
    setProducts(dummyProducts)
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // AUTO SCROLL
  useEffect(() => {

    const interval = setInterval(() => {

      let nextIndex = activeBannerIndex + 1

      if (nextIndex >= BANNERS.length) {
        nextIndex = 0
      }

      scrollRef.current?.scrollTo({
        x: nextIndex * (width - 32),
        y: 0,
        animated: true
      })

      setActiveBannerIndex(nextIndex)

    }, 5000)

    return () => clearInterval(interval)

  }, [activeBannerIndex])

  return (
    <SafeAreaView className="flex-1" edges={['top']}>

      <Header title='Forever' showMenu showCart showLogo />

      <ScrollView className='flex-1 px-4' showsVerticalScrollIndicator={false}>

        {/* Banner */}

        <View className='mb-6'>

          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            className='w-full h-48 rounded-xl'
            onMomentumScrollEnd={(e) => {

              const slide = Math.round(
                e.nativeEvent.contentOffset.x / (width - 32)
              )

              setActiveBannerIndex(slide)

            }}
          >

            {BANNERS.map((banner, index) => (

              <View
                key={index}
                className='relative h-48 bg-gray-200 overflow-hidden'
                style={{ width: width - 32 }}
              >

                <Image
                  source={{ uri: banner.image }}
                  className='w-full h-full'
                  resizeMode='cover'
                />

                <View className='absolute bottom-4 left-4 z-10'>
                  <Text className='text-white text-2xl font-bold'>
                    {banner.title}
                  </Text>

                  <Text className='text-white text-sm font-medium'>
                    {banner.subtitle}
                  </Text>

                  <TouchableOpacity className='mt-2 bg-white px-4 py-2 rounded-full self-start'>
                    <Text className='text-primary font-bold text-xs'>
                      Get Now
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className='absolute inset-0 bg-black/40' />

              </View>

            ))}

          </ScrollView>

          {/* Pagination */}

          <View className='flex-row justify-center mt-3 gap-2'>

            {BANNERS.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full ${
                  index === activeBannerIndex
                    ? 'w-6 bg-primary'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}

          </View>

        </View>


        {/* Categories */}

        <View className='mb-6'>

          <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-xl font-bold text-primary'>Categories</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            {categories.map((cat: any) => (
              <CategoryItem
                key={cat.id}
                item={cat}
                isSelected={false}
                onPress={() =>
                  router.push({
                    pathname: "/shop",
                    params: {
                      categories: cat.id === 'all' ? '' : cat.name
                    }
                  })
                }
              />
            ))}

          </ScrollView>

        </View>


        {/* Popular Section */}

        <View className='mb-6'>

          <View className='flex-row justify-between items-center mb-4'>

            <Text className='text-xl font-bold text-primary'>
              Popular
            </Text>

            <TouchableOpacity onPress={() => router.push('/shop')}>
              <Text className='text-secondry text-sm'>
                See All
              </Text>
            </TouchableOpacity>

          </View>

          {loading ? (

            <ActivityIndicator size='large' />

          ) : (

            <View className='flex-row flex-wrap justify-between'>

              {products.slice(0, 4).map((product) => (

                <ProductCard key={product._id} product={product}/>

              ))}

            </View>

          )}

        </View>


<View className='bg-gray-100 p-6 rounded-2xl mb-20 items-center'>
  <Text className='text-2xl font-bold text-primary mb-2 text-center'>Join the Revolution</Text>
   <Text className='text-secondry text-center mb-4'>Subscribe to our newsletter and get 50% of your first purchase.</Text>
   <TouchableOpacity className='bg-primary w-4/5 py-3 rounded-full items-center'>
   <Text className='text-white font-medium text-base'>Subscribe Now</Text>

   </TouchableOpacity>
    
</View>


      </ScrollView>

    </SafeAreaView>
  )
}