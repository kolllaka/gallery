class Gallery {
	constructor(selector, options) {
		this.$el = document.getElementById(selector);
		this.options = options

		this.#render()
		this.#setup()
	}

	#render() {
		if (this.options.isAdmin) {
			this.$el.innerHTML = addGalleryTemplate() + getGalleriesTemplate(this.options)
		} else {
			this.$el.innerHTML = getGalleriesTemplate(this.options)
		}
	}

	#setup() { }

	#update() {
		this.#render()
	}

	add(newGallery) {
		this.options.galleries.push(newGallery)
		this.#update()
	}

	delete(uid) {
		this.options.galleries = this.options.galleries.filter(gallery => gallery.uid != uid)
		this.#update()
	}

	update(newGallery) {
		this.options.galleries = this.options.galleries.map(gallery => {
			if (gallery.uid == newGallery.uid) {
				gallery = newGallery

				return
			}
		})
	}
}

