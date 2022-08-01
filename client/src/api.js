const API_URL = "http://localhost:7000";

export const searchImages = async (searchValue, nextCursor) => {
  const params = new URLSearchParams();

  if (searchValue) {
    params.append(`expression`, searchValue);
  }

  if (nextCursor) {
    params.append("next_cursor", nextCursor);
  }

  try {
    const response = await fetch(`${API_URL}/search?${params}`);
    const responseJSON = await response.json();
    return responseJSON;
  } catch (err) {
    console.error(err);
  }
};

export const getFolders = async () => {
  try {
    const response = await fetch(`${API_URL}/folders`);
    const responseJSON = await response.json();
    return responseJSON;
  } catch (err) {
    console.error(err);
  }
};
