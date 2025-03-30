import { readFileSync, writeFileSync } from "fs";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";

const credentialPath = `${process.cwd()}/src/config/google/oauth-credentials.json`;
const tokenPath = `${process.cwd()}/src/config/google/tokens.json`;

const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export const createOAuthClient = async () => {
  try {
    const credentialsFile = readFileSync(credentialPath, "utf-8");
    const credentials = JSON.parse(credentialsFile);
    const { client_id, client_secret, redirect_uris } = credentials.web;

    const OAuth2Client = new google.auth.OAuth2({
      clientId: client_id,
      clientSecret: client_secret,
      redirectUri: redirect_uris[0],
    });
    return OAuth2Client;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const generateClientAuthUrl = async (oauth: OAuth2Client) => {
  try {
    const url = oauth.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    return url;
  } catch (error) {
    console.log("error while generating oauth url", error);
    throw error;
  }
};

export const verifyClientCode = async (oauth: OAuth2Client, code: string) => {
  try {
    const tokens = await oauth.getToken(code);
    oauth.setCredentials(tokens.tokens);
    writeFileSync(tokenPath, JSON.stringify(tokens.tokens));
    console.log("Token stored to:", tokenPath);
    console.log("response from google", tokens);
    return tokens.tokens;
  } catch (error) {
    console.log("error while verifying client code", error);
    throw error;
  }
};

export const getGoogleUser = async ({
  accessToken,
}: {
  accessToken: string | null | undefined;
}) => {
  const googleUser = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
  );
  console.log(Object.keys(googleUser.data), "google user data");
  return googleUser.data;
};
