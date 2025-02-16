export class Product {
    constructor(public sku:string,
        public name:string,
        public description:string,
        public imageUrl:string,
        public unitPrice:string,
        public unitsInStock:number,
        public active:boolean,
        public dateCreated:Date,
        public lastUpdated:Date
    ){

    }
}
