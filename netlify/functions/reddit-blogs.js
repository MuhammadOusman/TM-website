export async function handler(event, context) {
  try {
    const response = await fetch(
      "https://www.reddit.com/user/talhamusharraf/submitted.json?raw_json=1",
      {
        headers: {
          "User-Agent": "node:my-reddit-app:1.0.0 (by /u/talhamusharraf)",
        },
      }
    );

    if (!response.ok) {
      console.error(`Reddit API error: ${response.status} ${response.statusText}`);
      console.error("Response headers:", response.headers.raw());
      return {
        statusCode: response.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: `Reddit API error: ${response.status} ${response.statusText}`,
        }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("Fetch failed:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Failed to fetch Reddit blogs", details: err.message }),
    };
  }
}