// @ts-check

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function defineNextConfig(config) {
	return config
}

export default defineNextConfig({
	reactStrictMode: true,
	swcMinify: true
})