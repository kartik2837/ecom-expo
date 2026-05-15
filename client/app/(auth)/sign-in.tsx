
// import { useSignIn } from '@clerk/expo'
// import { type Href, Link, useRouter } from 'expo-router'
// import React from 'react'
// import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

// export default function Page() {
//   const { signIn, errors, fetchStatus } = useSignIn()
//   const router = useRouter()

//   const [emailAddress, setEmailAddress] = React.useState('')
//   const [password, setPassword] = React.useState('')
//   const [code, setCode] = React.useState('')

//   const handleSubmit = async () => {
//     const { error } = await signIn.password({
//       emailAddress,
//       password,
//     })
//     if (error) {
//       console.error(JSON.stringify(error, null, 2))
//       return
//     }

//     if (signIn.status === 'complete') {
//       await signIn.finalize({
//         navigate: ({ session, decorateUrl }) => {
//           if (session?.currentTask) {
//             // Handle pending session tasks
//             // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
//             console.log(session?.currentTask)
//             return
//           }

//           const url = decorateUrl('/')
//           if (url.startsWith('http')) {
//             window.location.href = url
//           } else {
//             router.push(url as Href)
//           }
//         },
//       })
//     } else if (signIn.status === 'needs_second_factor') {
//       // See https://clerk.com/docs/guides/development/custom-flows/authentication/multi-factor-authentication
//     } else if (signIn.status === 'needs_client_trust') {
//       // For other second factor strategies,
//       // see https://clerk.com/docs/guides/development/custom-flows/authentication/client-trust
//       const emailCodeFactor = signIn.supportedSecondFactors.find(
//         (factor) => factor.strategy === 'email_code',
//       )

//       if (emailCodeFactor) {
//         await signIn.mfa.sendEmailCode()
//       }
//     } else {
//       // Check why the sign-in is not complete
//       console.error('Sign-in attempt not complete:', signIn)
//     }
//   }

//   const handleVerify = async () => {
//     await signIn.mfa.verifyEmailCode({ code })

//     if (signIn.status === 'complete') {
//       await signIn.finalize({
//         navigate: ({ session, decorateUrl }) => {
//           if (session?.currentTask) {
//             // Handle pending session tasks
//             // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
//             console.log(session?.currentTask)
//             return
//           }

//           const url = decorateUrl('/')
//           if (url.startsWith('http')) {
//             window.location.href = url
//           } else {
//             router.push(url as Href)
//           }
//         },
//       })
//     } else {
//       // Check why the sign-in is not complete
//       console.error('Sign-in attempt not complete:', signIn)
//     }
//   }

//   if (signIn.status === 'needs_client_trust') {
//     return (
//       <View style={styles.container}>
//         <Text  style={[styles.title, { fontSize: 24, fontWeight: 'bold' }]}>
//           Verify your account
//         </Text>
//         <TextInput
//           style={styles.input}
//           value={code}
//           placeholder="Enter your verification code"
//           placeholderTextColor="#666666"
//           onChangeText={(code) => setCode(code)}
//           keyboardType="numeric"
//         />
//         {errors.fields.code && (
//           <Text style={styles.error}>{errors.fields.code.message}</Text>
//         )}
//         <Pressable
//           style={({ pressed }) => [
//             styles.button,
//             fetchStatus === 'fetching' && styles.buttonDisabled,
//             pressed && styles.buttonPressed,
//           ]}
//           onPress={handleVerify}
//           disabled={fetchStatus === 'fetching'}
//         >
//           <Text style={styles.buttonText}>Verify</Text>
//         </Pressable>
//         <Pressable
//           style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
//           onPress={() => signIn.mfa.sendEmailCode()}
//         >
//           <Text style={styles.secondaryButtonText}>I need a new code</Text>
//         </Pressable>
//         <Pressable
//           style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
//           onPress={() => signIn.reset()}
//         >
//           <Text style={styles.secondaryButtonText}>Start over</Text>
//         </Pressable>
//       </View>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <Text  style={styles.title}>
//         Sign in
//       </Text>

