const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const { KeyClient } = require("@azure/keyvault-keys");

const getSecret = async (secretName, keyVaultName) => {

    if (!secretName || !keyVaultName) {
        throw Error("getSecret: Required params missing")
    }

    //pulls Azure clientID, Secret and Tenant ID from environment variables
    const credential = new DefaultAzureCredential();

    // Build the URL to reach your key vault
    const url = `https://${keyVaultName}.vault.azure.net`;

    try {
        // Create client to connect to service
        const client = new SecretClient(url, credential);

        // Get secret Obj
        const latestSecret = await client.getSecret(secretName);

        // Return value
        return latestSecret.value;
    } catch (ex) {
        console.log(ex)
        throw ex;
    }
}

const getKey = async (keyName, keyVaultName) => {

    if (!keyName || !keyVaultName) {

        throw Error("getKey: Required params missing")
    }

    const credential = new DefaultAzureCredential();
    const url = `https://${keyVaultName}.vault.azure.net`;

    try {
        // Create client to connect to service
        const client = new KeyClient(url, credential);

        // Get secret Obj
        const latestKey = await client.getKey(keyName);
        // Return value
        return latestKey;
    } catch (ex) {
        console.log(ex)
        throw ex;
    }
}


module.exports = {
    getSecret,
    getKey
}