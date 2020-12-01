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
