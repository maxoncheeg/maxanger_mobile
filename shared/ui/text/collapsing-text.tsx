import { MotiText } from "moti"
import { useEffect, useState } from "react"

interface CollapsingTextProps {
    children: string,
    start: string,
    end: string,
    color: string
}

export default function CollapsingText({ children, start, end, color }: CollapsingTextProps) {
    const [targetText, setTargetText] = useState<string>(children)
    const [currentText, setCurrentText] = useState<string>('')
    const [isExpanding, setIsExpanding] = useState<boolean>(false)
    const [currentLength, setCurrentLength] = useState<number>(0)

    useEffect(() => {
        setTargetText(children)

        if (!isExpanding && currentText.length > 0 && currentText !== targetText) {
            const timer = setTimeout(() => {
                setCurrentText(prev => prev.substring(0, prev.length - 1));
            }, 60);

            return () => clearTimeout(timer);
        }
        else if (currentText !== targetText) {
            setIsExpanding(true)

            if (currentText.length === 0)
                setCurrentLength(0)

            const timer = setTimeout(() => {
                
                if (currentLength + 1 <= targetText.length)
                    setCurrentText(prev => prev.concat(targetText.substring(currentLength, currentLength + 1)));
                
                if (currentLength < targetText.length - 1)
                    setCurrentLength(prev => prev + 1)
                else
                    setIsExpanding(false)
            }, 60);

            return () => clearTimeout(timer);
        }


    }, [currentText.length, targetText, children, isExpanding, currentText, currentLength])

    return (
        <MotiText
            style={{color: color}}
        >{start + currentText + end}</MotiText>
    )
}