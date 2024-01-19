export const postNewsletterSignup = async (email: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/newsletter-signup`,
      {
        method: "POST", // Specify the method to POST
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({ email }), // Convert the email object to a JSON string
      },
    );

    if (!response.ok) {
      console.log("Newsletter signup response", response);
      throw new Error("Network response was not ok");
    }

    const json = await response.json();
    console.log("Newsletter signup response", json);
    return json;
  } catch (error) {
    console.error(
      `There was a problem signing up ${email} for the newsletter: `,
      error,
    );
    throw error;
  }
};
