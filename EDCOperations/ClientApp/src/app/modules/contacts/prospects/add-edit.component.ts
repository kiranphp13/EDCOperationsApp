import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {first} from 'rxjs/operators';
import { ProspectService } from '../services/prospect.service';
import { UserService } from 'src/app/shared/user.service';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styles: []
})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  loader = false;
  currentUser: any;
  agenciesList: any;
  statesList: any;
  contactTypesList: any;
  isDropDownDataLoaded = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private prospectService: ProspectService,
    private userService: UserService,
    private spinnerService: NgxSpinnerService) {
      this.userService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
    // this.getContactTypeRecords();
    this.spinnerService.show();
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.getDropdownData();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      agency: ['', Validators.required],
      contact_type: ['', Validators.required],
      salute: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      title: ['', Validators.required],
      profession: ['', Validators.required],
      company: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      email: ['', Validators.required],
      phone1: ['', Validators.required],
      phone2: ['', Validators.required],
      city: ['', Validators.required],
      stateName: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      activeStatus: ['']
    });

    if (!this.isAddMode) {
      this.prospectService.getById(this.id)
        .subscribe(data => {
          this.spinnerService.hide();
          this.form.patchValue(data);

          this.form.patchValue({
            agency: data['agencyId'],
            contact_type: data['contactTypeId'],
            firstName: data['first'],
            lastName: data['last'],
            middleName: data['middle'],
            stateName: data['state']
            //template_name:  res.data.template_name,
          });
        });
    }
  }
  get f() {
    return this.form.controls;
  }

  f1() {
    return this.form.value;
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
      this.loading = false;
      alert("Under development");
      //this.updateRecord();
    }
  }
  private createRecord() {
    const body = {
      salute: this.form.get('salute').value,
      first: this.form.get('firstName').value,
      last: this.form.get('lastName').value,
      middle: this.form.get('middleName').value,
      profession: this.form.get('profession').value,
      company: this.form.get('company').value,
      address1: this.form.get('address1').value,
      address2: this.form.get('address2').value,
      email: this.form.get('email').value,
      phone1: this.form.get('phone1').value,
      phone2: this.form.get('phone2').value,
      city: this.form.get('city').value,
      state: this.form.get('stateName').value,
      zip: this.form.get('zip').value,
      country: this.form.get('country').value,
      activeStatus: this.form.get('activeStatus').value === true ? '1' : '0',
      updatedByUserId: this.currentUser.id,
      agencyId: Number(this.form.get('agency').value),
      contactTypeId: Number(this.form.get('contact_type').value),
    };

    this.prospectService.create(body)
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
          this.router.navigate(['/prospects']);
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
        name: this.form.get('name').value,
        description: this.form.get('description').value,
        updatedByUserId: this.currentUser.id
      };

      this.prospectService.update(this.id, body)
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
            this.router.navigate(['/administration/contact-category']);
          } else {
            Swal.fire({
              icon: 'error',
              title: data['message']
            });
          }
        })
        .add(() => this.loading = false);
    } else {
      this.router.navigate(['/administration/contact-category']);
    }
  }


  getDropdownData() {
    this.prospectService.getAgenciesList()
      .subscribe(adata => {
        this.agenciesList = adata;

        this.prospectService.getStatesList()
          .subscribe(sdata => {
            this.statesList = sdata;

            this.prospectService.getContactTypesList()
              .subscribe(cdata => {
                this.contactTypesList = cdata;
                this.isDropDownDataLoaded = true;
                this.buildForm();

                this.spinnerService.hide();
              });
          });
      });
  }
}
