class CvrMagic {
    constructor(formSelector, inputSelector) {
        this.inputs = {
            cvr: document.querySelector(`${formSelector} ${inputSelector}`)
        }
        this.discoverInputs(formId)

        // Listen for changes to the cvr input value.
        this.inputs.cvr.addEventListener("change", (event) => {
            // Validate new value before fetching data.
            let number = event.target.value.trim()
            if (number.length != 8) return

            fetchCvrData(number)
                .then((data) => {
                    fillForm(data)
                })
        })
    }

    fetchCvrData(cvr) {
        return fetch(`https://cvrapi.dk/api?search=${cvr}&country=dk`)
            .then((res) => JSON.parse(res))
            .catch((error) => {
                console.log(`Couldn't fetch company data from CVR: ${error}`)
            })
    }

    discoverInputs(formSelector) {
        this.inputs.company = document.querySelector(`${formSelector} input[name="company"]`)
        this.inputs.address = document.querySelector(`${formSelector} input[name="address"]`)
        this.inputs.zipCode = document.querySelector(`${formSelector} input[name="zipcode"]`)
        this.inputs.city = document.querySelector(`${formSelector} input[name="city"]`)
    }

    fillForm(companyData) {
        this.inputs.company.value = companyData.name
        this.inputs.address.value = companyData.address
        this.inputs.zipCode.value = companyData.zipcode
        this.inputs.city.value = companyData.city
    }
}
