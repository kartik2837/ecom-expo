import { Stack } from "expo-router";
import '@/global.css'
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from "react-native-toast-message";

/**
 * Provides app-level layout: wraps navigation stack with gesture handling and state providers.
 *
 * The component supplies Cart and Wishlist contexts to all descendant screens and renders the navigation
 * Stack with its header UI hidden.
 *
 * @returns The React element tree containing GestureHandlerRootView, CartProvider, WishlistProvider, and the configured Stack.
 */
export default function RootLayout() {
  return(

    <GestureHandlerRootView style={{flex:1}}>
    <CartProvider>
      <WishlistProvider>
 <Stack screenOptions={{headerShown:false}} />
 <Toast/>
      </WishlistProvider>
    </CartProvider>
    </GestureHandlerRootView>
  )
  
}
