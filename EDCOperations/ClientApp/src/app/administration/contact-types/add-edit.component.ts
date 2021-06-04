import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ContactTypeService } from '../../services/contact-type.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contactTypeService: ContactTypeService
  ) { }

  ngOnInit() {
    this.getContactTypeRecords();
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;


    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      description: ['', Validators.required]
      
    });

    if (!this.isAddMode) {
      this.contactTypeService.getById(this.id)
        .subscribe(x => this.form.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

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
      //TODO Update
      this.updateRecord();

    }
  }

  private createRecord() {
    let value = this.form.get('type').value;

    if (this.contactTypes.get(value)) {
      Swal.fire({
        icon: 'error',
        text: value + ' is already taken!',
      });
      this.loading = false;
      return false;

    } else {
      this.contactTypeService.create(this.form.value)
        .pipe(first())
        .subscribe(() => {
          Swal.fire('Record Added Successfully');
          //this.alertService.success('Record added', { keepAfterRouteChange: true });
          this.router.navigate(['/contact-types']);
        })
        .add(() => this.loading = false);
    }
  }

  private updateRecord() {
    this.contactTypeService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        Swal.fire('Record Updated Successfully');
        //this.alertService.success('Record added', { keepAfterRouteChange: true });
        this.router.navigate(['/contact-types']);
      })
      .add(() => this.loading = false);
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
