export default {
  async fetch(request) {
    const redditUrl = "https://www.reddit.com/user/talhamusharraf/submitted.json?raw_json=1";
    const response = await fetch(redditUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Referer": "https://www.reddit.com/",
        "Accept-Language": "en-US,en;q=0.9"
      }
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Reddit API returned " + response.status }), {
        status: response.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    return new Response(await response.body, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}