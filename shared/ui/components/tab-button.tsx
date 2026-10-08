import { useTheme } from "@/shared/hooks/themes/use-theme"
import { CURRENT_THEME } from "@/shared/ui/constants/themes"
import { MotiView } from "moti"
import { useMemo } from "react"
import { Pressable, StyleSheet } from "react-native"
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated"
import Icon from "../icons/icon"
import { TabItem } from "./tabs"

interface MaxangerTabButtonProps {
    index: number,
    item: TabItem,
    isSelected: boolean,
    onChange: (index: number) => void
}

export function MaxangerTabButton({ index, item, isSelected, onChange }: MaxangerTabButtonProps) {
    const theme = useTheme(CURRENT_THEME)
    const backgroundColor = useMemo(() => isSelected ? theme.activeBackground : theme.inactiveBackground,
        [isSelected, theme.activeBackground, theme.inactiveBackground])
    const foregroundColor = useMemo(() => isSelected ? theme.activeColor : theme.inactiveColor,
        [isSelected, theme.activeColor, theme.inactiveColor])

    return (
        <MotiView
            animate={{
                backgroundColor: backgroundColor
            }}
            style={styles.container}
            layout={LinearTransition.springify(200).damping(80).stiffness(200)}>

            <Pressable
                onPress={() => onChange(index)}
                style={styles.button}
            >
                <Icon name={item.icon} color={foregroundColor} />

                {isSelected &&
                    <Animated.Text
                        entering={FadeIn.springify().damping(80).stiffness(200)}
                        exiting={FadeOut.springify().damping(80).stiffness(200)}
                        style={{ color: foregroundColor }}>
                        {item.name}
                    </Animated.Text>}
            </Pressable>
        </MotiView>
    )
}


const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        padding: 5,
        borderRadius: 8
    },
    button: {
        overflow: 'hidden',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
    }
})