import ajax from './ajax';

const BASE = '' /* leave as empty because the port would be either 3000 and 3001 */

// login
export const reqLogin = (adminUsername, adminPassword) => ajax(BASE + '/5619/admins/login', {adminUsername, adminPassword}, 'PUT')

//sign up
export const reqRegister = (adminUsername, adminPassword,peopleName,peopleGender,peopleAge,peopleEmail,peoplePhone) => ajax(BASE + '/5619/admins/register', {adminUsername, adminPassword,peopleName,peopleGender,peopleAge,peopleEmail,peoplePhone}, 'POST')

//validation code
export const reqCheckCode = (smsCode) => ajax(BASE + '/5619/admins/login/verify/'+ smsCode, null, 'GET')

//query for admin's information
export const reqAdminInfo= () => ajax(BASE + '/5619/admins/adminInfo', null, 'GET')

//query for visitor  data in past seven days
export const reqSevenDaysData = () =>ajax(BASE + '/5619/visits/sevendays', null, 'GET')

//query for museum's total capacity
export const reqMuseumCapacity = () =>ajax(BASE + '/5619/visits/capacity', null, 'GET')

//query for museum's real time capacity
export const reqRealTimeCapacity = () =>ajax(BASE + '/5619/visits/today/totalrealtimeflow', null, 'GET')

//query for total visitor in a single day
export const reqTodayTotalVisitor = () =>ajax(BASE + '/5619/visits/today/totalflow', null, 'GET')

//query for for park spot availability
export const reqParkingLotInfo = () =>ajax(BASE + '/5619/parkinglots', null, 'GET')

//open the museum
export const reqOpenMuseum = () =>ajax(BASE + '/5619/schedulers/start', null, 'GET')

//close the museum
export const reqCloseMuseum = () =>ajax(BASE + '/5619/schedulers/stop', null, 'GET')

//query for last 7 days visitors information for giving venue
export const reqVenueSevenDaysData = (venueId) => ajax(BASE + '/5619/visits/sevendays/venue/'+ venueId, null, 'GET')

//query for real time visitor for each venue
export const reqRealTimeCapacityVenue= () =>ajax(BASE + '/5619/visits/today/eachvenuerealtimeflow', null, 'GET')

//query for giving venue's capacity
export const reqVenueCapacity = (venueId) => ajax(BASE + '/5619/visits/capacity/'+ venueId, null, 'GET')

//query for the total visitor in current venue today
export const reqVenueTodayTotalVisitor = () =>ajax(BASE + '/5619/visits/today/eachvenuetotalflow', null, 'GET')

//update the car park capacity
export const reqModifyParkingLotCapacity = (capacity) => ajax(BASE + '/5619/parkinglots/modifyCapacity/' + capacity, null, 'PUT')

//update the capacity for giving venue
export const reqModifyVenueCapacity = (venueId,venueCapacity) => ajax(BASE + '/5619/venues/modifyVenueCapacity', {venueId,venueCapacity}, 'PUT')

//update profile, probably separate as pass and profile later
export const reqUpdateProfile = (AdminPeopleId, adminUsername, peopleEmail, peoplePhone, adminPassword) => ajax(BASE + '/5619/admins/update', {AdminPeopleId, adminUsername, peopleEmail, peoplePhone, adminPassword}, 'POST')

//query for gender percentage in last 7 days
export const reqSevenDaysGender=() =>ajax(BASE + '/5619/people/genderPortrait/sevendays',null,'GET')

//query for gender percentage
export const reqAllGender=() =>ajax(BASE + '/5619/people/genderPortrait/all',null,'GET')

//query for age percentage
export const reqAgeGroup=() =>ajax(BASE + '/5619/people/agePortrait',null,'GET')

//query for all comments
export const reqComments = () =>ajax(BASE + '/5619/comments/allComments',null,'GET')

//query for all visitor
export const reqVisitorData = () => ajax(BASE + '/5619/visitor/visitorRecord', null, 'GET')

//query for history
export const reqHistory = (startTime,endTime,venueId) => ajax(BASE + '/5619/visits/search/record', {startTime,endTime,venueId}, 'POST')

