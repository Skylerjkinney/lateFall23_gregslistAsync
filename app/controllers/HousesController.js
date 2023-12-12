import { AppState } from "../AppState.js"
import { housesService } from "../services/HousesService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"


function _drawHouses() {
    const houses = AppState.houses
    let content = ''
    houses.forEach(house => content += house.HouseCard)
    setHTML('house-list', content)
    // console.log(content)
}
function _showCreateHouseForm() {
    if (AppState.user) {
        let form = document.getElementById('create-house-button')
        form.classList.remove('d-none')
    }
}

export class HousesController {
    constructor() {
        console.log('House Controller Loaded')
        AppState.on('houses', _drawHouses)
        _showCreateHouseForm()
        this.getHouses()

    }
    async getHouses() {
        try {
            await housesService.getHouses()
        } catch (error) {
            console.error(error)
            Pop.toast(error.message)
        }
    }
    async createHouse() {
        try {
            event.preventDefault()
            console.log('Creating home in controller')
            const form = event.target
            const formData = getFormData(form)
            console.log('getting form data', formData)
            await housesService.createHouse(formData)
            form.reset()

        }
        catch (error) {
            console.error(error)
            Pop.toast(error.message)
        }
    }
    async removeHouse(houseId) {
        try {
            console.log('deleting this one', houseId)
            await housesService.removeHouse(houseId)
        }
        catch (error) {
            console.error(error)
            Pop.toast(error.message)
        }
    }
}
