/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

export class User {
  static API_ADDRESS = 'users'
  id!: number
  name!: string
  username!: string
  email!: string
  password!: string
  avatar!: string
  address!: Address
  phone!: string
  website!: string
  company!: string
}

export class Address {
  static API_ADDRESS = 'address'
  country!: string
  city!: string
  street!: string
  alley!: string
  number!: number
  geo!: {
    lat: string
    lng: string
  }
}
