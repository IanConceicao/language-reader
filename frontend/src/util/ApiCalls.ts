const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

interface TranslationPayload {
  data: string;
}

export const translate = async (
  inputLanguage: string,
  outputLanguage: string,
  text: string
): Promise<TranslationPayload> => {
  const url = BACKEND_URL + "/translate/";
  const body_to_send = {
    inputLanguage: inputLanguage,
    outputLanguage: outputLanguage,
    text: text,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body_to_send),
  });
  if (response.ok) {
    const body = await response.json();
    return body;
  } else {
    return { data: "Error getting translation from backend" };
  }
};
