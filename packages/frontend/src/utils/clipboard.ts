// Source: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript

export const copyInputValueToClipboard = (
    input: HTMLInputElement | HTMLTextAreaElement,
) => {
    input.focus()
    input.select()
    let success: boolean
    try {
        success = document.execCommand('copy')
    } catch {
        success = false
    }
    input.blur()
    return success
}

const createTemporaryTextarea = () => {
    const textarea = document.createElement('textarea')
    textarea.style.position = 'fixed'
    textarea.style.top = '0'
    textarea.style.left = '0'
    textarea.style.width = '2em'
    textarea.style.height = '2em'
    textarea.style.padding = '0'
    textarea.style.border = 'none'
    textarea.style.outline = 'none'
    textarea.style.boxShadow = 'none'
    textarea.style.background = 'transparent'
    return textarea
}

const copyTextToClipboardFallback = (text: string): boolean => {
    const textarea = createTemporaryTextarea()
    textarea.value = text
    document.body.appendChild(textarea)
    const success = copyInputValueToClipboard(textarea)
    document.body.removeChild(textarea)
    return success
}

export const copyTextToClipboard = async (text: string): Promise<boolean> => {
    // Note: The fallback must be executed first because it uses execCommand which is available only synchronously after an user event
    const fallbackSuccess = copyTextToClipboardFallback(text)
    if (
        !fallbackSuccess &&
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {
        try {
            await navigator.clipboard.writeText(text)
            return true
        } catch {
            return false
        }
    }
    return fallbackSuccess
}
