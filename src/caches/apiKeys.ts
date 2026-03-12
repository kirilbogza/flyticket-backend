
// API_KEY: PARTNER
export let partnersByApiKey: any = {
    "123-123-123": {
        name: ""
    },
    "32133-123-21321": {

    }
}

export async function fetchApiKeys() {
    // Hämta alla api keys från databasen


}

export function getPartnerByApiKey(key: string): Partner | null  {
    return partnersByApiKey[key] || null
}

