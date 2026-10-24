import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { Foundation, Ionicons } from '@expo/vector-icons';
// import Ionicons from '@expo/vector-icons/Ionicons';
export default function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeForm, setActiveForm] = useState('signin');
    const [hidePassword, sethidePassword] = useState(true);
    const [fullName, setFullName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    function handleSignUp() {
        if (
            !fullName.trim() ||
            !studentId.trim() ||
            !email.trim() ||
            !password
        ) {
            Alert.alert(
                'Missing information',
                'Please fill in all required fields.',
            );
            return;
        }

        // The fields are filled. Connect account creation here later.
    }
    if (activeForm === 'forgotPassword') {
        return (
            <View>
                <Pressable onPress={() => setActiveForm('signin')}>
                    <Text>← Back to Sign In</Text>
                </Pressable>
                <Text style={{ fontSize: 28, fontWeight: 'bold' }}>
                    Forgot password?
                </Text>
                <Text>
                    Enter the phone number linked to your account. We'll send
                    you a verification code.
                </Text>

                <Text>Phone Number</Text>
                <TextInput
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />

                <Pressable
                    onPress={() =>
                        Alert.alert(
                            'Not connected yet',
                            'Sending an OTP will work after the backend is connected.',
                        )
                    }>
                    <Text>Send OTP</Text>
                </Pressable>
            </View>
        );
    }
    return (
        <View>
            <Text
                style={{
                    fontSize: 36,
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}>
                Wash Wise
            </Text>
            <Text style={{ fontSize: 16, textAlign: 'center', color: '#555' }}>
                Laundry, without the waiting.
            </Text>
            <Text>Create your Wahwise Account</Text>
            <View>
                <Pressable onPress={() => setActiveForm('signin')}>
                    <Text>Sign In</Text>
                </Pressable>

                <Pressable onPress={() => setActiveForm('signup')}>
                    <Text>Sign Up</Text>
                </Pressable>
            </View>
            {activeForm === 'signin' ? (
                <View>
                    <Text>Student Email</Text>
                    <TextInput placeholder="example@xyz.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
                    {/* <TextInput placeholder="example@xyz.com"></TextInput> */}
                    <Pressable onPress={() => setActiveForm('forgotPassword')}>
                        <Text>Forgot password?</Text>
                    </Pressable>
                </View>
            ) : (
                <View>
                    <Text>Full Name</Text>
                    <TextInput placeholder="Alex Morgan" value={fullName} onChangeText={setFullName} accessibilityLabel="Full Name, required"></TextInput>
                    <Text>Student Id</Text>
                    <TextInput placeholder="example@xyz.com"></TextInput>
                    <Text>Password</Text>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput placeholder="Password" secureTextEntry={hidePassword} style={{ flex: 1 }}></TextInput>
                        <Pressable
                            onPress={() =>
                                sethidePassword((previous) => !previous)
                            }>
                            {hidePassword ? (
                                <Ionicons
                                    name="eye-off-sharp"
                                    size={20}
                                    color="#413e3e"
                                />
                            ) : (
                                <Foundation
                                    name="eye"
                                    size={20}
                                    color="#534c4c"
                                />
                            )}
                        </Pressable>
                    </View>
                        <Pressable onPress={handleSignUp}>
                            <Text>Create Account</Text>
                        </Pressable>
                </View>
            )}
        </View>
    );
} 