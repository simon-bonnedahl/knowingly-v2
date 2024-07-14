import { MoonStar, Sun } from 'lucide-react-native';
import {  useColorScheme } from 'nativewind';
import { Appearance, Pressable, View } from 'react-native';
import { cn } from '~/lib/utils';

export function ThemeToggle() {
  const { colorScheme } = useColorScheme();


  const toggleTheme = () => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    Appearance.setColorScheme(newTheme);
  }
  return (
    <Pressable
      onPress={toggleTheme}
      className='web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2'
    >
      {({ pressed }) => (
        <View
          className={cn(
            'flex-1 aspect-square pt-0.5 justify-center items-start web:px-5',
            pressed && 'opacity-70'
          )}
        >
          {colorScheme === "dark" ? (
            <MoonStar className='text-foreground' size={23} strokeWidth={1.25} />
          ) : (
            <Sun className='text-foreground' size={24} strokeWidth={1.25} />
          )}
        </View>
      )}
    </Pressable>
  );
}
