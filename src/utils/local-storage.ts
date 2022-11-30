export function addItemToLocalStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.log(`Unable to add item to local storage: ${error}`);
    throw error;
  }
}

export function getItemFromLocalStorage(key: string) {
  return localStorage.getItem(key);
}