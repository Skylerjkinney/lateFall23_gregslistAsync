import { AppState } from "../AppState.js";


export class House {
    constructor(data) {
        this.id = data.id
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
        this.price = data.price
        this.levels = data.levels
        this.year = data.year
        this.imgUrl = data.imgUrl
        this.description = data.description
        this.creator = data.creator
        this.creatorId = data.creatorId
        this.createdAt = data.createdAt
        console.log('imported data being converted to our model', this)
    }
    get HouseCard(){
        return `
        <div class="col-4">
        <div class="card">
        <img src="${this.imgUrl}" class="img-fluid"/>
        <h3 class="text-center mt-1 text-success me-2 fw-bold">$$${this.price}$$</h3>
        <h4>Year: ${this.year}</h4>
        <h5>Floors: ${this.levels}</h5> 
        <p class="text-end justify-content-evenly">Bathrooms: ${this.bathrooms} Bedrooms: ${this.bedrooms}</p>
        <p>listed by <i>${this.creator.name}</i></p>
        ${this.DeleteButton} 
        </div>
        </div>
        `
    }
    get DeleteButton(){
        if(this.creatorId == AppState.account?.id){
            return `<button class = "btn btn-danger" onclick="app.HousesController.removeHouse('${this.id}'")</button>`
        }
        else{
            return``
        }
    }
}
    // this is the data model im using
    
    // bathrooms
    // :
    // 2
    // bedrooms
// :
// 3
// createdAt
// :
// "2023-05-11T21:41:07.979Z"
// creator
// :
// {_id: '63f7d6202d1cf882287f12e2', name: 'Charles Francis Xavier', picture: 'https://www.looper.com/img/gallery/professor-xs-entire-backstory-explained/intro-1587748942.jpg', id: '63f7d6202d1cf882287f12e2'}
// creatorId
// :
// "63f7d6202d1cf882287f12e2"
// description
// :
// "Super sick house"
// id
// :
// "645d60f381faf24223ae886b"
// imgUrl
// :
// "https://floorcentral.com/wp-content/uploads/2014/07/sick-house-syndrome.jpg"
// levels
// :
// 2
// price
// :
// 230000
// updatedAt
// :
// "2023-05-11T21:41:07.979Z"
// year
// :
// 2003
// __v
// :
// 0
// _id
// :
// "645d60f381faf24223ae886b"