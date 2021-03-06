import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { FirebaseService } from "../../firebase.service";

class Photo {
  photoFormControl: FormControl;
  relativePath: string;
  name: string;
  constructor() {
    this.photoFormControl = new FormControl('', [Validators.required]);
    this.relativePath = '';
    this.name = '';
  }
}
class ItemInfo {
  gender: FormControl;
  mainType: FormControl;
  subType: FormControl;
  company: FormControl;
  size: FormControl;
  color: FormControl;
  price: FormControl;
  description: FormControl;
  pic: any;

  constructor() {
    this.gender = new FormControl('', [Validators.required]);
    this.mainType = new FormControl('', [Validators.required]);
    this.subType = new FormControl('', [Validators.required]);
    this.company = new FormControl('', [Validators.required]);
    this.size = new FormControl('', [Validators.required]);
    this.color = new FormControl('', [Validators.required]);
    this.price = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.pic = null;
  }

  getFormControl(info) {
    switch (info) {
      case 'gender':
        return this.gender;
      case 'mainType':
        return this.mainType;
      case 'subType':
        return this.subType;
      case 'company':
        return this.company;
      case 'size':
        return this.size;
      case 'color':
        return this.color;
      case 'price':
        return this.price;
      case 'description':
        return this.description;
      default:
      console.log('Unknown info: '+info);
        break;
    }
  }

  isValid() {
    return (this.gender.valid && this.mainType.valid && this.subType.valid &&
            this.company.valid && this.size.valid && this.color.valid &&
            this.price.valid && this.description.valid && this.pic
          );
  }
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item: ItemInfo
  filteredOptions: Observable<string[]>;

  genderOptions = ['M', 'F', 'Kids']
  main_type = ['Innerwears', 'Tshirts', 'Pants']
  itemInfoString = ['mainType', 'subType', 'gender', 'company', 'size', 'color',
                'price', 'description']
  photoUploadPercentage: number

  constructor(public firebaseService: FirebaseService) {
    this.item = new ItemInfo();
  }

  ngOnInit(): void {
    this.filteredOptions = this.item.gender.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.main_type.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  uploadImage(event) {
    const file = event.target.files[0]
    if (file.type.split('/')[0] != 'image') {
      return alert('Only image file is required')
    } else {
      this.item.pic = file;
    }
  }

  dbAddData() {
    console.log('Adding data');

    var storageRef = firebase.storage().ref(
      environment.firebaseConfig.storagePath+'item_photos/'+this.item.pic.name);
    console.log(firebase);

    var firestore = this.firebaseService.getFireStore();
    console.log(firestore);

    const docRef = firestore.collection(this.item.gender.value).doc(this.item.mainType.value).
                                 collection(this.item.subType.value).doc();
    docRef.set({
      company: this.item.company.value,
      size: this.item.size.value,
      color: this.item.color.value,
      price: this.item.price.value,
      description: this.item.description.value,
      pic: this.item.pic
    }).then(function() {
      console.log('data saved');
    }).catch(function(error) {
      console.log(error);
    });

  }
  submitItem() {
    var metadata = {
      contentType: 'image/jpeg'
    };
    var storageRef = firebase.storage().ref(
      environment.firebaseConfig.storagePath+'/item_photos/'+this.item.pic.name);

    console.log(this.item.pic);
    var task = storageRef.put(this.item.pic);

    task.on('state_changed',
            function progress(snapshot) {
              var uploaded = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
              this.photoUploadPercentage = uploaded;
              console.log('Uploaded: '+uploaded);
            }.bind(this),

            function err(err) {
              console.log('Error: '+err);
            },

            function complete(this) {
              console.log('Upload completed');
              task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('URL download complete');
                this.item.pic = downloadURL;
                this.dbAddData();
              });
            }.bind(this)
    );
  }
}
