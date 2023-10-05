const toServer = async (url, method, data) => {
	const resp = await fetch(url, {
		method: method,
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})

	return await resp.json()
}

const fileToServer = async (url, data) => {
	const resp = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "multipart/form-data"
		},
		body: data
	})

	return await resp.json()
}