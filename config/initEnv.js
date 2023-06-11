const mysql = require('mysql');
const { getSecret } = require('./keyvault');
require('dotenv').config();



//pulls connection parameter from .env file for local environment and application
//setting for ASE production.



async function putKeyVaultSecretInEnvVar() {

    //pulls secrets name for DB password and DB username from env variables
    const dbUserKey = process.env.KEY_VAULT_SECRET_NAME_DB_USER;
    const dbPassKey = process.env.KEY_VAULT_SECRET_NAME_DB_PASSWORD;

    const keyVaultName = process.env.KEY_VAULT_NAME;

    console.log({ dbUserKey, dbPassKey });
    console.log(keyVaultName);

    if (!dbUserKey || !dbPassKey || !keyVaultName) throw Error("getSecret: Required params missing");

    dbUser = await getSecret(dbUserKey, keyVaultName);
    dbPass = await getSecret(dbPassKey, keyVaultName);

    process.env.DB_USER = dbUser;
    process.env.DB_PASSWORD = dbPass;
}



async function getConnectionInfo() {

    //update env variables with results from key vault if env is not development
    if (process.env.NODE_ENV !== 'development') {
        try {
            await putKeyVaultSecretInEnvVar();
        } catch (err) {
            console.log(err);
        }

    }
}

module.exports = async function () {

    //update env variables with results from key vault if env is not development
    if (process.env.NODE_ENV !== 'development') {
        try {
            await putKeyVaultSecretInEnvVar();
        } catch (err) {
            console.log(err);
        }

    }
}


//create a connection object. We need to use .connect method on connect
//to establish connection with the database.
