import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from  '@angular/material/button';
import {MatMenuModule} from  '@angular/material/menu';
import {MatListModule} from  '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from "@angular/material/sort";

const myModules = [MatToolbarModule,MatSidenavModule, MatButtonModule, MatMenuModule,MatListModule,MatInputModule,MatCardModule,MatIconModule,MatTableModule,MatSortModule];

@NgModule({
    imports: [...myModules],
    exports: [...myModules]
})

export class MaterialModule {}