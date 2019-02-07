import {EventEmitter, Injectable, Output} from '@angular/core';
import userDefs from "./definitions/user";
import videoDefs from "./definitions/video";
import schoolDefs from "./definitions/school";
import instDefs from "./definitions/inst";
import lectureDefs from "./definitions/lecture";
import subjectDefs from "./definitions/subject";

@Injectable({
  providedIn: 'root'
})
export class AdminAgGridService {
  @Output() getData : EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  public users(){
    this.getData.emit({ defs :userDefs});
  }
  public videos(){
    this.getData.emit({ defs :videoDefs});
  }
  public subjects(){
    this.getData.emit({ defs :subjectDefs});
  }
  public institutions(){
    this.getData.emit({ defs :instDefs});
  }
  public lectures(){
    this.getData.emit({ defs :lectureDefs});
  }
  public schools(){
    this.getData.emit({ defs :schoolDefs});
  }
}
