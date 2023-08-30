export const getStoredAccessToken = () => {
  return localStorage.getItem("access_token") || "";
};

export const purgeStoredAccessToken = () => {
  localStorage.removeItem("access_token");
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("access_token", token);
};
