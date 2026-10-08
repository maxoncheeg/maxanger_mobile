
export interface Theme {
    baseBackground: string,
    activeBackground: string,
    inactiveBackground: string,
    baseColor: string,
    activeColor: string,
    inactiveColor: string,
    extraColor: string,
    errorColor: string,
    consoleBackground: string,
    barStyle: ('light-content' | 'dark-content')
}


export const themes: Record<string, Theme> = {
    "dark": {
        baseBackground: "#001003",
        activeBackground: "#0a3500",
        inactiveBackground: "#0a350000",
        baseColor: "#2fab2d",
        activeColor: "#2fab2d",
        inactiveColor: "#d7be00",
        extraColor: "#d7be00",
        errorColor: "#d71500",
        consoleBackground: "#000000",
        barStyle: 'light-content'
    },
    "light": {
        baseBackground: "#e4fbe8",
        activeBackground: "#0a3500",
        inactiveBackground: "#69770000",
        baseColor: "#2fab2d",
        activeColor: "#d7be00",
        inactiveColor: "#19d700",
        extraColor: "#d7be00",
        errorColor: "#d71500",
        consoleBackground: "#001003",
        barStyle: 'dark-content'
    },
}

export const CURRENT_THEME = "dark"