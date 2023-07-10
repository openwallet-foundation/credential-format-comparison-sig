import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-credential-profile-add-dialog',
  templateUrl: './credential-profile-add-dialog.component.html',
  styleUrls: ['./credential-profile-add-dialog.component.scss'],
})
export class CredentialProfileAddDialogComponent {
  public form: FormGroup;
  public credentialFormat = new FormControl('', Validators.required);
  public signingAlgorithm = new FormControl('', Validators.required);
  public revocationAlgorithm = new FormControl('', Validators.required);
  public keyManagementIssuer = new FormControl('', Validators.required);
  public keyManagementHolder = new FormControl('', Validators.required);
  public trustManagement = new FormControl('', Validators.required);
  fileName?: string;
  fileContent?: string;
  link?: string;

  constructor(public appService: AppService) {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        this.uniqueNameValidator(
          this.appService.getNames('Credential Profile')
        ),
      ]),
      description: new FormControl('', Validators.required),
      specification: new FormControl('', Validators.required),
      implementations: new FormControl('', Validators.required),
      credentialFormat: this.credentialFormat,
      signingAlgorithm: this.signingAlgorithm,
      revocationAlgorithm: this.revocationAlgorithm,
      keyManagementIssuer: this.keyManagementIssuer,
      keyManagementHolder: this.keyManagementHolder,
      trustManagementIssuer: this.trustManagement,
    });
  }

  create() {
    this.fileName = `${this.form.value.name}.json`;
    this.fileContent = JSON.stringify(this.form.value, null, 2);
  }

  uniqueNameValidator(names: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const name = control.value.toLowerCase().trim();
      const isUnique = !names
        .map((name) => name.toLowerCase().trim())
        .includes(name);
      return isUnique ? null : { isUnique: { value: true } };
    };
  }
}
