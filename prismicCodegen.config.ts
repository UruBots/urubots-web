import type { Config } from "prismic-ts-codegen";

const config: Config = {
  output: "./prismicio-types.d.ts",
  repositoryName: "urubots",
  models: [
    "./customtypes/**/index.json",
    "./src/slices/**/model.json",
  ],
};

export default config;
