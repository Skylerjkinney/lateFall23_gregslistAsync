import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { api } from "./AxiosService.js"

class HousesService {
    async getHouses() {
        const response = await fetch('https://bcw-sandbox.herokuapp.com/api/houses', {})// what that curly bracket doin?
        const axiosResponse = await api.get('api/houses')
        console.log('Houses beaming in', response, axiosResponse)
        const body = await response.json()
        const newHouses = body.map(houseData => new House(houseData))
        console.log('building new homes', newHouses)
        AppState.houses = newHouses
    }
    async createHouse(formData) {
        const response = await api.post('api/houses', formData)
        console.log('api response', response)
        const newHouse = new House(response.data)
        console.log('new house! hooray!', newHouse)
        AppState.houses.push(newHouse)
    }
    async removeHouse(houseId) {
        const response = await api.delete(`api/houses/${houseId}`)
        console.log('this is the one to go!', response)
        const indexToRemove = AppState.houses.findIndex(house => house.id == houseId)
        AppState.houses.splice(indexToRemove, 1)
    }

}

export const housesService = new HousesService()