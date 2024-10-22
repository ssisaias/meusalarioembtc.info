import Database from "better-sqlite3";
import * as cheerio from "cheerio";

const dbEnv = process.env.DATABASE || ":memory:";

const db = new Database(dbEnv);

db.pragma("journal_mode = WAL");

db.exec(`CREATE TABLE IF NOT EXISTS scraped_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    creationDate TEXT
)`);

interface ScrapedData {
  id: number;
  content: string;
  creationDate: string;
}

interface ConversionRate {
  source: string;
  rate: number;
  lastUpdateStr: string;
}

export function insertScrapedData(content: string): void {
  const stmt = db.prepare(
    "INSERT INTO scraped_data (content, creationDate) VALUES (?, ?)"
  );
  stmt.run(content, new Date().toISOString());
  console.log("Scraped data saved...");
}

export async function getScrapedData(): Promise<ConversionRate | null> {
  const stmt = db.prepare(
    "SELECT * FROM scraped_data ORDER BY creationDate DESC"
  );
  const allResult = stmt.all() as ScrapedData[];

  let latest: ScrapedData;
  if (!allResult.length) {
    latest = {
      content: await fetchLatest(),
      creationDate: new Date().toISOString(),
      id: 0,
    };
  } else {
    latest = allResult[0];
  }

  // if its been more than 6 hours
  if (
    latest.creationDate <
      new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() ||
    latest.content === ""
  ) {
    console.log("Conversion rate is stale");
    latest = {
      content: await fetchLatest(),
      creationDate: new Date().toISOString(),
      id: latest.id + 1,
    };
  }
  return {
    source:
      "https://www.xe.com/currencyconverter/convert/?Amount=1&From=BRL&To=BTC",
    rate: Number(latest.content.split(" ")[3].replace("=", "")),
    lastUpdateStr: latest.content.split(" — ")[1].split("1.00")[0],
  };
}

export async function fetchLatest(): Promise<string> {
  const webPage = await fetch(
    "https://www.xe.com/currencyconverter/convert/?Amount=1&From=BRL&To=BTC"
  );
  const pageContent = await webPage.text();
  const $ = cheerio.load(pageContent);
  const content = $('[data-testid="conversion"]').text();
  insertScrapedData(content);
  return content;
}
