export type FormattedUser = {
    id: number,
    gender: string,
    title: string,
    full_name: string,
    course: string,
    note: string,
    city: string,
    state: string,
    country: string,
    postcode: number,
    coordinates: {
        latitude: string,
        longitude: string
    },
    timezone: {
        offset: string,
        description: string
    },
    email: string,
    b_date: string,
    age: number,
    phone: string,
    picture_large: string,
    picture_thumbnail: string,
    favorite: boolean
}
