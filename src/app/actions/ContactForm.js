import { client, tablesDB } from "@/utils/appwrite";
import { ID } from "appwrite";
import { APPWRITE_DATABASE_ID, APPWRITE_TABLE_ID } from "@/utils/env";

const itsTablesDB = tablesDB;

export async function submitContactForm(formData) {
  const name = formData.get("name");
  const emailAddress = formData.get("emailAddress");
  const phoneNumber = formData.get("phoneNumber");
  const subject = formData.get("subject");
  const message = formData.get("message");
  const submissionDate = new Date().toISOString();

  const promise = itsTablesDB.createRow({
    databaseId: APPWRITE_DATABASE_ID,
    tableId: APPWRITE_TABLE_ID,
    rowId: ID.unique(),
    data: {
      name,
      emailAddress,
      phoneNumber,
      subject,
      message,
      submissionDate,
    },
  });

  try {
    const response = await promise;
    console.log(response);
    return { success: true, message: "Form submitted successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Form submission failed." };
  }
}
