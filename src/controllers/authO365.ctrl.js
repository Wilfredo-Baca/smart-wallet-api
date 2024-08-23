import axios from "axios";
import querystring from "querystring";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { generatePkceChallenge } from "../utils/security.js";
import { handleOAuthCallback } from "../services/user.svc.js";
import {
  CLIENT_ID as clientId,
  CLIENT_SECRET as clientSecret,
  TENANT_ID as tenantId,
  REDIRECT_URI as redirectUri,
  PKCE as pkceVerifier,
} from "../config.js";

// OAuth2 configuration
const authorizationUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`;
const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

const msalApp = new ConfidentialClientApplication({
  auth: {
    clientId: clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    clientSecret: clientSecret,
  },
});

export const loginO365 = async (req, res) => {
  const pkceChallenge = generatePkceChallenge(pkceVerifier);
  const authUrlParams = {
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    response_mode: "query",
    scope: "User.Read",
    code_challenge: pkceChallenge,
    code_challenge_method: "S256",
  };

  const authUrl = `${authorizationUrl}?${querystring.stringify(authUrlParams)}`;
  res.redirect(authUrl);
};

export const authCallbackO365 = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ detail: "Authorization code not found" });
  }

  const tokenData = {
    client_id: clientId,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
    code_verifier: pkceVerifier,
    client_secret: clientSecret,
  };

  try {
    const tokenResponse = await axios
      .post(tokenUrl, querystring.stringify(tokenData))
      .catch((error) => {
        throw new Error(error.response.data.error_description);
      });
    const tokenResponseData = tokenResponse.data;
    if (tokenResponseData.access_token) {
      const access_token_local = (await handleOAuthCallback({ local: false, token: tokenResponseData.access_token })).tokenLocal;
      res.redirect(
        `http://localhost:5173/metas?access_token=${access_token_local}`
      );
    } else {
      res.status(400).json({
        error: tokenResponseData.error,
        error_description: tokenResponseData.error_description,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
