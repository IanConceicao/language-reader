const BACKEND_URL = process.env.BACKEND_PATH || "http://localhost:8000";

export const translate = async (
  inputLanguage: string,
  outputLanguage: string,
  text: string
): Promise<string> => {
  const url = BACKEND_URL + "/translateText/";
  const body_to_send = {
    inputLanguage: inputLanguage,
    outputLanguage: outputLanguage,
    text: text,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body_to_send),
    });
    if (response.ok) {
      const body = await response.json();
      return body.data;
    } else {
      console.error((await response.json()).message);
    }
  } catch (e: any) {
    console.error(e.message);
  }
  return "";
};
