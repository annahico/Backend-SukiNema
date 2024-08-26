import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private role: number = 3;

  sendingRoleEmitter = new EventEmitter<{ role: number }>();
  sendingUsersRole = new EventEmitter<{ role: number }>();
  sendingMoviesRole = new EventEmitter<{ role: number }>();
  sendingMoviesDetailsRole = new EventEmitter<{ role: number }>();
  sendingCinemasRole = new EventEmitter<{ role: number }>();
  sendingShowsRole = new EventEmitter<{ role: number }>();
  sendingAddRecordRole = new EventEmitter<{ role: number }>();
  sendingEditCinemaRole = new EventEmitter<{ role: number }>();
  sendingEditMovieRole = new EventEmitter<{ role: number }>();
  sendingSelectCinemaRole = new EventEmitter<{ role: number }>();
  sendingSheetBookingRole = new EventEmitter<{ role: number }>();
  sendingCinemaDetailRole = new EventEmitter<{ role: number }>();
  sendingBookingHistoryRole = new EventEmitter<{ role: number }>();
  sendingEditShowRole = new EventEmitter<{ role: number }>();
  sendingDeleteMessage = new EventEmitter<{ message: any }>();
  sendingDeleteCinemaMessage = new EventEmitter<{ message: any }>();
  sendingDeleteMovieMessage = new EventEmitter<{ message: any }>();
  sendingDeleteShowMessage = new EventEmitter<{ message: any }>();

  constructor(private http: HttpClient) { }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `bearer ${token}`);
  }

  private fetchRoleAndEmit(url: string, emitter: EventEmitter<{ role: number }>): void {
    const headers = this.createHeaders();
    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        this.role = response.role != null ? response.role : -1;
        emitter.emit({ role: this.role });
      },
      () => {
        this.role = -1;
        emitter.emit({ role: this.role });
      }
    );
  }

  setRole() {
    const token = localStorage.getItem('token');
    if (token == null) {
      this.role = -1;
      this.sendingRoleEmitter.emit({ role: this.role });
    } else {
      this.fetchRoleAndEmit('/api/auth/getrole', this.sendingRoleEmitter);
    }
  }

  usersRole() {
    this.setRole();
  }

  moviesRole() {
    this.fetchRoleAndEmit('/api/auth/getrole', this.sendingMoviesRole);
  }

  moviesDetailsRole() {
    this.fetchRoleAndEmit('/api/auth/getrole', this.sendingMoviesDetailsRole);
  }

  cinemasRole() {
    this.fetchRoleAndEmit('/api/auth/getrole', this.sendingCinemasRole);
  }

  showsRole() {
    this.fetchRoleAndEmit('/api/auth/getrole', this.sendingShowsRole);
  }

  addRecordRole() {
    this.fetchRoleAndEmit('/api/auth/getrole', this.sendingAddRecordRole);
  }

  editCinemaRole() {
    this.fetchRoleAndEmit('/api/auth/getrole', this.sendingEditCinemaRole);
  }

  editMovieRole() {
    this.fetchRoleAndEmit('/api/auth/getrole', this.sendingEditMovieRole);
  }

  selectCinemaRole() {
    this.fetchRoleAndEmit('/api/auth/getrole', this.sendingSelectCinemaRole);
  }

  sheetBookingRole() {
    this.fetchRoleAndEmit('/api/auth/getrole', this.sendingSheetBookingRole);
  }

  cinemaDetailsRole() {
    this.fetchRoleAndEmit('/api/auth/getrole', this.sendingCinemaDetailRole);
  }

  bookingHistoryRole() {
    this.fetchRoleAndEmit('/api/auth/getrole', this.sendingBookingHistoryRole);
  }

  editShowRole() {
    this.fetchRoleAndEmit('/api/auth/getrole', this.sendingEditShowRole);
  }

  emitDeleteMessage(message: any) {
    this.sendingDeleteMessage.emit({ message });
  }

  emitDeleteCinemaMessage(message: any) {
    this.sendingDeleteCinemaMessage.emit({ message });
  }

  emitDeleteMovieMessage(message: any) {
    this.sendingDeleteMovieMessage.emit({ message });
  }

  emitDeleteShowMessage(message: any) {
    this.sendingDeleteShowMessage.emit({ message });
  }

  getData() {
    return this.http.get('/api/getData');
  }

  registration(registrationData: any) {
    return this.http.post('/api/auth/registration', registrationData);
  }

  login(loginData: any) {
    return this.http.post('/api/auth/login', loginData);
  }

  sendEmail(email: any) {
    return this.http.post('/api/auth/sendemail', email);
  }

  logOut() {
    const headers = this.createHeaders();
    return this.http.get('/api/auth/logout', { headers });
  }

  // Movie related methods
  getMovies() {
    return this.http.get('/api/movies/getmovies', { headers: this.createHeaders() });
  }

  getMovie(movieid: any) {
    return this.http.get(`/api/movies/getmovie/${movieid}`, { headers: this.createHeaders() });
  }

  deleteMovie(movieid: any) {
    return this.http.delete(`/api/movies/deletemovie/${movieid}`, { headers: this.createHeaders() });
  }

  addMovie(movieDetails: any) {
    return this.http.post('/api/movies/addmovie', movieDetails, { headers: this.createHeaders() });
  }

  editMovie(movieid: any, moviedetails: any) {
    return this.http.put(`/api/movies/editmovie/${movieid}`, moviedetails, { headers: this.createHeaders() });
  }

  // Cinema related methods
  getCinemas() {
    return this.http.get('/api/cinemas/getcinemas', { headers: this.createHeaders() });
  }

  deleteCinema(id: any) {
    return this.http.delete(`/api/cinemas/delete/${id}`, { headers: this.createHeaders() });
  }

  addCinema(cinemaDetails: any) {
    return this.http.post('/api/cinemas/addcinema', cinemaDetails, { headers: this.createHeaders() });
  }

  getCinema(cinemaid: any) {
    return this.http.get(`/api/cinemas/getcinema/${cinemaid}`, { headers: this.createHeaders() });
  }

  editCinema(cinemaid: any, cinemaDetails: any) {
    return this.http.put(`/api/cinemas/editcinema/${cinemaid}`, cinemaDetails, { headers: this.createHeaders() });
  }

  getCinemaByName(cinemaname: any) {
    return this.http.get(`/api/cinemas/getcinemabyname/${cinemaname}`, { headers: this.createHeaders() });
  }

  // Show related methods
  addShow(showDetails: any) {
    return this.http.post('/api/shows/addshow', showDetails, { headers: this.createHeaders() });
  }

  getShows(movieid: any) {
    return this.http.get(`/api/shows/getshows/${movieid}`, { headers: this.createHeaders() });
  }

  getAllShows() {
    return this.http.get('/api/shows/getshows', { headers: this.createHeaders() });
  }

  getShowsByCinemaid(cinemaid: any) {
    return this.http.get(`/api/shows/getshowsbycinemaid/${cinemaid}`, { headers: this.createHeaders() });
  }

  getShow(showid: any) {
    return this.http.get(`/api/shows/getshow/${showid}`, { headers: this.createHeaders() });
  }

  editShow(showid: any, showDetails: any) {
    return this.http.put(`/api/shows/editshow/${showid}`, showDetails, { headers: this.createHeaders() });
  }

  deleteShow(showid: any) {
    return this.http.delete(`/api/shows/deleteshow/${showid}`, { headers: this.createHeaders() });
  }

  // Booking related methods
  getBookingHistory(userid: any) {
    return this.http.get(`/api/booking/getbookinghistory/${userid}`, { headers: this.createHeaders() });
  }

  bookSeats(seatDetails: any) {
    return this.http.post('/api/booking/bookseats', seatDetails, { headers: this.createHeaders() });
  }

  getBookings() {
    return this.http.get('/api/booking/getbookings', { headers: this.createHeaders() });
  }

  // User related methods
  getUser(userid: any) {
    return this.http.get(`/api/users/getuser/${userid}`, { headers: this.createHeaders() });
  }

  getUsers() {
    return this.http.get('/api/users/getusers', { headers: this.createHeaders() });
  }

  deleteUser(id: any) {
    return this.http.delete(`/api/users/delete/${id}`, { headers: this.createHeaders() });
  }
}
