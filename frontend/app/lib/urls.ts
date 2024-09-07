type currEnv = "development" | "production";

const currentEnvironment: currEnv = "development";

const baseURLs: Record<currEnv, string> = {
  development: "http://localhost:5000",
  production: "http://localhost:5000",
};

const urls = {
  development: {
    LOGIN: `${baseURLs[currentEnvironment]}/auth/login`,
    REGISTER: `${baseURLs[currentEnvironment]}/auth/register`,
    ADD_COMPONENT: `${baseURLs[currentEnvironment]}/component/add`,
    GET_ALL_COMP: `${baseURLs[currentEnvironment]}/component/all`,
  },
  production: {
    LOGIN: `${baseURLs[currentEnvironment]}/auth/login`,
    REGISTER: `${baseURLs[currentEnvironment]}/auth/register`,
    ADD_COMPONENT: `${baseURLs[currentEnvironment]}/component/add`,
    GET_ALL_COMP: `${baseURLs[currentEnvironment]}/component/all`,
  },
};

export const apiBook = urls[currentEnvironment];
