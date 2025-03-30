type currEnv = "development" | "production";

const currentEnvironment: currEnv = "development";

const baseURLs: Record<currEnv, string> = {
  development: "http://localhost:3000/api/v1",
  production: "http://localhost:3000/api/v1",
};

const urls = {
  development: {
    LOGIN: `${baseURLs[currentEnvironment]}/auth/login`,
    REGISTER: `${baseURLs[currentEnvironment]}/auth/register`,
    ADD_COMPONENT: `${baseURLs[currentEnvironment]}/component/add`,
    GET_ALL_COMP: `${baseURLs[currentEnvironment]}/component/all`,
    SEARCH_COMP: `${baseURLs[currentEnvironment]}/component/search`,
    LOGIN_wITH_GOOGLE: `${baseURLs[currentEnvironment]}/google/auth`,
  },
  production: {
    LOGIN: `${baseURLs[currentEnvironment]}/auth/login`,
    REGISTER: `${baseURLs[currentEnvironment]}/auth/register`,
    ADD_COMPONENT: `${baseURLs[currentEnvironment]}/component/add`,
    GET_ALL_COMP: `${baseURLs[currentEnvironment]}/component/all`,
    SEARCH_COMP: `${baseURLs[currentEnvironment]}/component/search`,
    LOGIN_wITH_GOOGLE: `${baseURLs[currentEnvironment]}/google/auth`,
  },
};

export const SERVER_URL = baseURLs[currentEnvironment];

export const apiBook = urls[currentEnvironment];
