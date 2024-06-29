import { NseIndia } from "stock-nse-india";

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

targets.forEach((symbol) => {
  nseIndia.getEquityDetails(symbol).then((details) => {
    console.log(`\n\n------------ ${symbol} -----------`);
    const name = details.info.companyName;
    const open = details.priceInfo.open;
    const close = details.priceInfo.close;
    const high = details.priceInfo.intraDayHighLow.max;
    const low = details.priceInfo.intraDayHighLow.min;

    console.log("Name: ", name);
    console.log("Open: ", open);
    console.log("Close: ", close);
    console.log("High: ", high);
    console.log("Low: ", low);
  });
});
