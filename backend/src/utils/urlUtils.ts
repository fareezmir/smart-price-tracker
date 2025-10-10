
export function normalizeUrl(url: string): string {
    if (!url.startsWith('http')) {
        return 'https://' + url;
    }
    return url;
}

export function validateUrl(url: unknown): string | null {
    if (!url || typeof url !== 'string') {
        return null;
    }
    
    const normalizedUrl = normalizeUrl(url);
    
    try {
        new URL(normalizedUrl);
        return normalizedUrl;
    } catch {
        return null;
    }
}
