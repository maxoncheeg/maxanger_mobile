import { signalRService } from '@/shared/api/services/signalr-service'
import { useTheme } from '@/shared/hooks/themes/use-theme'
import { CURRENT_THEME } from '@/shared/ui/constants/themes'
import CollapsingText from '@/shared/ui/text/collapsing-text'
import { SignalRContext } from '@shared/api/contexts/signalr/signalr-context'
import { MotiView } from 'moti'
import React, { useContext, useEffect, useState } from 'react'
import { Pressable, Text } from 'react-native'

export default function ServerConnection() {
    const theme = useTheme(CURRENT_THEME)

    const [text, setText] = useState("[CONNECTING]")
    const [color, setColor] = useState(theme.extraColor)
    const signal = useContext(SignalRContext)

    useEffect(() => {
        if (signal.isConnected) {
            setText("ПОДКЛЮЧЕНО")
            setColor(theme.baseColor)
        }
        else if (signal.isConnecting) {
            setText("ПОДКЛЮЧЕНИЕ")
            setColor(theme.extraColor)
        }
        else {
            setText("ОТКЛЮЧЕНО")
            setColor(theme.errorColor)
        }
    }, [signal.isConnected, signal.isConnecting, theme.baseColor, theme.errorColor, theme.extraColor])

    const reconnect = () => {
        if (signal.isConnected) return;

        console.log("reconnect?")
        signalRService.stop()
        signalRService.start()
    }

    return (
        <Pressable onPress={() => reconnect()}>
            <MotiView style={{ flexDirection: "row", gap: 10, justifyContent: "flex-start" }}>
                <Text style={{ color: theme.baseColor, fontWeight: "900" }}>MAXANGER</Text>
                <CollapsingText start='[' end=']' color={color}>{text}</CollapsingText>
            </MotiView>
        </Pressable>
    )
}
