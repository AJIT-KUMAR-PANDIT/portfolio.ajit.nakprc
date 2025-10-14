import { Client, Account, ID, TablesDB } from "appwrite";

export const client = new Client();

import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "@/utils/env";

client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const itsID = new ID(client);