//       <Text style={styles.label}>Email address</Text>
//       <TextInput
//         style={styles.input}
//         autoCapitalize="none"
//         value={emailAddress}
//         placeholder="Enter email"
//         placeholderTextColor="#666666"
//         onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
//         keyboardType="email-address"
//       />
//       {errors.fields.identifier && (
//         <Text style={styles.error}>{errors.fields.identifier.message}</Text>
//       )}
//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         style={styles.input}
//         value={password}
//         placeholder="Enter password"
//         placeholderTextColor="#666666"
//         secureTextEntry={true}
//         onChangeText={(password) => setPassword(password)}
//       />
//       {errors.fields.password && (
//         <Text style={styles.error}>{errors.fields.password.message}</Text>
//       )}
//       <Pressable
//         style={({ pressed }) => [
//           styles.button,
//           (!emailAddress || !password || fetchStatus === 'fetching') && styles.buttonDisabled,
//           pressed && styles.buttonPressed,
//         ]}
//         onPress={handleSubmit}
//         disabled={!emailAddress || !password || fetchStatus === 'fetching'}
//       >
//         <Text style={styles.buttonText}>Continue</Text>
//       </Pressable>
//       {/* For your debugging purposes. You can just console.log errors, but we put them in the UI for convenience */}
//       {errors && <Text style={styles.debug}>{JSON.stringify(errors, null, 2)}</Text>}

//       <View style={styles.linkContainer}>
//         <Text>Don't have an account? </Text>
//         <Link href="/sign-up">
//           <Text >Sign up</Text>
//         </Link>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     gap: 12,
//   },
//   title: {
//     marginBottom: 8,
//   },
//   label: {
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#0a7ea4',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   buttonPressed: {
//     opacity: 0.7,
//   },
//   buttonDisabled: {
//     opacity: 0.5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   secondaryButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   secondaryButtonText: {
//     color: '#0a7ea4',
//     fontWeight: '600',
//   },
//   linkContainer: {
//     flexDirection: 'row',
//     gap: 4,
//     marginTop: 12,
//     alignItems: 'center',
//   },
//   error: {
//     color: '#d32f2f',
//     fontSize: 12,
//     marginTop: -8,
//   }, 
//   debug: {
//     fontSize: 10,
//     opacity: 0.5,
//     marginTop: 8,
//   },
// })






// import { COLORS } from "@/constants";
// import { useSignIn } from "@clerk/clerk-expo";
// import type { SignInFirstFactor } from "@clerk/types";
// import { Ionicons } from "@expo/vector-icons";
// import { Link, useRouter } from "expo-router";
// import React, { useState } from "react";

// import {
//   ActivityIndicator,
//   Alert,
//   Pressable,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { SafeAreaView } from "react-native-safe-area-context";

// export default function Page() {
//   const { signIn, setActive, isLoaded } = useSignIn();

//   const router = useRouter();

//   const [emailAddress, setEmailAddress] = useState("");
//   const [password, setPassword] = useState("");
//   const [code, setCode] = useState("");

//   const [showEmailCode, setShowEmailCode] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ================= SIGN IN =================

//   const onSignInPress = async () => {
//     if (!isLoaded) return;

//     if (!emailAddress || !password) {
//       Alert.alert("Error", "Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const result = await signIn.create({
//         identifier: emailAddress,
//         password,
//       });

//       // LOGIN SUCCESS
//       if (result.status === "complete") {
//         await setActive({
//           session: result.createdSessionId,
//         });

//         router.replace("/");
//       }

//       // SECOND FACTOR
//       else if (result.status === "needs_second_factor") {
//         const factor = result.supportedSecondFactors?.find(
//           (item: SignInFirstFactor | any) =>
//             item.strategy === "email_code"
//         );

//         if (!factor) {
//           Alert.alert(
//             "Error",
//             "Email verification not available"
//           );
//           return;
//         }

//         await signIn.prepareSecondFactor({
//           strategy: "email_code",
//         } as any);

//         setShowEmailCode(true);
//       }

//       // OTHER STATUS
//       else {
//         console.log(
//           "Unhandled status:",
//           JSON.stringify(result, null, 2)
//         );
//       }
//     } catch (err: any) {
//       console.log(
//         "SIGN IN ERROR:",
//         JSON.stringify(err, null, 2)
//       );

//       Alert.alert(
//         "Login Failed",
//         err?.errors?.[0]?.message ||
//           "Something went wrong"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= VERIFY EMAIL CODE =================

