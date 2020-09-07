const parseSearchString = str => {
	if (str.length < 1)
		return null;
	const arr = str.substring(1).split('&');
	const ret = {};
	arr.forEach(value => {
		if (value.split('=').length === 2)
			ret[value.split('=')[0]] = value.split('=')[1];
	});
	return ret;
}

module.exports = parseSearchString;
