export interface IUser{
    EmailID: string,
    Password:string,
    IsAdmin:boolean
}

export interface ICamp{
    CampID: string,
    CampName: string,
    CampImage: string,
    Description: string,
    Capacity: string,
    PriceForWeekDays:string,
    PriceForWeekEnds: string,
    Rating: number
}

export interface IBooking{
    BookingID: string,
    BookingReferenceNo:string,
    UserEmailID:string,
    BookedCampID:string,
	BillingAddress:string,
	State:string,
	Country:string,
	ZipCode:string,
	CellPhone:string,
	CheckIn:string,
    CheckOut:string,
    TotalAmount:string
}