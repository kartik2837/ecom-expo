// import { CartProvider } from "@/context/CartContext";
// import { WishlistProvider } from "@/context/WishlistContext";
// import '@/global.css';
// import { ClerkProvider } from '@clerk/clerk-expo';
// import { tokenCache } from '@clerk/clerk-expo/token-cache';
// import { Stack } from "expo-router";
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Toast from "react-native-toast-message";

// export default function RootLayout() {
//   return(

//     <GestureHandlerRootView style={{flex:1}}>
//     <ClerkProvider tokenCache={tokenCache}>
//     <CartProvider>
//       <WishlistProvider>
//  <Stack screenOptions={{headerShown:false}} />
//  <Toast/>
//       </WishlistProvider>
//     </CartProvider>
//     </ClerkProvider>
//     </GestureHandlerRootView>
//   )
  
// }






import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import '@/global.css';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from "react-native-toast-message";

// Custom token cache (fixes the import error)
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// REPLACE THIS with your actual key from Clerk Dashboard
// Remove the quotes from around process.env
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_YOUR_ACTUAL_KEY_HERE";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider 
        tokenCache={tokenCache}
        publishableKey={publishableKey}
      >
        <ClerkLoaded>
          <CartProvider>
            <WishlistProvider>
              <Stack screenOptions={{ headerShown: false }} />
              <Toast />
            </WishlistProvider>
          </CartProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}