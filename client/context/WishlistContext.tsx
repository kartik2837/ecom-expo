import { dummyWishlist } from "@/assets/assets";
import { Product, WishlistContextType } from "@/constants/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

/**
 * Provides wishlist state and actions to descendant components via React context.
 *
 * Exposes the current `wishlist`, a `loading` flag, `isInWishlist(productId)` to check membership,
 * and `toggleWishlist(product)` to add or remove a product. The provider loads an initial wishlist on mount.
 *
 * @param children - The React nodes that will receive the wishlist context.
 * @returns The provider element that supplies wishlist context to its descendants.
 */
export function WishlistProvider({children}:{children: ReactNode}){
    const [wishlist,setWishlist]= useState<Product[]>([])
    const [loading,setLoading] = useState(false);
    const fetchWishlist = async()=>{
        setLoading(true)
        setWishlist(dummyWishlist)
        setLoading(false)
    }

    const toggleWishlist = async(product:Product)=>{
        const exist = wishlist.find((p)=>p._id=== product._id);
        setWishlist((prev)=>{
            if(exist){
                return prev.filter((p)=>p._id !== product._id)
            }
            return[...prev,product]
        })
    }


    const isInWishlist = (productId:string)=>{
        return wishlist.some((p)=>p._id === productId);
        
    }

    useEffect(()=>{
        fetchWishlist()
    },[])
    return(

        <WishlistContext.Provider value={{wishlist,loading, isInWishlist, toggleWishlist}}>
            {children}

        </WishlistContext.Provider>
    )

}


/**
 * Accesses the wishlist context value provided by the nearest WishlistProvider.
 *
 * @returns The wishlist context containing `wishlist`, `loading`, `isInWishlist`, and `toggleWishlist`.
 * @throws Error if called outside of a `WishlistProvider`.
 */
export function useWishlist(){
    const context = useContext(WishlistContext);
   if(context === undefined){
    throw new Error('useWishlist must be used within a wishlistProvider')
   }
   return context

}