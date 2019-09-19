import { Pipe, PipeTransform } from '@angular/core';
import { Donor } from '../model/donor';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  filteredDonors: Array<Donor> = [];
  transform(donors: Array<Donor>, factors: any[]): any {
    console.log(donors);
    this.filteredDonors = [];
    factors.forEach(element => {
      console.log(element)
      if(element.title == 'Blood Group') {
        element.ranges.forEach(range => {
          if (range.checked == true) {
            console.log(range)
              donors.forEach(donor => {
                console.log(donor.medicalDetails.bloodGroup)
                if (donor.medicalDetails.bloodGroup == range.name) {
                  this.filteredDonors.push(donor);
                }
              });
          }
        });
      }
      else if(element.title == 'Rh Factor') {
        element.ranges.forEach(range => {
          if (range.checked == true) {
            donors.forEach(donor => {
              if (donor.medicalDetails.rhFactor.includes(range.name)) {
                this.filteredDonors.push(donor);
              }
            });
          }
        });
      }
      else if(element.title == 'Lung Size') {
        element.ranges.forEach(range => {
          if (range.checked == true) {
            donors.forEach(donor => {
              if (donor.medicalDetails.lungSize.includes(range.name)) {
                this.filteredDonors.push(donor);
              }
            });
          }
        });
      }
      else if(element.title == 'Platelets Count') {
        element.ranges.forEach(range => {
          if (range.checked == true) {
            donors.forEach(donor => {
              if (donor.medicalDetails.plateletCount.includes(range.name)) {
                this.filteredDonors.push(donor);
              }
            });
          }
        });
      }
      else if(element.title == 'Age') {
        element.ranges.forEach(range => {
          if (range.checked == true) {
            donors.forEach(donor => {
              var timeDiff = Math.abs(Date.now() - new Date(donor.dob).getTime());
              var age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
              if (range.name == '>2' && age > 2 && age <= 18) {
                console.log(range)
                this.filteredDonors.push(donor);
              }
              else if(range.name == '>18' && age > 18) {
                this.filteredDonors.push(donor);
              }
              else if(range.name == '>70' && age > 70) {
                this.filteredDonors.push(donor);
              }
            });
          }
        });
      }
      else if(element.title == 'Body Mass Index') {
        element.ranges.forEach(range => {
          if (range.checked == true) {
            donors.forEach(donor => {
              if (donor.medicalDetails.bodyMassIndex.includes(range.name)) {
                this.filteredDonors.push(donor);
              }
            });
          }
        });
      }
      else if(element.title == 'Liver Attenuation Index') {
        element.ranges.forEach(range => {
          if (range.checked == true) {
            donors.forEach(donor => {
              if (donor.medicalDetails.liverAttenuationIndex.includes(range.name)) {
                this.filteredDonors.push(donor);
              }
            });
          }
        });
      }
      else if(element.title == 'HLA Group') {
        element.ranges.forEach(range => {
          if (range.checked == true) {
            donors.forEach(donor => {
              if (donor.medicalDetails.hlaType.includes(range.name)) {
                this.filteredDonors.push(donor);
              }
            });
          }
        });
      }
    });
    return new Set(this.filteredDonors);
  }

}
