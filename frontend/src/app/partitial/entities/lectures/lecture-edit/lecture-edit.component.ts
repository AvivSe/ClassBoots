import {Component, OnInit} from '@angular/core';
import {entitiesService} from "../../entities.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-lecture-edit',
    templateUrl: './lecture-edit.component.html',
    styleUrls: ['./lecture-edit.component.css']
})
export class LectureEditComponent implements OnInit {
    data = {name: '',lecturer:'',description:'',date:''};
    errorMessage: string;
    error: boolean = false;

    constructor(private entitiesService: entitiesService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.entitiesService.lectureEmitter.subscribe(data => {
            if (data.error) {
                this.error = true;
                this.errorMessage = data.description
            } else {
                this.data = data;
            }
        });
        this.route.params.subscribe(params => {
            this.entitiesService.getLecture(params['_id']);
        });
    }

    onEdit(editForm) {
        if (editForm.value.name != '')
            this.data.name = editForm.value.name;
        if (editForm.value.lecturer != '')
            this.data.lecturer = editForm.value.lecturer;
        if (editForm.value.description != '')
            this.data.description = editForm.value.description;
        if (editForm.value.date != '')
            this.data.date = editForm.value.date;
        this.entitiesService.editLecture(this.data);
    }
    deleteItem() {
        this.entitiesService.deleteElement("lecture", this.data, (data) => {
            if (data.error) {
            }
        });
    }
}
