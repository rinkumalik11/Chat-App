var generateMessage = (from,txt) => {
	return {
		from,
		txt,
		createdAt : new Date().getTime()
	};
};

module.exports = {generateMessage}; 