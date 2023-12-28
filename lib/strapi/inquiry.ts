interface InquiryData {
  contactData: {
    email: string;
    phone?: string;
    name?: string;
    preferences: {
      receivesNewsletter: boolean;
      receivesSalesEmails: boolean;
    };
  };
  inquiryData: {
    artworks: number[];
    message: string;
    source: string;
    inquiryCategory: string;
  };
}

/**
 * Sends an inquiry submission to a specified URL.
 *
 * @param body The payload for the POST request, containing inquiry data.
 * @returns A Promise that resolves to the response data.
 */
export async function postInquiry(body: InquiryData): Promise<any> {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/inquiries/website-inquiry`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting inquiry:", error);
    throw error; // Re-throw the error for further handling if necessary
  }
}
