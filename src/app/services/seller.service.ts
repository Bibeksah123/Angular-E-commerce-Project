import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  // rxjs behaviors used
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient, private router:Router) { }
  UserSignUp(data:signUp){

   let result = this.http.post('http://localhost:3000/seller',data,
{observe: 'response'}).subscribe((result)=>{
  this.isSellerLoggedIn.next(true);
  localStorage.setItem('seller', JSON.stringify(result.body))
  this.router.navigate(['seller-home'])

})
 
 

  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data: login){
console.log(data);
// api call


  this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
   {observe:'response'}).subscribe((result:any)=>{
    console.warn(result)
if(result && result.body && result.body.length){
  console.log("user Logged In");
  localStorage.setItem('seller', JSON.stringify(result.body))
  this.router.navigate(['seller-home'])
}
else{
  console.log("login failed")
  this.isLoginError.emit(true);
}
  
  })



  }
}
