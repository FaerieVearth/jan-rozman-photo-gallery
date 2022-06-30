const API_URL = process.env.REACT_APP_API_URL;

export const searchImages = async (searchValue, nextCursor) => {
    const params = new URLSearchParams();

    if (searchValue) {
        params.append(`expression`, searchValue);
    }

    if(nextCursor){
        params.append('next_cursor', nextCursor);
    }

    const response = await fetch(`${API_URL}/search?${params}`);
    const responseJSON = await response.json();

    return responseJSON;
}

export const getFolders = async () => {

    const response = await fetch(`${API_URL}/folders`);
    const responseJSON = await response.json();

    return responseJSON;
}