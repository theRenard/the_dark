declare const process: {
	env: {
		NODE_ENV: string
	}
}

export default process.env.NODE_ENV === 'development';