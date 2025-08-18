/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    images: {
        domains: ['encrypted-tbn0.gstatic.com', 'upload.wikimedia.org', 'www.himalayawellness.in', 'localhost', '192.168.1.12', '192.168.29.194', '82.112.237.86', 'confident-trap-locale-flush.trycloudflare.com', "ep-americas-intermediate-picks.trycloudflare.com"],
    },
};

export default config;
