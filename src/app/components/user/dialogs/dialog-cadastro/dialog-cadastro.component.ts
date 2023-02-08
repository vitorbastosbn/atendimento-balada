import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Permission } from './../../../../models/permission.model';
import { PermissionService } from './../../../../services/permission.service';

const PONTO = '.';
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
    this.form.setValue(this.data);
    this.form.get('permissions')?.setValue(this.data.permissions.map((permission: Permission) => permission.id));

    console.table(this.form);

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
    if (fullname !== null && fullname !== undefined) {
      this.usernames = [];

      let names = fullname.split(ESPACO);

      names.forEach((name) => {
        let username = '';
        if (!this.pronoums.includes(name.toLowerCase())) {
          username = username.concat(name.toLowerCase(), PONTO);

          names.forEach((nameInitials) => {
            if (!this.pronoums.includes(nameInitials.toLowerCase()))
              username = username.concat(nameInitials.charAt(0).toLowerCase());
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
