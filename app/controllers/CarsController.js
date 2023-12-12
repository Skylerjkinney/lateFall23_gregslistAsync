import { AppState } from "../AppState.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawCars() {
  const cars = AppState.cars
  let content = ''
  cars.forEach(car => content += car.CarCard)
  setHTML('cars-list', content) // 🧪 did the static cars in the appstate draw to the page?
}

function _showCreateCarForm() {
  if (AppState.user) { //🧪 if verifies there is a user logged in, for anytime you want to show the form
    let form = document.getElementById('create-car-form')
    form.classList.remove('d-none')
  }
}

export class CarsController {
  constructor() {
    console.log('🚗🎮'); //🧪
    // _drawCars() only needed for the initial draw of static data in the appstate for testing
    AppState.on('cars', _drawCars)// 🧪 replaces the need for invoking draw ourselves
    AppState.on('user', _showCreateCarForm) //🧪 listening to the user, is waiting for the user to log in, THEN do the function
    AppState.on('account', _drawCars) // if you don't re-draw the cars when the account arrives, then you will never see your delete buttons
    _showCreateCarForm() //🧪 this is so when the user, starts on a page that isn't the car page, it still loads in when you navigate to it
    this.getCars()
    // NOTE the listener draws the form when you start on the cars page, the call in the constructor draws the form when you navigate to the cars view from another view 
  }


  async getCars() {
    try {
      await carsService.getCars() // added try catch later, it's just the best practice when making async requests
    } catch (error) {
      console.error(error) // log the error back
      Pop.toast(error.message)
    }
  }

  async createCar() {
    try {
      event.preventDefault()
      console.log('📃🚗'); //🧪 create your form and test the prevent Default
      const form = event.target // the target is whatever invoked this function 
      const formData = getFormData(form)
      console.log('🚗💾', formData); //🧪 are all the properties where you expected them to be
      await carsService.createCar(formData)
      form.reset()
    } catch (error) { // error in the catch is the error that occurred while trying to process the 'try'
      console.error(error) // log the error back
      Pop.toast(error.message)
    }
  }

  async removeCar(carId) {
    try {
      console.log('🔥🚗', carId); // 🧪 making sure the id gets passed
      await carsService.removeCar(carId)
      Pop.toast('Deleted Car', 'success')
    } catch (error) {
      console.error(error) // log the error back
      Pop.toast(error.message)
    }
  }
}