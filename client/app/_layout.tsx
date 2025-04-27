import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Slot } from 'expo-router';

import '../global.css';
import { SessionProvider } from '@/context/session';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "gluestack",
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const [colorScheme, setColorScheme] = useState('light');

    return (
        <GluestackUIProvider mode={colorScheme === 'dark' ? 'dark' : 'light'}>
            <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
                <SessionProvider>
                    <Slot />
                </SessionProvider>
            </ThemeProvider>
        </GluestackUIProvider>
    );
}
