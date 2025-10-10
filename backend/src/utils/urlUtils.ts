
import { isUrl } from 'check-valid-url';

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
    
    // Use the proper URL validation library
    if (isUrl(normalizedUrl)) {
        return normalizedUrl;
    }
    
    return null;
}