//   const onVerifyPress = async () => {
//     if (!isLoaded) return;

//     if (!code) {
//       Alert.alert("Error", "Please enter code");
//       return;
//     }

//     try {
//       setLoading(true);

//       const result = await signIn.attemptSecondFactor({
//         strategy: "email_code",
//         code,
//       } as any);

//       if (result.status === "complete") {
//         await setActive({
//           session: result.createdSessionId,
//         });

//         router.replace("/");
//       } else {
//         console.log(
//           "Verification status:",
//           JSON.stringify(result, null, 2)
//         );
//       }
//     } catch (err: any) {
//       console.log(
//         "VERIFY ERROR:",
//         JSON.stringify(err, null, 2)
//       );

//       Alert.alert(
//         "Verification Failed",
//         err?.errors?.[0]?.message ||
//           "Invalid verification code"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView
//       className="flex-1 bg-white justify-center"
//       style={{ padding: 28 }}
//     >
//       {!showEmailCode ? (
//         <>
//           {/* BACK BUTTON */}

//           <TouchableOpacity
//             onPress={() => router.back()}
//             className="absolute top-12 left-5 z-10"
//           >
//             <Ionicons
//               name="arrow-back"
//               size={24}
//               color={COLORS.primary}
//             />
//           </TouchableOpacity>

//           {/* HEADER */}

//           <View className="items-center mb-8">
//             <Text className="text-3xl font-bold text-primary mb-2">
//               Welcome Back Delhi Mart
//             </Text>

//             <Text className="text-secondary">
//               Sign in to continue
//             </Text>
//           </View>

//           {/* EMAIL */}

//           <View className="mb-4">
//             <Text className="text-primary font-medium mb-2">
//               Email
//             </Text>

//             <TextInput
//               className="w-full bg-surface p-4 rounded-xl text-primary"
//               placeholder="Enter your email"
//               placeholderTextColor="#999"
//               autoCapitalize="none"
//               keyboardType="email-address"
//               value={emailAddress}
//               onChangeText={setEmailAddress}
//             />
//           </View>

//           {/* PASSWORD */}

//           <View className="mb-6">
//             <Text className="text-primary font-medium mb-2">
//               Password
//             </Text>

//             <TextInput
//               className="w-full bg-surface p-4 rounded-xl text-primary"
//               placeholder="********"
//               placeholderTextColor="#999"
//               secureTextEntry
//               value={password}
//               onChangeText={setPassword}
//             />
//           </View>

//           {/* SIGN IN BUTTON */}

//           <Pressable
//             className={`w-full py-4 rounded-full items-center mb-10 ${
//               loading || !emailAddress || !password
//                 ? "bg-gray-300"
//                 : "bg-primary"
//             }`}
//             onPress={onSignInPress}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text className="text-white font-bold text-lg">
//                 Sign In
//               </Text>
//             )}
//           </Pressable>

//           {/* FOOTER */}

//           <View className="flex-row justify-center">
//             <Text className="text-secondary">
//               Don&apos;t have an account?{" "}
//             </Text>

//             <Link href="/sign-up" asChild>
//               <TouchableOpacity>
//                 <Text className="text-primary font-bold">
//                   Sign Up
//                 </Text>
//               </TouchableOpacity>
//             </Link>
//           </View>
//         </>
//       ) : (
//         <>
//           {/* VERIFY HEADER */}

//           <View className="items-center mb-8">
//             <Text className="text-3xl font-bold text-primary mb-2">
//               Verify Email
//             </Text>

//             <Text className="text-secondary text-center">
//               Enter verification code
//             </Text>
//           </View>

//           {/* OTP INPUT */}

//           <View className="mb-6">
//             <TextInput
//               className="w-full bg-surface p-4 rounded-xl text-primary text-center tracking-widest"
//               placeholder="123456"
//               placeholderTextColor="#999"
//               keyboardType="number-pad"
//               value={code}
//               onChangeText={setCode}
//               maxLength={6}
//             />
//           </View>

//           {/* VERIFY BUTTON */}

//           <Pressable
//             className="w-full bg-primary py-4 rounded-full items-center"
//             onPress={onVerifyPress} 
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text className="text-white font-bold text-lg">
//                 Verify
//               </Text>
//             )}
//           </Pressable>
//         </>
//       )}
//     </SafeAreaView>
//   );
// }







