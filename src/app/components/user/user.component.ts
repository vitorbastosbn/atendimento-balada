import { Permission } from './../../models/permission.model';
import { DialogCadastroComponent } from './dialogs/dialog-cadastro/dialog-cadastro.component';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  user!: User;
  displayedColumns: string[] = ['fullname', 'username', 'permissions', 'actions'];

  constructor(
    private service: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.service.findAll().subscribe((s) => { this.users = s });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCadastroComponent, {
      width: '40%',
      disableClose: true,
      data: this.user
    });

    dialogRef.afterClosed().subscribe(userResult => {
      if (userResult) {
        let user: User = userResult;
        let permissions: Permission[] = [];

        userResult.permissions.forEach((id: any) => {
          let p: Permission = { id: id }
          permissions.push(p);
        });

        user.permissions = permissions;

        if (user.id)
          this.service.edit(user).subscribe(() => this.findall());
        else
          this.service.create(user).subscribe(() => this.findall());
      }
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.findall());
  }

  findall() {
    this.service.findAll().subscribe((s) => { this.users = s });
  }

  loadUser(user: User) {
    this.user = user;
    this.openDialog();
  }

}
