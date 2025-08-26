

export async function GET() {
    const response = await fetch(import.meta.env.VITE_URL_SERVER + ``)
    return await response.json()
}