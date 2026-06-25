const API_URL = "http://localhost:3001";

export async function getPlaces() {
  try {
    const response = await fetch(`${API_URL}/places`);

    if (!response.ok) {
      throw new Error("Failed to fetch places");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPlaceById(id) {
  try {
    const response = await fetch(
      `${API_URL}/places/${id}`
    );

    if (!response.ok) {
      throw new Error("Place not found");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}