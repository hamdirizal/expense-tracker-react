export const getStoredAccessToken = () => {
  return localStorage.getItem("access_token") || "";
};

export const purgeStoredAccessToken = () => {
  localStorage.removeItem("access_token");
};

export const setStoredAccessToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const logout = () => {
  purgeStoredAccessToken();
  window.location.reload();
};

export const setStoredDefaultBookId = (book_id: number) => {
  localStorage.setItem("default_book_id", book_id.toString());
}

export const getStoredDefaultBookId = () => {
  return parseInt(localStorage.getItem("default_book_id") || "0");
}