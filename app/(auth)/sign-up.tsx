import * as React from 'react';
import {
  Text, TextInput, TouchableOpacity,
  View, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useTheme } from '@/Context/themeContext';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const { theme } = useTheme();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [code, setCode] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password || !confirmPassword) {
      return setError('Please fill in all fields.');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    setLoading(true);
    setError('');

    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      const clerkError = err?.errors?.[0]?.message || 'Something went wrong.';
      setError(clerkError);
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    if (!code) return setError('Enter the verification code.');

    setLoading(true);
    setError('');

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.replace('/');
      } else {
        setError('Verification incomplete. Try again.');
      }
    } catch (err) {
      const verifyError = err?.errors?.[0]?.message || 'Invalid code.';
      setError(verifyError);
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: theme.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={[styles.heading, { color: theme.text }]}>Verify your email</Text>
          <Text style={[styles.subheading, { color: theme.text }]}>
            Enter the verification code sent to your email.
          </Text>

          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="Verification code"
            placeholderTextColor={theme.text}
            keyboardType="numeric"
            style={[styles.input, {
              backgroundColor: theme.card,
              borderColor: theme.border,
              color: theme.text,
            }]}
          />

          {error ? <Text style={[styles.errorText]}>{error}</Text> : null}

          <TouchableOpacity onPress={onVerifyPress} style={[styles.btn, { backgroundColor: theme.primary }]}>
            {loading ? <ActivityIndicator color="white" /> : (
              <View style={styles.btnInner}>
                <Text style={[styles.btnText, { color: 'white' }]}>Verify</Text>
                <AntDesign name="checkcircle" size={16} color="white" />
              </View>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={[styles.heading, { color: theme.text }]}>Sign up</Text>
        <Text style={[styles.subheading, { color: theme.text }]}>
          Create an account to get access
        </Text>

        <TextInput
          autoCapitalize="none"
          placeholder="Enter email"
          placeholderTextColor={theme.text}
          value={emailAddress}
          onChangeText={setEmailAddress}
          style={[styles.input, {
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text,
          }]}
        />

        <TextInput
          placeholder="Enter password"
          secureTextEntry
          placeholderTextColor={theme.text}
          value={password}
          onChangeText={setPassword}
          style={[styles.input, {
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text,
          }]}
        />

        <TextInput
          placeholder="Re-enter password"
          secureTextEntry
          placeholderTextColor={theme.text}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[styles.input, {
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text,
          }]}
        />

        {error ? <Text style={[styles.errorText]}>{error}</Text> : null}

        <TouchableOpacity onPress={onSignUpPress} style={[styles.btn, { backgroundColor: theme.primary }]}>
          {loading ? <ActivityIndicator color="white" /> : (
            <View style={styles.btnInner}>
              <Text style={[styles.btnText, { color: 'white' }]}>Continue</Text>
              <AntDesign name="arrowright" size={16} color="white" />
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.bottom}>
          <Text style={[styles.bottomText, { color: theme.text }]}>Already have an account?</Text>
          <Link href="/sign-in">
            <Text style={[styles.bottomText, {
              color: theme.text,
              textDecorationLine: 'underline',
              fontWeight: '800'
            }]}>Sign in</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
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
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'OpenSans',
  },
  btn: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 100,
    alignItems: 'center',
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
});
