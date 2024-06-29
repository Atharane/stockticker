import { NseIndia } from "stock-nse-india";
import { sendWhatsAppMessage } from "./utils/twilio";

const nseIndia = new NseIndia();

const targets = [
  "AFFLE",
  "ISMTLTD",
  "RADHIKAJWE",
  "ANGELONE",
  "IEX",
  "VAKRANGEE",
  "ISMTLTD",
  "BAJAJCON",
  "MTARTECH",
  "IREDA",
  "PATELENG",
  "WELSPUNLIV",
  "SUZLON",
  "LICHSGFIN",
  "AAVAS",
  "MIDHANI",
  "URJA",
  "YESBANK",
  "SIGMA",
  "BORORENEW",
  "PRINCEPIPE",
  "HDFCBANK",
];

const getEquityDetails = async (symbol: string) => {
  const details = await nseIndia.getEquityDetails(symbol);
  const name = details.info.companyName;
  const open = details.priceInfo.open;
  const close = details.priceInfo.close;
  const high = details.priceInfo.intraDayHighLow.max;
  const low = details.priceInfo.intraDayHighLow.min;

  return `------ ${symbol} ------\nOpen: ${open}\nClose: ${close}\nHigh: ${high}\nLow: ${low}\n\n`;
};

const chunken = (array: string[], chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const main = async () => {
  const chunks = chunken(targets, 10);

  for (const chunk of chunks) {
    const detailsPromises = chunk.map((symbol) => getEquityDetails(symbol));
    const allDetails = await Promise.all(detailsPromises);
    const messageContent = allDetails.join("");

    await sendWhatsAppMessage(messageContent);
  }
};

main();
