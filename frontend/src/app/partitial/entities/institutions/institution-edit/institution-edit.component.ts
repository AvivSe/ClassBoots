import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {entitiesService} from "../../entities.service";
import {Institution} from "../institution.model";

@Component({
    selector: 'app-institution-edit',
    templateUrl: './institution-edit.component.html',
    styleUrls: ['./institution-edit.component.css']
})
export class InstitutionEditComponent implements OnInit {
    institution = {name:'',address:'',geolocation:'',image:'',id:'',_id:''};
    currentID : string;
    errorMessage: string;
    error: boolean = false;

    constructor(private entitiesService: entitiesService, private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.entitiesService.institutionEmitter.subscribe(data => {
            if(data.error){
                this.error = true;
                this.errorMessage = data.description;
            }
            else{
                this.institution = data;
            }
        });
        this.route.params.subscribe(params => {
            this.currentID = params['_id'];
            this.entitiesService.getInstitution(params['_id']);
        });
    }
    onEdit(editForm) {
        if (!(editForm.value.name == ''))
            this.institution.name = editForm.value.name;
        if (!(editForm.value.address == ''))
            this.institution.address = editForm.value.address;
        if (!(editForm.value.geolocation == ''))
            this.institution.geolocation = editForm.value.geolocation;
        if (!(editForm.value.image == ''))
            this.institution.image = editForm.value.image;
         this.entitiesService.editInstitution(this.institution);
         editForm.resetForm();
    }

    deleteItem(){
        this.entitiesService.deleteElement("institution",this.institution,(data)=>{
           if(data.error){
           }
        });
    }
}
