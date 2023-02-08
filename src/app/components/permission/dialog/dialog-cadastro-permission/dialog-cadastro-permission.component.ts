import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Permission } from './../../../../models/permission.model';

@Component({
  selector: 'app-dialog-cadastro-permission',
  templateUrl: './dialog-cadastro-permission.component.html'
})
export class DialogCadastroPermissionComponent implements OnInit {

  form = this.formBuilder.group({
    description: ['', [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogCadastroPermissionComponent>,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.data) {
      this.form.get('description')?.setValue(this.data?.description);
    }
  }

  onConfirm() {
    if (this.data) {
      let permission: Permission = {
        id: this.data.id,
        description: this.form.get('description')?.value
      }
      this.dialogRef.close(permission);
    } else {
      let permission: Permission = {
        id: null,
        description: this.form.get('description')?.value
      }
      this.dialogRef.close(permission);
    }
  }

  onClose() {
    this.dialogRef.close();
  }

}
