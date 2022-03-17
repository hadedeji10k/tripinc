export type attraction = {
    id: Number,
    title?: String,
    description: String,
    image: String,
    price: Number,
    location?: String,
    createdAt?: Date,
    updatedAt?: Date,
    location_marker?: {
        lat: Number,
        lng: Number
    } | any,
    cancellationPolicy?: String,
    reviews?: {
        id: Number,
        name: String,
        rating: Number,
        review: String,
        createdAt?: Date,
        updatedAt?: Date,
    }[],
    category: String
}

type review = {
    id: Number,
    name: String,
    rating: Number,
    review: String,
    createdAt?: Date,
    updatedAt?: Date,
}