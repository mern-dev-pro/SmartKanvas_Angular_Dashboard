import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-card-users',
  templateUrl: './card-users.component.html',
  styleUrls: ['./card-users.component.scss']
})
export class CardUsersComponent implements OnInit {

  @Input() user: User;
  @Output() changeIsActive = new EventEmitter<User>();
  @Output() resendInvite = new EventEmitter<User>();
  @Output() delete = new EventEmitter<User>();
  constructor(
    private userService:UserService,
    public dialog:MatDialog,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {

  }

  OnClickChangeStatus(){
    this.changeIsActive.emit(this.user);
  }

  OnClickResendInvite(){
    this.resendInvite.emit(this.user);
  }

  OnClickDelete(){
    this.delete.emit(this.user);
  }
}
