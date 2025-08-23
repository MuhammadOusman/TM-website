// exports.handler = async function(event, context) {
//   try {
//     const response = await fetch("https://www.reddit.com/user/talhamusharraf/submitted.json?raw_json=1");
//     const data = await response.json();
//     return {
//       statusCode: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(data)
//     };
//   } catch (err) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: "Failed to fetch Reddit blogs" })
//     };
//   }
// };


// netlify/functions/reddit-blogs.js

export async function handler(event, context) {
  try {
    const response = await fetch(
      "https://www.reddit.com/user/talhamusharraf/submitted.json?raw_json=1",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
      }
    );

    if (!response.ok) {
      console.error(`Reddit API error: ${response.status} ${response.statusText}`);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `Reddit API error: ${response.status} ${response.statusText}` }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // allow CORS
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("Fetch failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch Reddit blogs", details: err.message }),
    };
  }
}
