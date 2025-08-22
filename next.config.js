// /**
//  * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
//  * for Docker builds.
//  */
// import "./src/env.js";

// /** @type {import("next").NextConfig} */
// const config = {
//     images: {
//         domains: ['encrypted-tbn0.gstatic.com', "encrypted-tbn1.gstatic.com",'upload.wikimedia.org', 'www.himalayawellness.in', 'localhost', '192.168.1.12', '192.168.29.194', '82.112.237.86', 'confident-trap-locale-flush.trycloudflare.com', "ep-americas-intermediate-picks.trycloudflare.com","tiimg.tistatic.com","healthynz.in"],
//     },
// };

// export default config;


// =============================================================================================================
// when exporting or serving the file from single soure whitelist the source domain into the config
// and now for the development allow all sort of images from all sort of sources
/** @type {import("next").NextConfig} */
const config = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**", // allow all https domains
        },
        {
          protocol: "http",
          hostname: "**", // (optional) allow all http domains too
        },
      ],
    },
  };
  
  export default config;
  