export const dataAsBase64 = <T>(value: T) => {
  const jString = btoa(JSON.stringify(value));
  return jString;
};

export const base64AsData = <T>(value: string) => {
  if (value) {
    const jsonDataString = atob(value);
    const jsonData = JSON.parse(jsonDataString);
    return jsonData as T;
  }

  return null;
};
