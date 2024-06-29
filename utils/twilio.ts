export const sendWhatsAppMessage = async (message: string) => {
  const url = Bun.env.TWILIO_URL as string;
  const username = Bun.env.TWILIO_USERNAME;
  const password = Bun.env.TWILIO_PASSWORD;
  const auth = Buffer.from(`${username}:${password}`).toString("base64");

  const params = new URLSearchParams();
  params.append("To", `whatsapp:${Bun.env.TO_MOBILE_NUMBER}`);
  params.append("From", `whatsapp:${Bun.env.FROM_MOBILE_NUMBER}`);
  params.append("Body", message);

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("ERROR/SENDING_WHATSAPP_MESSAGE:", error));
};