import { COLORS } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import type { SignInFirstFactor } from "@clerk/types";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const [showEmailCode, setShowEmailCode] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= SIGN IN =================

  const onSignInPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({
          session: result.createdSessionId,
        });

        router.replace("/");
      } else if (result.status === "needs_second_factor") {
        const factor = result.supportedSecondFactors?.find(
          (item: SignInFirstFactor | any) =>
            item.strategy === "email_code"
        );

        if (!factor) {
          Alert.alert(
            "Error",
            "Email verification not available"
          );
          return;
        }

        await signIn.prepareSecondFactor({
          strategy: "email_code",
        } as any);

        setShowEmailCode(true);
      }
    } catch (err: any) {
      console.log(err);

      Alert.alert(
        "Login Failed",
        err?.errors?.[0]?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY EMAIL =================

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      setLoading(true);

      const result = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code,
      } as any);

      if (result.status === "complete") {
        await setActive({
          session: result.createdSessionId,
        });

        router.replace("/");
      }
    } catch (err: any) {
      Alert.alert(
        "Verification Failed",
        err?.errors?.[0]?.message ||
          "Invalid code"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios" ? "padding" : undefined
        }
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 24,
            justifyContent: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* BACK BUTTON */}

          <TouchableOpacity
             onPress={() => router.push("/")}
            className="absolute top-5 left-5 h-11 w-11 rounded-full bg-gray-100 items-center justify-center"
            activeOpacity={0.8}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={COLORS.primary} 
            />
          </TouchableOpacity>

          {!showEmailCode ? (
            <>
              {/* HEADER */}

              <View className="items-center mb-10">
                <View className="h-20 w-20 rounded-full bg-primary items-center justify-center mb-5">
                  <Ionicons
                    name="storefront"
                    size={38}
                    color="#fff"
                  />
                </View>

                <Text className="text-4xl font-bold text-primary mb-3">
                  Delhi Mart
                </Text>

                <Text className="text-gray-500 text-base">
                  Welcome back! Login to continue
                </Text>
              </View>

              {/* EMAIL */}

              <View className="mb-5">
                <Text className="text-primary font-semibold mb-2 ml-1">
                  Email Address
                </Text>

                <TextInput
                  className="w-full bg-gray-100 p-4 rounded-2xl text-black"
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                />
              </View>

              {/* PASSWORD */}

              <View className="mb-8">
                <Text className="text-primary font-semibold mb-2 ml-1">
                  Password
                </Text>

                <TextInput
                  className="w-full bg-gray-100 p-4 rounded-2xl text-black"
                  placeholder="Enter password"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              {/* LOGIN BUTTON */}

              <Pressable
                onPress={onSignInPress}
                disabled={loading}
                className={`py-4 rounded-2xl items-center ${
                  loading
                    ? "bg-gray-400"
                    : "bg-primary"
                }`}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white text-lg font-bold">
                    Sign In
                  </Text>
                )}
              </Pressable>

              {/* FOOTER */}

              <View className="flex-row justify-center mt-8">
                <Text className="text-gray-500">
                  Don&apos;t have an account?{" "}
                </Text>

                <Link href="/sign-up" asChild>
                  <TouchableOpacity>
                    <Text className="text-primary font-bold">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </>
          ) : (
            <>
              {/* VERIFY UI */}

              <View className="items-center mb-10">
                <View className="h-20 w-20 rounded-full bg-primary items-center justify-center mb-5">
                  <Ionicons
                    name="mail"
                    size={36}
                    color="#fff"
                  />
                </View>

                <Text className="text-3xl font-bold text-primary mb-2">
                  Verify Email
                </Text>

                <Text className="text-gray-500 text-center">
                  Enter the 6-digit code sent to your email
                </Text>
              </View>

              <TextInput
                className="w-full bg-gray-100 p-5 rounded-2xl text-center text-2xl tracking-[10px] mb-8"
                placeholder="123456"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                maxLength={6}
                value={code}
                onChangeText={setCode}
              />

              <Pressable
                onPress={onVerifyPress}
                disabled={loading}
                className="bg-primary py-4 rounded-2xl items-center"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white text-lg font-bold">
                    Verify Code
                  </Text>
                )}
              </Pressable>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}