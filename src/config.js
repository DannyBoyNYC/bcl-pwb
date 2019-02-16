const dev = {
	server: {
		url: "dev_url"
	}
};

const prod = {
	server: {
		url: "prod_url"
	}
};

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
	//Add any default config here
	...config
}