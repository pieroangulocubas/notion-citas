import { Client } from "@notionhq/client"
import "dotenv/config"

// Initializing a client
const notion = new Client({auth: process.env.NOTION_TOKEN,})


export async function insertUser(properties) {
  await notion.pages.create({
    parent: {
      database_id:process.env.DATABASE_ID,
    },
    properties
  })
}
