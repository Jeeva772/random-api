import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Country } from '../shared/country';
import { User } from '../shared/user';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css'],
})
export class UserComponentComponent implements OnInit {
  countries: Country[] = [];
  userlist: User[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCountryList().subscribe((data) => {
      console.log(data);
      this.countries.push(...data.countries);
    });
  }

  updateUserList(countryName: string){
    const users: User[] = Object.assign([], this.countries.filter((country) => country.name === countryName)[0].users);
    this.userlist = Object.assign([], users);
    console.log(this.userlist)
  }

  refreshCountryList(){
    this.userService.triggerBatchUpdate().subscribe((data)=>{
      console.log(data)
    });
    this.userService.getCountryList().subscribe((data) => {
      console.log(data);
      this.countries.push(...data.countries);
    });
  }
}
