import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { take } from 'rxjs/operators';
import { Profile } from 'src/app/models/Profile';
import { User } from 'src/app/models/User';
import { InputEnrollUserToWorkspaceSave, InputUpdateUserInWorkspace } from 'src/app/models/UserWorkspaceSave';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @ViewChild('photo') photoRef: ElementRef<HTMLInputElement>;
  photoURL:string;
  userForm: FormGroup;
  profiles:Profile[];
  dictionary:any;
  userID:string;
  user:User;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private profileService: ProfileService,
    private globalDataService: GlobalDataService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['id'];
    this.setForm();
    if(this.userID){
      this.userService.getUserSK(this.userID)
        .subscribe(
          (res:any ) => {
            this.user = this.userService.formatUser(res.data.getUserSK);
            this.updateForm();
          },
          (error) => {}
        )
    }

    this.dictionary = this.getProfileDictionary();
    this.getAllProfiles();

  }

  setForm():void{
    this.userForm = this.fb.group({
      UserName: ['',Validators.required],
      Email: ['',[Validators.required,Validators.email]],
      ProfileCode: ['',Validators.required],
    });
  }

  updateForm():void{
    const user = this.user;
    this.userForm = this.fb.group({
      UserName: [user.UserName ],
      Email: [user.Email, Validators.email],
      ProfileCode: [user.profile.ID],
    });

  }

  getAllProfiles() {
    this.profileService.getAllProfiles().pipe(
      take(1)
    ).subscribe(
      (res: any) => {
        this.profiles = res.data.getAllProfile;
      },
      (err) => {},
      () => {}
    )
  }

  getProfileDictionary(){
    return this.profileService.profileDictonary;
  }
  onSubmit(){
    if(this.userID){
      this.updateUser();
    }else {
      this.createUser();
    }

  }
  navigateBack(){
    this.router.navigate(['dashboard/list-user']);
  }
  changePreview(event){
    const file = (event.target as HTMLInputElement).files[0];

    this.userForm.patchValue({
      Photo: file
    });

    this.userForm.get('Photo').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.photoURL = reader.result as string;
    }

    reader.readAsDataURL(file);
  }

  openInput(){
    this.photoRef.nativeElement.click();
  }

  createUser(){
    const { Email, UserName, ProfileCode } = this.userForm.value;
    const inputUserWorkspaceSave:InputEnrollUserToWorkspaceSave = {
      UserSK: {
        Email,
        UserName,
        IsActive: true,
        ShowGetStarted: false
      },
      ProfileCode,
      WorkspaceCode: localStorage.getItem('workspaceId')
    }

    this.userService.enrollUserToWorkspace(inputUserWorkspaceSave).subscribe(
      (res:any) => {
        this.snackBarService.showNotification({
          message: 'Usuário cadastrado com sucesso',
          type: 'success'
        });
        this.navigateBack();
      },
      (error: any) => console.log(error)
    )
  }

  updateUser(){
    console.log
    const { Email, UserName, ProfileCode } = this.userForm.value;
    const inputUpdateUserInWorkspace:InputUpdateUserInWorkspace = {
      UserName,
      UserWorkspaceUpdate: {
        ProfileCode
      },
      Email

    }

    this.userService.updateUserInWorkspace(
        inputUpdateUserInWorkspace,
        this.user.currentUserWorkspaceID
      )
      .subscribe(
      (res:any) => {
        this.snackBarService.showNotification({
          message: 'Usuário atualizado com sucesso',
          type: 'success'
        });
        this.navigateBack();
      },
      (error: any) => console.log(error)
    )
  }
}
