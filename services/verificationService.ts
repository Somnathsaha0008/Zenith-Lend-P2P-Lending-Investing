import { GoogleGenAI } from "@google/genai";
import { VerificationData } from '../types';

// IMPORTANT: This is a simulation. In a real-world scenario, you would
// use official government-provided APIs for verification. Using an LLM for
// this purpose is for demonstration only and is not a secure or reliable
// method for actual KYC.

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function verifyUserDetails(data: VerificationData): Promise<{ success: boolean; message: string }> {
  try {
    const systemInstruction = `
      You are a mock Indian Government Identity Verification API. Your task is to validate user data based on standard Indian formats.
      You must respond ONLY with a JSON object. Do not include any other text or markdown formatting.

      Your validation rules are:
      1.  **name**: Must not be empty.
      2.  **phone**: Must be a plausible 10-digit phone number (ignoring country code, spaces, or symbols).
      3.  **dob**: Must be a valid date representing a person over 18 years old.
      4.  **monthlySalary**: Must be a plausible, positive number.
      5.  **aadhaarNumber**: Must be a 12-digit number. The provided input will be formatted with spaces (e.g., "xxxx xxxx xxxx").
      6.  **panNumber**: Must follow the format of 5 letters, 4 numbers, 1 letter (e.g., "ABCDE1234F").

      If all checks pass, return:
      { "status": "success", "message": "All details verified successfully." }

      If any check fails, return:
      { "status": "failure", "message": "The [FIELD_NAME] provided is invalid or does not match records." }
      Replace [FIELD_NAME] with the first field that failed validation (e.g., "PAN Number").
    `;

    const prompt = `Validate the following user data: ${JSON.stringify(data)}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
      }
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    if (result.status === 'success') {
      return { success: true, message: result.message };
    } else {
      return { success: false, message: result.message || 'Verification failed due to an unknown error.' };
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback for when API fails, to prevent user being permanently stuck
    return { success: false, message: 'Could not connect to verification service. Please try again later.' };
  }
}