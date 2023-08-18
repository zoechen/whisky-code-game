import { GoogleSpreadsheet } from 'google-spreadsheet';
import { OAuth2Client } from 'google-auth-library';
import oauthData from './credentials.json'
const oauthClient = new OAuth2Client({
  clientId: oauthData.client_id,
  clientSecret: oauthData.client_secret,
});

// Pre-configure the client with credentials you have stored in e.g. your database
// NOTE - `refresh_token` is required, `access_token` and `expiry_date` are optional
// (the refresh token is used to generate a missing/expired access token)
const { accessToken, refreshToken, expiryDate } = await fetchUserGoogleCredsFromDatabase();
oauthClient.credentials.access_token = accessToken;
oauthClient.credentials.refresh_token = refreshToken;
oauthClient.credentials.expiry_date = expiryDate; // Unix epoch milliseconds

// Listen in whenever a new access token is obtained, as you might want to store the new token in your database
// Note that the refresh_token never changes (unless it's revoked, in which case your end-user will
// need to go through the full authentication flow again), so storing the new access_token is optional
oauthClient.on('tokens', (credentials) => {
  console.log(credentials.access_token);
  console.log(credentials.scope);
  console.log(credentials.expiry_date);
  console.log(credentials.token_type); // will always be 'Bearer'
})

const doc = new GoogleSpreadsheet('1dU1qHUtHeM3cK64Au78Tvqc9ekuFcvexa1YNQdxeuZ0', oauthClient);

export async function listMajors() {
	await doc.loadInfo();
  const sheet = doc.sheetsById[0];
  console.log(sheet.title);
  const rows = await sheet.getRows();
  const output = []
  for (const row of rows) {
    if (row._rawData.length) {
      output.push(row)
    }
  }
  return output;
}

export async function signUpPlayer(name) {
  console.log(name)
	await doc.loadInfo();
  const sheet2 = await doc.addSheet({ headerValues: ['name', 'email'] });
  await sheet2.updateProperties({ title: 'PlayerData' });
  console.log(sheet2.title);
  const larryRow = await sheet2.addRow({ name: name});
  console.log(larryRow);
}