
// import { useAuth, useSignUp } from '@clerk/expo'
// import { type Href, Link, useRouter } from 'expo-router'
// import React from 'react'
// import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

// export default function Page() {
//   const { signUp, errors, fetchStatus } = useSignUp()
//   const { isSignedIn } = useAuth()
//   const router = useRouter()

//   const [emailAddress, setEmailAddress] = React.useState('')
//   const [password, setPassword] = React.useState('')
//   const [code, setCode] = React.useState('')

//   const handleSubmit = async () => {
//     const { error } = await signUp.password({
//       emailAddress,
//       password,
//     })
//     if (error) {
//       console.error(JSON.stringify(error, null, 2))
//       return
//     }

//     if (!error) await signUp.verifications.sendEmailCode()
//   }

//   const handleVerify = async () => {
//     await signUp.verifications.verifyEmailCode({
//       code,
//     })
//     if (signUp.status === 'complete') {
//       await signUp.finalize({
//         // Redirect the user to the home page after signing up
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
//       // Check why the sign-up is not complete
//       console.error('Sign-up attempt not complete:', signUp)
//     }
//   }

//   if (signUp.status === 'complete' || isSignedIn) {
//     return null
//   }

//   if (
//     signUp.status === 'missing_requirements' &&
//     signUp.unverifiedFields.includes('email_address') &&
//     signUp.missingFields.length === 0
//   ) {
//     return (
//       <View style={styles.container}>
//         <Text  style={styles.title}>
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
//           onPress={() => signUp.verifications.sendEmailCode()}
//         >
//           <Text style={styles.secondaryButtonText}>I need a new code</Text>
//         </Pressable>
//       </View>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <Text  style={styles.title}>
//         Sign up
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
//       {errors.fields.emailAddress && (
//         <Text style={styles.error}>{errors.fields.emailAddress.message}</Text>
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
//         <Text style={styles.buttonText}>Sign up</Text>
//       </Pressable>
//       {/* For your debugging purposes. You can just console.log errors, but we put them in the UI for convenience */}
//       {errors && <Text style={styles.debug}>{JSON.stringify(errors, null, 2)}</Text>}

//       <View style={styles.linkContainer}>
//         <Text>Already have an account? </Text>
//         <Link href="/sign-in">
//           <Text >Sign in</Text>
//         </Link>
//       </View>

//       {/* Required for sign-up flows. Clerk's bot sign-up protection is enabled by default */}
//       <View nativeID="clerk-captcha" />
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
// import { useSignUp } from "@clerk/clerk-expo";
// import { Ionicons } from "@expo/vector-icons";
// import { Link, useRouter } from "expo-router";
// import { useState } from "react";
// import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Toast from 'react-native-toast-message';

// export default function SignUpScreen() {
//     const { isLoaded, signUp, setActive } = useSignUp();
//     const router = useRouter();

//     const [emailAddress, setEmailAddress] = useState("");
//     const [password, setPassword] = useState("");
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [code, setCode] = useState("");
//     const [pendingVerification, setPendingVerification] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const onSignUpPress = async () => {
//         if (!isLoaded) return;

//         if (!emailAddress || !password) {
//             Toast.show({
//                 type: 'error',
//                 text1: 'Missing Fields',
//                 text2: 'Please fill in all fields'
//             });
//             return;
//         }

//         setLoading(true);
//         try {
//             await signUp.create({
//                 emailAddress,
//                 password,
//                 firstName,
//                 lastName,
//             });

//             await signUp.prepareEmailAddressVerification({
//                 strategy: "email_code",
//             });

