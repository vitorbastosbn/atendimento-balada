import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Permission } from './../../../../models/permission.model';
import { PermissionService } from './../../../../services/permission.service';

const STRING_VAZIO = '';
const ESPACO = ' ';
const USERNAME = 'username';
const FULLNAME = 'fullname';
const PERMISSIONS = 'permissions';

@Component({
  selector: 'app-dialog-cadastro',
  templateUrl: './dialog-cadastro.component.html'
})
export class DialogCadastroComponent implements OnInit {

  private usernames!: string[];
  private pronoums: string[] = ['da', 'de', 'do'];
  permissions: Permission[] = [];

  form = this.formBuilder.group({
    id: [null],
    fullname: [STRING_VAZIO, [Validators.required]],
    username: [STRING_VAZIO, [Validators.required]],
    permissions: [[], [Validators.required]],
    password: [STRING_VAZIO, [Validators.required]]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogCadastroComponent>,
    private formBuilder: FormBuilder,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.preloadProfile();
    if (this.data) {
      this.form.patchValue(this.data);
    }
    if (this.data.permissions)
      this.form.get(PERMISSIONS)?.setValue(this.data.permissions.map((permission: Permission) => permission.id));
    this.form.get(FULLNAME)?.valueChanges.subscribe(v => {
      this.form.get(USERNAME)?.setValue(this.generateUserName(v));
    });
    this.form.get(USERNAME)?.disable();
  }

  preloadProfile() {
    this.permissionService.findAll().subscribe((permissions) => this.permissions = permissions);
  }

  private generateUserName(fullname: string | null) {
    if (fullname) {
      this.usernames = [];

      const names = fullname.split(ESPACO);

      names.forEach((name) => {
        let username = '';
        if (!this.pronoums.includes(name.toLowerCase())) {
          username = `${name.toLowerCase()}.`;

          const initials = names.filter((nameInitials) => !this.pronoums.includes(nameInitials.toLowerCase()));

          initials.forEach((initial) => {
            if (initial)
              username += initial[0].toLowerCase()
          });

          this.usernames.push(username);
        }
      });
      return this.usernames[0];
    } return null;
  }

  onConfirm() {
    this.form.get(USERNAME)?.enable();
    this.dialogRef.close(this.form.value);
  }

  onClose() {
    this.form.reset();
    this.dialogRef.close();
  }

}
