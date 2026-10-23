import { View, Text } from 'react-native';
import {useState} from 'react';
export default function SignupScreen() {
     const [activeForm, setActiveForm] = useState("signin");
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
        <Pressable onPress={() => setActiveForm("signin")}>
          <Text>Sign In</Text>
        </Pressable>

        <Pressable onPress={() => setActiveForm("signup")}>
          <Text>Sign Up</Text>
        </Pressable>
      </View>

      {activeForm === "signin" ? (
        <Text>Your sign-in form goes here</Text>
      ) : (
        <Text>Your sign-up form goes here</Text>
      )}
    </View>
    );
}