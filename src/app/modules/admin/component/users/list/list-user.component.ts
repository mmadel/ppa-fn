import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from '../../../service/user/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users!: Observable<User[]>
  createUserVisibility: boolean = false;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.findAllUsers();
  }
  private findAllUsers(){
    this.users = this.userService.find();
  }
  togglecreateUser(){
    this.createUserVisibility = !this.createUserVisibility;
  }
  changeFacilityVisibility(event:any){
    if(event ==='close'){
      this.createUserVisibility = false;
      this.findAllUsers();
    }
  }
}
