import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Permission } from './../../models/permission.model';
import { PermissionService } from './../../services/permission.service';
import { DialogCadastroPermissionComponent } from './dialog/dialog-cadastro-permission/dialog-cadastro-permission.component';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class RoleComponent implements OnInit {

  permissions: Permission[] = [];
  permission!: Permission;
  displayedColumns: string[] = ['permissions', 'actions'];

  constructor(
    private service: PermissionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.service.findAll().subscribe((s) => this.permissions = s);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCadastroPermissionComponent, {
      width: '40%',
      disableClose: true,
      data: this.permission
    });

    dialogRef.afterClosed().subscribe(permissionResult => {
      if (permissionResult && permissionResult.id === null) {
        this.service.create(permissionResult).subscribe(() => this.findAll());
      } else {
        this.service.edit(permissionResult).subscribe(() => this.findAll());
      }
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.findAll());
  }

  loadPermission(permission: Permission) {
    this.permission = permission;
    this.openDialog();
  }

  findAll() {
    this.service.findAll().subscribe((s) => this.permissions = s);
  }

}
