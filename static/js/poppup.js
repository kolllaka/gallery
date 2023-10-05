const constFileExtension = ["PNG", "JPG", "JPEG", "SVG"]
const defaultAddfilesText = 'click to uploads files'
const poppupError = document.getElementById("poppup__error")
const addfiles = document.querySelector(".addfiles")
if (addfiles) {
	const addfilesInput = addfiles.querySelector('.addfiles__input')
	addfilesInput.addEventListener("change", () => {
		const lenghtFiles = addfilesInput.files.length
		console.log(lenghtFiles);
		if (lenghtFiles > 0) {
			for (let i = 0; i < lenghtFiles; i++) {
				const fileExtension = addfilesInput.files[i].name.split(".").splice(-1, 1)[0].toUpperCase()

				if (!constFileExtension.includes(fileExtension)) {
					addfilesInput.value = ""
					addfiles.querySelector('.addfiles__text').textContent = defaultAddfilesText
					poppupError.textContent = `the file extension should be: ${constFileExtension.join(", ")}`

					return
				}
			}

			poppupError.textContent = ""
			addfiles.querySelector('.addfiles__text').textContent = `selected ${addfilesInput.files.length} file(s)`
		} else {
			poppupError.textContent = ""
			addfiles.querySelector('.addfiles__text').textContent = defaultAddfilesText
		}
	})
}