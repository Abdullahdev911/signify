import { View, Text, useColorScheme } from 'react-native'
import {createContext,useContext} from 'react'
import {lightTheme,darkTheme} from '../Theme/theme.js'
const ThemeContext = createContext();

export  function ThemeProvider({children}) {
    const scheme = useColorScheme(); 
    const theme = scheme === 'dark' ? darkTheme : lightTheme;

    return (
    <ThemeContext.Provider value={{ theme, isDarkMode: scheme === 'dark' }}>
        {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)