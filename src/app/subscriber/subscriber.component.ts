import {
  Input,
  Component,
  ViewEncapsulation,
  EventEmitter,
  Output,
  OnInit
} from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-subscriber',
  template: `
  <form [formGroup]="newsletterForm" (submit)="onSubmit()">
    <div class="container">
      <label>{{title}}</label>
      <input class="email" formControlName="email" id="email" type="email" placeholder="Your email"/>
      <div *ngIf="(email.dirty || email.touched) && email.invalid">
          <span *ngIf="email.errors.required">
            <i class="error">email address is required.</i>
          </span>
          <span *ngIf="email.errors.email">
            <i class="error">not a valid email addreess.</i>
          </span>
      </div>
      <button class="button" type="submit">Subscribe!</button>
      </div>
  </form>`,
  styles: [
    `
  .container{
    background:#9c88ff;
    width:400px;
    height:200px;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    border-radius:10px;
    box-shadow: 0 5px 5px 0px #8c7ae6;
  }
  label{
    margin: 10px;
    font-family: 'Satisfy', cursive;
    color: #fff;
    font-size: 28px;
  }
  .email{
    display: block;
    width: 292px;
    height: 30px;
    font-size: 18px;
    border-radius: 5px;
    border: 0px;
    padding: 4px;
    text-align: center;
    margin:5px;
    font-family: 'Satisfy', cursive
  }
  .button{
    width: 300px;
    height: 38px;
    background: #4cd137;
    font-size: 18px;
    border: 0px;
    border-radius: 5px;
    color: #fff;
    margin:5px;
    font-family: 'Satisfy', cursive;
  }
  .error{
    color: #fff;
  }
  `
  ],
  encapsulation: ViewEncapsulation.Native
})
export class SubscriberComponent implements OnInit {
  @Input() title = 'default label';
  @Output() subscribe = new EventEmitter<string>();

  newsletterForm: FormGroup;

  get email() {
    return this.newsletterForm.get('email');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.newsletterForm = new FormGroup(
      {
        email: new FormControl('', {
          validators: [Validators.required, Validators.email]
        })
      },
      { updateOn: 'submit' }
    );
  }

  onSubmit() {
    if (this.newsletterForm.valid) {
      this.subscribe.emit(this.email.value);
    }
  }
}
