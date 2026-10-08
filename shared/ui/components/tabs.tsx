import icons from 'lucide-react-native/icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaxangerTabButton } from './tab-button';

export interface TabItem {
    icon: keyof typeof icons;
    name: string
}

export interface TabsProps {
    tabs: TabItem[];
    selectedIndex: number;
    onChange: (index: number) => void
}

export function MaxangerTabs({ tabs, selectedIndex, onChange }: TabsProps) {
    return (
        <View
            style={styles.container}>
            {tabs.map((item, index) =>
                <MaxangerTabButton
                    key={index}
                    isSelected={selectedIndex === index}
                    item={item}
                    index={index}
                    onChange={onChange} />
            )}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
        overflow: 'hidden'
    },
});