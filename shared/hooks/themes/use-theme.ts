import { themes } from "@/shared/ui/constants/themes";

export function useTheme(themeName: string) {
    return themes[themeName];
}
