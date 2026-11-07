import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
export default function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeForm, setActiveForm] = useState('signin');
    const [loginMethod, setLoginMethod] = useState('email');
    const [loginPhone, setLoginPhone] = useState('');
    const [hidePassword, sethidePassword] = useState(true);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    function handleSignUp() {
        if (!fullName.trim() || !email.trim() || !password) {
            Alert.alert(
                'Missing information',
                'Please fill in all required fields.',
            );
            return;
        }

        // The fields are filled. Connect account creation here later.
    }
    function handleSignIn() {
        const identifier =
            loginMethod === 'email' ? email.trim() : loginPhone.trim();

        if (!identifier || !password) {
            Alert.alert(
                'Missing information',
                'Enter your email or phone number and password.',
            );
            return;
        }

        // Connect sign-in here later.
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
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable onPress={() => setLoginMethod('email')}>
                            <Text>Email</Text>
                        </Pressable>

                        <Pressable onPress={() => setLoginMethod('phone')}>
                            <Text>Phone Number</Text>
                        </Pressable>
                    </View>

                    <Text>
                        {loginMethod === 'email'
                            ? 'Student Email'
                            : 'Phone Number'}
                    </Text>
                    <TextInput
                        placeholder={
                            loginMethod === 'email'
                                ? 'example@xyz.com'
                                : 'Enter your phone number'
                        }
                        value={loginMethod === 'email' ? email : loginPhone}
                        onChangeText={
                            loginMethod === 'email' ? setEmail : setLoginPhone
                        }
                        keyboardType={
                            loginMethod === 'email'
                                ? 'email-address'
                                : 'phone-pad'
                        }
                        autoCapitalize="none"
                    />

                    <Pressable onPress={() => setActiveForm('forgotPassword')}>
                        <Text>Forgot password?</Text>
                    </Pressable>
                    <Text>Password</Text>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={hidePassword}
                            style={{ flex: 1 }}
                        />
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
                                <SimpleLineIcons
                                    name="eye"
                                    size={20}
                                    color="#534c4c"
                                />
                            )}
                        </Pressable>
                    </View>

                    <Pressable onPress={handleSignIn}>
                        <Text>Sign In</Text>
                    </Pressable>
                </View>
            ) : (
                <View>
                    <Text>Full Name</Text>
                    <TextInput
                        placeholder="Alex Morgan"
                        value={fullName}
                        onChangeText={setFullName}
                        accessibilityLabel="Full Name, required"></TextInput>
                    <Text>Student Mail Id</Text>
                    <TextInput
                        placeholder="example@xyz.com"
                        value={email}
                        onChangeText={setEmail}></TextInput>
                    <Text>Password</Text>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={hidePassword}
                            style={{ flex: 1 }}></TextInput>
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
                                <SimpleLineIcons
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
