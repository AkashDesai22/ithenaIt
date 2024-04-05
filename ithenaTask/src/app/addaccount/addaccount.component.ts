import { Component } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { UserDataServiceService } from '../user-data-service.service';

@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.component.html',
  styleUrls: ['./addaccount.component.scss']
})
export class AddaccountComponent {


  userForm!:FormGroup;
  password!:string;
  endPoint:string="posts";
  postData:any;
  getUserData:any;
  userData: any[] = [];
  editUserId: any;
  editUserData:any;
  showForm:boolean=false;
  serachTextValue!:any;
  searchText:any;
 

  constructor(private formBuilder:FormBuilder,
              private apiCallService:UserDataServiceService,){};
  
  ngOnInit(){ 

    this.usersData();
    this.getApiData();

  };



  addUser(){

    this.showForm=!this.showForm;

  };

  usersData(){

    this.userForm=this.formBuilder.group({

      organizationInfo : ["",[Validators.required,]],

      title  : [ "",[Validators.required]],

      select : ["",[]],

      fullName  : ["",[Validators.required,]],

      email  : ["",[Validators.required,]],

      password : ['',[Validators.required,]],

      confirmPassword : ['',[Validators.required]],

      startDate : ["",[]],

      endDate : ["",[]],

      
    })

  };





   //Register Button

  async register() {
    // Get the user data from the form
    const requestData = {
      organizationInfo: this.userForm.value.organizationInfo?.replace(/\s+/g, " ").trim(),
      title: this.userForm.value.title?.replace(/\s+/g, " ").trim(),
      select: this.userForm.value.select?.replace(/\s+/g, " ").trim(),
      fullName: this.userForm.value.fullName?.replace(/\s+/g, " ").trim(),
      email: this.userForm.value.email?.replace(/\s+/g, " ").trim(),
      password: this.userForm.value.password?.replace(/\s+/g, " ").trim(),
      confirmPassword: this.userForm.value.confirmPassworde?.replace(/\s+/g, " ").trim(),
      startDate: this.userForm.value. startDate,
      endDate: this.userForm.value.endDate,
    };
  
    // Patch the Data For Existing User(PATCH API Call)
    if (this.editUserData) {
      
      await this.apiCallService.patchApiCall(this.endPoint, this.editUserData.id, requestData).toPromise();
      console.log('User data updated successfully!');
    } else {
      this.postData=await this.apiCallService.postData(this.endPoint, requestData).toPromise();
      console.log('New user created successfully!');
    };
  
    // Get the updated data from the API
    this.getApiData();
  
    // Reset the form Data
    this.userForm.reset();
  };



   //To Get the Data
  getApiData():any{

    this.apiCallService.getApi(this.endPoint).subscribe((response)=>{
      this.getUserData=response;
   
      
    });
  };


  //Cancel or Reset the Form
  cancel(){

    //To Reset Form Data
    this.userForm.reset();

  };

    //To Edit Record in Table
    async editRecord(id:any){

     this.editUserId=id;
     
    this.editUserData = await this.apiCallService.getApi(this.endPoint,id).toPromise();

 // Assign the retrieved user data to the form fields
 this.userForm.patchValue({
  organizationInfo: this.editUserData.organizationInfo,
  title: this.editUserData.title,
  select: this.editUserData.select,
  fullName: this.editUserData.fullName,
  email: this.editUserData.email,
  password: this.editUserData.password,
  confirmPassword: this.editUserData.confirmPassword,
  startDate: this.editUserData.startDate,
  endDate: this.editUserData.endDate,
});


  };



  //To Delit Record in Table
  async delitRecord(id:any){
    console.log(id);
    
    await this.apiCallService.deleteApiCall(this.endPoint,id).toPromise();

    this.userData =await this.getApiData()

  };


  //To Search User Data In Record



  



}
