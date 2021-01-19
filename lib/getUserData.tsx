require("dotenv").config();

const tokenUrl: string = "https://github.com/login/oauth/access_token";
const userDetailsUrl: string = "https://api.github.com/user";

export default async function getUserData(query) {
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

  const tokenResponse = await fetch(userDetailsUrl, {
    method: "GET",
    headers: {
      authorization: "token " + token.access_token,
      accept: "application/json",
    },
  });
    
  const userData = await tokenResponse.json();

  console.log(userData.repos_url);
  const reposResponse = await fetch(userData.repos_url);
  const resposData = await reposResponse.json()
  const reposCount = resposData
  
  return {
    name: userData.name,
    image: userData.avatar_url,
    bio: userData.bio,
    public_repos: reposCount.length,
  };
}
