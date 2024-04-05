import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataServiceService } from '../user-data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  endPoint:string="posts";
  getUserData:any;
  userData: any[] = [];
  editUserId: any;
  editUserData:any;
  userForm: any;
  searchText:any;
  serachTextValue:any;


  
  constructor(private route : Router,
    private apiCallService:UserDataServiceService,){};

      
  ngOnInit(){ 

  
    this.getApiData();

  };

  addAccount(){

    this.route.navigateByUrl("addAccount");
  };

  getApiData():any{

    this.apiCallService.getApi(this.endPoint).subscribe((response)=>{
      this.getUserData=response;
   
      
    });
  };


//To Edit Record in Table
async editRecord(id:any){

  this.route.navigateByUrl("addAccount")

//   this.editUserId=id;
  
//  this.editUserData = await this.apiCallService.getApi(this.endPoint,id).toPromise();

// // Assign the retrieved user data to the form fields
// this.userForm.patchValue({
// organizationInfo: this.editUserData.organizationInfo,
// title: this.editUserData.title,
// select: this.editUserData.select,
// fullName: this.editUserData.fullName,
// email: this.editUserData.email,
// password: this.editUserData.password,
// confirmPassword: this.editUserData.confirmPassword,
// startDate: this.editUserData.startDate,
// endDate: this.editUserData.endDate,
// });

};

  //To Delit Record in Table
  async delitRecord(id:any){
    console.log(id);
    
    await this.apiCallService.deleteApiCall(this.endPoint,id).toPromise();

    this.userData =await this.getApiData()

  };

  searchData(){

    this.searchText=this.serachTextValue;

    this.serachTextValue="";
    
    
  };


}
