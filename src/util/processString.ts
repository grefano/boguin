export function processInputUsername(val: string) {
    const newval = val.toLowerCase().replace(/[^a-z]/g, '')
    return newval
}