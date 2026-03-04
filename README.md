UserAuthApp is a React Native CLI (TypeScript) demo that implements Login and Signup flows using React Context API with persisted authentication via AsyncStorage and navigation via React Navigation.

# Features (Implemented)
- Context-based authentication (login, signup, logout) with a single provider
- Persistence with AsyncStorage to keep the user signed in across restarts
- React Navigation (native stack) with conditional routing based on auth state
- Validation and helpful error messages on both forms
- Home screen shows the active user’s name and email, with logout
- Password visibility toggle using MaterialCommunityIcons

# Project Structure
- src/context/AuthContext.tsx — global auth state and actions
- src/navigation/AppNavigator.tsx — navigation and conditional stacks
- src/screens/LoginScreen.tsx — login form with validation and errors
- src/screens/SignupScreen.tsx — signup form with validation and errors
- src/screens/HomeScreen.tsx — user details and logout

# Prerequisites
- Follow React Native Environment Setup: https://reactnative.dev/docs/set-up-your-environment
- iOS: Xcode + CocoaPods; Android: Android Studio + SDKs
- Node 22+ (see package.json engines)

# Install Dependencies
npm install
# iOS only
npx pod-install

# Run the App
Start Metro in one terminal:

npm start


Android:
npm run android

iOS:
npm run ios

# Notes
- This demo stores users in AsyncStorage for simplicity; there is no backend.
- Remove the app and reinstall to clear stored users, or clear app storage from device settings.
- Password visibility toggles appear on both login and signup screens.

# Email Validation
- Where the error appears
  - Login and Signup show a clear inline message near the fields if the email is malformed.
- What “invalid email format” means
  - The app trims spaces and expects the shape “name@domain.tld”.
  - Examples accepted: `alice@example.com`, `john.smith+test@sub.domain.co`.
  - Examples rejected: `alice@`, `alice@.com`, `aliceexample.com`, `alice@domain`, or emails with spaces.
- How to fix
  - Edit the email to a valid format and try again. Other issues show descriptive messages like “Please fill all fields.” or “Password must be at least 6 characters.” on Signup, and “Incorrect credentials.” on Login when the email/password pair is wrong.
- Applies to
  - Both Login and Signup screens.

# Troubleshooting
- Android
  - If build fails with AsyncStorage resolution errors, ensure the `allprojects { repositories { maven { url = .../local_repo } } }` block exists in [android/build.gradle]
  - If icons render as squares, reinstall the app so fonts are repackaged.
- iOS
  - If icons don’t appear, make sure pods are installed: `npx pod-install`, then rebuild.

**  #ShortVideo**

https://drive.google.com/file/d/1Cf1jvT5h-lTbabOCVYjqhDwXjr-50OAn/view?usp=sharing

  