//             setPendingVerification(true);
//         } catch (err: any) {
//             Toast.show({
//                 type: 'error',
//                 text1: 'Failed to Sign Up',
//                 text2: err?.errors?.[0]?.message ?? "Something went wrong"
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const onVerifyPress = async () => {
//         if (!isLoaded) return;

//         if (!code) {
//             Toast.show({
//                 type: 'error',
//                 text1: 'Missing Fields',
//                 text2: 'Enter verification code'
//             });
//             return;
//         }

//         setLoading(true);
//         try {
//             const attempt = await signUp.attemptEmailAddressVerification({ code });

//             if (attempt.status === "complete") {
//                 await setActive({ session: attempt.createdSessionId });
//                 router.replace("/");
//             } else {
//                 Toast.show({
//                     type: 'error',
//                     text1: 'Verification incomplete'
//                 });
//             }
//         } catch (err: any) {
//             Toast.show({
//                 type: 'error',
//                 text1: 'Failed to Verify',
//                 text2: err?.errors?.[0]?.message ?? "Invalid code"
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <SafeAreaView className="flex-1 bg-white justify-center" style={{ padding: 28 }}>
//             {!pendingVerification ? (
//                 <>
//                     <TouchableOpacity onPress={() => router.push("/")} className="absolute top-12 z-10">
//                         <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
//                     </TouchableOpacity>

//                     {/* Header */}
//                     <View className="items-center mb-8">
//                         <Text className="text-3xl font-bold text-primary mb-2">Create Account</Text>
//                         <Text className="text-secondary">Sign up to get started</Text>
//                     </View>

//                     {/* First Name */}
//                     <View className="mb-4">
//                         <Text className="text-primary font-medium mb-2">First Name</Text>
//                         <TextInput className="w-full bg-surface p-4 rounded-xl text-primary" placeholder="Enter name" placeholderTextColor="#999" value={firstName} onChangeText={setFirstName} />
//                     </View>

//                     {/* Last Name */}
//                     <View className="mb-6">
//                         <Text className="text-primary font-medium mb-2">Last Name</Text>
//                         <TextInput className="w-full bg-surface p-4 rounded-xl text-primary" placeholder="Enter Your Full name " placeholderTextColor="#999" value={lastName} onChangeText={setLastName} />
//                     </View>

//                     {/* Email */}
//                     <View className="mb-4">
//                         <Text className="text-primary font-medium mb-2">Email</Text>
//                         <TextInput className="w-full bg-surface p-4 rounded-xl text-primary" placeholder="Enter Your Email" placeholderTextColor="#999" autoCapitalize="none" keyboardType="email-address" value={emailAddress} onChangeText={setEmailAddress} />
//                     </View>

//                     {/* Password */}
//                     <View className="mb-6">
//                         <Text className="text-primary font-medium mb-2">Password</Text>
//                         <TextInput className="w-full bg-surface p-4 rounded-xl text-primary" placeholder="********" placeholderTextColor="#999" secureTextEntry value={password} onChangeText={setPassword} />
//                     </View>

//                     {/* Submit */}
//                     <TouchableOpacity className="w-full bg-primary py-4 rounded-full items-center mb-10" onPress={onSignUpPress} disabled={loading}>
//                         {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-lg">Continue</Text>}
//                     </TouchableOpacity>

//                     {/* Footer */}
//                     <View className="flex-row justify-center">
//                         <Text className="text-secondary">Already have an account? </Text>
//                         <Link href="/sign-in">
//                             <Text className="text-primary font-bold">Login</Text>
//                         </Link>
//                     </View>
//                 </>
//             ) : (
//                 <>
//                     <TouchableOpacity onPress={() => router.back()} className="absolute top-12 z-10">
//                         <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
//                     </TouchableOpacity>

//                     {/* Verification */}
//                     <View className="items-center mb-8">
//                         <Text className="text-3xl font-bold text-primary mb-2">Verify Email</Text>
//                         <Text className="text-secondary text-center">Enter the code sent to your email</Text>
//                     </View>

//                     <View className="mb-6">
//                         <TextInput className="w-full bg-surface p-4 rounded-xl text-primary text-center tracking-widest" placeholder="123456" placeholderTextColor="#999" keyboardType="number-pad" value={code} onChangeText={setCode} />
//                     </View>

//                     <TouchableOpacity className="w-full bg-primary py-4 rounded-full items-center" onPress={onVerifyPress} disabled={loading}>
//                         {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-lg">Verify</Text>}
//                     </TouchableOpacity>
//                 </>
//             )}
//         </SafeAreaView>
//     );
// }








import { COLORS } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [code, setCode] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignUpPress = async () => {
        if (!isLoaded) return;

        if (!emailAddress || !password || !firstName || !lastName) {
            Toast.show({
                type: "error",
                text1: "Missing Fields",
                text2: "Please fill in all fields",
            });
            return;
        }

        setLoading(true);

        try {
            await signUp.create({
                emailAddress,
                password,
                firstName,
                lastName,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            setPendingVerification(true);

            Toast.show({
                type: "success",
                text1: "Verification Sent",
                text2: "Check your email for code",
            });
        } catch (err: any) {
            Toast.show({
                type: "error",
                text1: "Failed to Sign Up",
                text2:
                    err?.errors?.[0]?.message ??
                    "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    };

    const onVerifyPress = async () => {
        if (!isLoaded) return;

        if (!code) {
            Toast.show({
                type: "error",
                text1: "Missing Code",
                text2: "Enter verification code",
            });
            return;
        }

        setLoading(true);

        try {
            const attempt =
                await signUp.attemptEmailAddressVerification({
                    code,
                });

            if (attempt.status === "complete") {
                await setActive({
                    session: attempt.createdSessionId,
                });

                Toast.show({
                    type: "success",
                    text1: "Account Created",
                });

                router.replace("/");
            }
        } catch (err: any) {
            Toast.show({
                type: "error",
                text1: "Verification Failed",
                text2:
                    err?.errors?.[0]?.message ??
                    "Invalid verification code",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1"
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                        padding: 24,
                        paddingBottom: 40,
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    {!pendingVerification ? (
                        <View className="flex-1 justify-center">
                            {/* Back Button */}
                            <TouchableOpacity
                                onPress={() => router.push("/")}
                                className="mb-8"
                            >
                                <Ionicons
                                    name="arrow-back"
                                    size={26}
                                    color={COLORS.primary}
                                />
                            </TouchableOpacity>

                            {/* Header */}
                            <View className="mb-10">
                                <Text className="text-4xl font-bold text-primary mb-2">
                                    Create Account
                                </Text>

                                <Text className="text-gray-500 text-base">
                                    Sign up to continue
                                </Text>
                            </View>

                            {/* First Name */}
                            <View className="mb-5">
                                <Text className="text-primary font-semibold mb-2">
                                    First Name
                                </Text>

                                <TextInput
                                    className="bg-gray-100 px-5 py-4 rounded-2xl text-primary"
                                    placeholder="Enter first name"
                                    placeholderTextColor="#999"
                                    value={firstName}
                                    onChangeText={setFirstName}
                                />
                            </View>

                            {/* Last Name */}
                            <View className="mb-5">
                                <Text className="text-primary font-semibold mb-2">
                                    Last Name
                                </Text>

                                <TextInput
                                    className="bg-gray-100 px-5 py-4 rounded-2xl text-primary"
                                    placeholder="Enter last name"
                                    placeholderTextColor="#999"
                                    value={lastName}
                                    onChangeText={setLastName}
                                />
                            </View>

                            {/* Email */}
                            <View className="mb-5">
                                <Text className="text-primary font-semibold mb-2">
                                    Email Address
                                </Text>

                                <TextInput
                                    className="bg-gray-100 px-5 py-4 rounded-2xl text-primary"
                                    placeholder="Enter email"
                                    placeholderTextColor="#999"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={emailAddress}
                                    onChangeText={setEmailAddress}
                                />
                            </View>

                            {/* Password */}
                            <View className="mb-8">
                                <Text className="text-primary font-semibold mb-2">
                                    Password
                                </Text>

                                <TextInput
                                    className="bg-gray-100 px-5 py-4 rounded-2xl text-primary"
                                    placeholder="Enter password"
                                    placeholderTextColor="#999"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>

                            {/* Button */}
                            <TouchableOpacity
                                className="bg-primary py-4 rounded-2xl items-center shadow-lg"
                                onPress={onSignUpPress}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text className="text-white font-bold text-lg">
                                        Create Account
                                    </Text>
                                )}
                            </TouchableOpacity>

                            {/* Footer */}
                            <View className="flex-row justify-center mt-8">
                                <Text className="text-gray-500">
                                    Already have an account?
                                </Text>

                                <Link href="/sign-in" asChild>
                                    <TouchableOpacity>
                                        <Text className="text-primary font-bold ml-2">
                                            Login
                                        </Text>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        </View>
                    ) : (
                        <View className="flex-1 justify-center">
                            {/* Back */}
                            <TouchableOpacity
                                onPress={() =>
                                    setPendingVerification(false)
                                }
                                className="mb-8"
                            >
                                <Ionicons
                                    name="arrow-back"
                                    size={26}
                                    color={COLORS.primary}
                                />
                            </TouchableOpacity>

                            {/* Header */}
                            <View className="items-center mb-10">
                                <View className="bg-primary/10 p-5 rounded-full mb-5">
                                    <Ionicons
                                        name="mail-outline"
                                        size={40}
                                        color={COLORS.primary}
                                    />
                                </View>

                                <Text className="text-3xl font-bold text-primary mb-2">
                                    Verify Email
                                </Text>

                                <Text className="text-gray-500 text-center">
                                    Enter the verification code sent to your
                                    email
                                </Text>
                            </View>

                            {/* Code Input */}
                            <View className="mb-8">
                                <TextInput
                                    className="bg-gray-100 px-5 py-5 rounded-2xl text-center text-2xl tracking-[10px] text-primary"
                                    placeholder="123456"
                                    placeholderTextColor="#999"
                                    keyboardType="number-pad"
                                    value={code}
                                    onChangeText={setCode}
                                    maxLength={6}
                                />
                            </View>

                            {/* Verify Button */}
                            <TouchableOpacity
                                className="bg-primary py-4 rounded-2xl items-center"
                                onPress={onVerifyPress}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text className="text-white font-bold text-lg">
                                        Verify Email
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}