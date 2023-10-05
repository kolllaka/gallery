let url = "./static/db/gallery.json"
let classGalleries
toServer(url, "GET").then((galleries) => {
	classGalleries = new Gallery("admin", {
		isAdmin: false,
		galleries: galleries,
	})
})

const getGalleriesTemplate = (options) => {
	return options.galleries.map((gallery) => {
		let template = `
		<div class="gallery__name">
			<span>${gallery.name}</span>
		</div>
		`

		if (options.isAdmin) {
			template = `
			<div class="gallery__name">
				<input class="gallery__input input" type="text" value="${gallery.name}">
				<div class="gallery__change btn">
					<span>change</span>
				</div>
			</div>
			<div class="gallery__btns">
				<div class="gallery__delete btn">
					<span>delete</span>
				</div>
			</div>
			`
		}

		return `
		<div data-uid="${gallery.uid}" class="gallery__item">
			<a href="${gallery.url}" class="gallery__img">
				<img src="${gallery.img_url[0].url}" alt="${gallery.name}">
			</a>
			${template}
		</div>
		`
	}).join("")
}

const addGalleryTemplate = () => {
	return `
		<a id="addGallery" class="gallery__item">
			<div class="gallery__add">
				<span></span>
			</div>
			<div class="gallery__name">
				<span>add new gallery</span>
			</div>
		</a>
	`
}

document.addEventListener("click", (e) => {
	// DELETE from the gallery
	if (e.target.closest(".gallery__delete")) {
		const uid = e.target.closest(".gallery__item").dataset.uid

		// ! send to server
		// url = "http://localhost:8080/admin"
		toServer(url, "DELETE", { uid: uid })
			.then((response) => {
				console.log(response);
				classGalleries.delete(uid)
			})
			.catch((error) => {
				console.log(error);
			})
	}

	// CHNAGE name of gallery
	if (e.target.closest(".gallery__change")) {
		const uid = e.target.closest(".gallery__item").dataset.uid
		const name = e.target.closest(".gallery__name").querySelector("input").value

		// ! send to server
		// url = "http://localhost:8080/admin"
		toServer(url, "PUT", { uid: uid, name: name })
			.then((response) => {
				console.log(response);
				classGalleries.delete(uid)
			})
			.catch((error) => {
				console.log(error);
			})
	}

	// open poppup
	if (e.target.closest("#addGallery")) {
		e.preventDefault()
		document.getElementById('add').classList.add("show")
		document.body.classList.add("locked")
		document.documentElement.classList.add("locked")
	}

	// close poppup
	if (e.target.classList.contains("poppup")) {
		e.preventDefault()
		document.getElementById('add').classList.remove("show")
		document.body.classList.remove("locked")
		document.documentElement.classList.remove("locked")
	}

	// add new gallery
	if (e.target.closest(".poppup__additem")) {
		e.preventDefault()
		document.getElementById("poppup__error").innerText = ""
		const name = document.querySelector(".poppup__input[name='name']").value
		if (name == "") {
			document.getElementById("poppup__error").innerText = "please enter a name"

			return
		}

		const addfilesInput = document.querySelector('.addfiles__input')
		if (addfilesInput.files.length < 1) {
			document.getElementById("poppup__error").innerText = "please select file(s)"

			return
		}

		item = {
			name: name,
			files: addfilesInput.files
		}

		// ! send to server
		// url = "http://localhost:8080/admin"
		toServer(url, "POST", item)
			.then((response) => {
				console.log(response);
				classGalleries.add(response)
			})
			.catch((error) => {
				console.log(error);
			})
		console.log(item);
	}

})