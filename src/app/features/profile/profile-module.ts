import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from './profile';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [Profile],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class ProfileModule {}
