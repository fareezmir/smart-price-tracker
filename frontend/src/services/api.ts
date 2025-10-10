const API_BASE_URL = 'http://localhost:8000/api';

export const verifyLink = async (url: string) => {
    const response = await fetch(`${API_BASE_URL}/verify-link?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error)
    }

    return response.json();
}
