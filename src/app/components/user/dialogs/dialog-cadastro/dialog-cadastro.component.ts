import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Permission } from './../../../../models/permission.model';
import { PermissionService } from './../../../../services/permission.service';

const ESPACO = ' ';
const USERNAME = 'username';
const FULLNAME = 'fullname';

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
    fullname: ['', [Validators.required]],
    username: ['', [Validators.required]],
    permissions: [[], [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogCadastroComponent>,
    private formBuilder: FormBuilder,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    if (this.data)
      this.form.setValue(this.data);
    this.form.get('permissions')?.setValue(this.data.permissions.map((permission: Permission) => permission.id));
    this.form.get(FULLNAME)?.valueChanges.subscribe(v => {
      this.form.get(USERNAME)?.setValue(this.generateUserName(v));
    });
    this.form.get(USERNAME)?.disable();
    this.preloadProfile();
  }

  preloadProfile() {
    this.permissionService.findAll().subscribe((s) => this.permissions = s);
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
