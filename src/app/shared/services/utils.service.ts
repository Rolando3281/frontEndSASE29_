import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs'

@Injectable()
export class UtilsService{
    private sideBarOpened = new BehaviorSubject<boolean>(false);
    sideBarOpened$ = this.sideBarOpened.asObservable();

    openSideBar(value:boolean):void {
        this.sideBarOpened.next(value);
    }

}