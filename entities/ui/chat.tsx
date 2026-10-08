import { useTheme } from '@/shared/hooks/themes/use-theme'
import { MotiView } from 'moti'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ChatInfo } from '../models/chats'

interface ChatProps {
    chat: ChatInfo
}

export default function Chat({ chat }: ChatProps) {
    const theme = useTheme("dark")

    return (
        <MotiView style={styles.container}
        >
            <View style={[styles.idContainer]}>
                <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    style={[styles.idText, { color: theme.baseColor }]}>
                    {chat.lastMessage ? new Date(chat.lastMessage.createdAt).toLocaleTimeString() : ""}
                </Text>
            </View>
            <View style={{paddingRight: 30, overflow: 'hidden'}}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={[styles.title, { color: theme.extraColor }]}>
                    {chat.name}
                </Text>
                <View style={styles.chatContainer}>
                    {chat.lastMessage &&
                        <Text style={[{ color: theme.activeColor }]}>
                            {chat.lastMessage.username}: {chat.lastMessage.content}
                        </Text>
                        ||
                        <Text style={[{ color: theme.activeColor }]}>
                            no messages
                        </Text>
                    }
                </View>
            </View>
        </MotiView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 1,
        flexDirection: 'row',
        gap: 10
    },
    chatContainer: {
        marginVertical: 10,

        flexDirection: 'row'
    },
    idContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: 40,
    },
    idText: {
        fontWeight: '900',
    },
    title: {
        fontWeight: '900',
        paddingRight: 30
    }
})