const BASE_URL = 'https://dog.ceo/api';

export const getAllBreeds = async () => {
  const response = await fetch(`${BASE_URL}/breeds/list/all`);
  if (!response.ok) throw new Error('Failed to fetch breeds');
  const data = await response.json();
  return data.message;
};

export const getRandomDog = async () => {
  const response = await fetch(`${BASE_URL}/breeds/image/random`);
  if (!response.ok) throw new Error('Failed to fetch random dog');
  const data = await response.json();
  return data.message;
};

export const getImagesByBreed = async (breed, count = 12) => {
  const response = await fetch(`${BASE_URL}/breed/${breed}/images/random/${count}`);
  if (!response.ok) throw new Error(`Failed to fetch images for ${breed}`);
  const data = await response.json();
  return data.message;
};

export const getImagesBySubBreed = async (breed, subBreed, count = 12) => {
  const response = await fetch(`${BASE_URL}/breed/${breed}/${subBreed}/images/random/${count}`);
  if (!response.ok) throw new Error(`Failed to fetch images for ${breed}-${subBreed}`);
  const data = await response.json();
  return data.message;
};
