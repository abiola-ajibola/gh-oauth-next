require("dotenv").config();

const tokenUrl: string = "https://github.com/login/oauth/access_token";
const userDetailsUrl: string = "https://api.github.com/user";

export default async function getUserData(query) {
  try {
    // Obtain access token
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        code: query.code,
        state: query.state,
      }),
    });
    const token = await response.json();

    // Use obtained token to get user data
    const tokenResponse = await fetch(userDetailsUrl, {
      method: "GET",
      headers: {
        authorization: "token " + token.access_token,
        accept: "application/json",
      },
    });

    const userData = await tokenResponse.json();


    // get an array of public repositories
    const reposResponse = await fetch(userData.repos_url);
    const reposData = await reposResponse.json();
    const reposCount = reposData;

    // Return required data
    return {
      name: userData.name,
      image: userData.avatar_url,
      bio: userData.bio,
      public_repos: reposCount.length,
    };
  } catch (e) {
    // If error occurs, log error and redirect to homepage
    console.log(e);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
