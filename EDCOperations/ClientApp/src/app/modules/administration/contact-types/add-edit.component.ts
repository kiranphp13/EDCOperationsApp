import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ContactTypeService} from '../services/contact-type.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgxSpinnerService } from 'ngx-spinner';
import {UserService} from 'src/app/shared/user.service';

@Component({templateUrl: 'add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  loader = false;
  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contactTypeService: ContactTypeService,
    private spinnerService: NgxSpinnerService,
    private userService: UserService
  ) {
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.getContactTypeRecords();
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      description: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.spinnerService.show();
      this.contactTypeService.getById(this.id)
        .subscribe(data => {
          this.spinnerService.hide();
          this.form.patchValue(data);
        });

    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createRecord();
    } else {
      this.updateRecord();

    }
  }

  private createRecord() {
    let value = this.form.get('type').value;

    const body = {
      type: this.form.get('type').value,
      description: this.form.get('description').value,
      updatedByUserId: this.currentUser.id
    };

    this.contactTypeService.create(body)
      .pipe(first())
      .subscribe((data) => {

        if (data['status'] === 'Success') {
          console.log(data);
          Swal.fire({
            title: '',
            html: 'Record added successfully.',
            width: '20%',
            position: 'bottom-center',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/administration/contact-types']);
        } else {
          Swal.fire({
            icon: 'error',
            title: data['message']
          });
        }
      })
      .add(() => this.loading = false);

  }

  private updateRecord() {
    if (this.form.dirty) {
      const body = {
        type: this.form.get('type').value,
        description: this.form.get('description').value,
        updatedByUserId: this.currentUser.id
      };

      this.contactTypeService.update(this.id, body)
        .pipe(first())
        .subscribe((data) => {

          if (data['status'] === 'Success') {
            console.log(data);
            Swal.fire({
              title: '',
              html: 'Record updated successfully.',
              width: '20%',
              position: 'bottom-center',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/administration/contact-types']);
          } else {
            Swal.fire({
              icon: 'error',
              title: data['message']
            });
          }
        })
        .add(() => this.loading = false);
    } else {
      this.router.navigate(['/administration/contact-types']);
    }
  }

  contactTypes = new Map();
  _contactTypes: any;

  getContactTypeRecords() {
    this.contactTypeService.getAll()
      .subscribe(data => {
        this._contactTypes = data;
        for (const rec of this._contactTypes) {
          this.contactTypes.set(rec['type'], rec['description']);
        }

        console.log(this.contactTypes);

      });
  }
}
