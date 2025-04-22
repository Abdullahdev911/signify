import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/Context/themeContext';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const { theme } = useTheme();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const validateInputs = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    if (!emailAddress.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(emailAddress)) {
      setEmailError('Invalid email format');
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    return valid;
  };

  const onSignInPress = async () => {
    if (!isLoaded || !validateInputs()) return;

    try {
      setLoading(true);
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/home');
      } else {
        setGeneralError('Additional steps required. Please check your email.');
      }
    } catch (err: any) {
      const message =
        err.errors?.[0]?.message || 'Sign-in failed. Please try again.';
      setGeneralError(message);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.heading, { color: theme.text }]}>Sign in</Text>
      <Text style={[styles.subheading, { color: theme.text }]}>
        Get Access to Premium Features
      </Text>

      <TextInput
        autoCapitalize="none"
        placeholder="Enter email"
        placeholderTextColor={theme.text}
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            borderColor: emailError ? '#FF4C4C' : theme.border,
            color: theme.text,
          },
        ]}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        placeholder="Enter password"
        secureTextEntry
        placeholderTextColor={theme.text}
        value={password}
        onChangeText={setPassword}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            borderColor: passwordError ? '#FF4C4C' : theme.border,
            color: theme.text,
          },
        ]}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      {generalError ? (
        <Text style={[styles.errorText, { marginTop: 5 }]}>{generalError}</Text>
      ) : null}

      <TouchableOpacity
        onPress={onSignInPress}
        style={[styles.btn, { backgroundColor: theme.primary }]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <View style={styles.btnInner}>
            <Text style={[styles.btnText, { color: 'white' }]}>Continue</Text>
            <AntDesign name="arrowright" size={16} color="white" />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.bottom}>
        <Text style={[styles.bottomText, { color: theme.text }]}>
          Don't have an account?
        </Text>
        <Link href="/(auth)/sign-up">
          <Text
            style={[
              styles.bottomText,
              {
                color: theme.text,
                textDecorationLine: 'underline',
                fontWeight: '800',
              },
            ]}
          >
            Sign Up
          </Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'OpenSans',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontFamily: 'OpenSans',
    fontSize: 16,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: 'OpenSans',
  },
  btn: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 100,
    alignItems: 'center',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    gap: 6,
  },
  bottomText: {
    fontFamily: 'OpenSans',
    fontSize: 14,
  },
  btnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btnText: {
    fontSize: 16,
    fontFamily: 'OpenSans',
  },
  errorText: {
    color: '#FF4C4C',
    fontSize: 14,
    fontFamily: 'OpenSans',
    marginBottom: 10,
  },
});
