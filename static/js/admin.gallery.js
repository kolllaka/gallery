let url = "./static/db/admin1.json"
let classGalleries
let i = 1
toServer(url, "GET").then((galleries) => {
	document.querySelector(".gallery__title").innerHTML = `${galleries.name}`
	classGalleries = new Gallery("admin", {
		isAdmin: galleries.isAdmin,
		galleries: galleries.img_url,
	})
})

const getGalleriesTemplate = (options) => {
	return options.galleries.map((gallery) => {
		let template = ``

		if (options.isAdmin) {
			template = `
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
				<img src="${gallery.url}" alt="">
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
				<span>add new picture</span>
			</div>
		</a>
	`
}

document.addEventListener("click", (e) => {
	// preview images
	if (e.target.closest(".gallery__img")) {
		e.preventDefault()
		document.getElementById('fullimg').classList.add("show")
		document.body.classList.add("locked")
		document.documentElement.classList.add("locked")
		console.log("image");
		const src = e.target.closest(".gallery__img").querySelector("img").src

		document.querySelector('.poppup__img').querySelector('img').src = src
	}

	// close poppup
	if (e.target.classList.contains("poppup")) {
		e.preventDefault()
		document.getElementById('fullimg').classList.remove("show")
		document.body.classList.remove("locked")
		document.documentElement.classList.remove("locked")
	}

	// delete image
	if (e.target.closest(".gallery__delete")) {
		const uid = e.target.closest(".gallery__item").dataset.uid

		// ! send to server
		// url = "http://localhost:8080/admin/{uid}"
		toServer(url, "DELETE", { uid: uid })
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

		const addfilesInput = document.querySelector('.addfiles__input')
		if (addfilesInput.files.length < 1) {
			document.getElementById("poppup__error").innerText = "please select file(s)"

			return
		}

		item = {
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


addEventListener("scroll", scrollListener)
function scrollListener() {
	const height = document.body.offsetHeight
	const screenHeight = window.innerHeight
	const scrolled = window.scrollY
	const threshold = height - 50
	const position = scrolled + screenHeight

	if (position >= threshold) {
		console.log("load more");
		loadMorePhotos()
	}
}
const loadMorePhotos = () => {
	i += 1
	let url = `./static/db/admin${i}.json`
	toServer(url, "GET")
		.then((galleries) => {
			if (galleries["img_url"].length > 0) {
				console.log("length", galleries["img_url"].length);
				galleries["img_url"].forEach((gallery) => {
					classGalleries.add(gallery)
				})

				return
			}

			console.log("delete listener");
			removeEventListener("scroll", scrollListener)
		})
		.catch((err) => {
			// console.log(err);
			console.log("delete listener");
			removeEventListener("scroll", scrollListener)
		})
}

