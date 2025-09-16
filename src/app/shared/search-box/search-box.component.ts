import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  @Output() search = new EventEmitter<any>();

  private fb = inject(FormBuilder);
  searchForm: FormGroup;

  constructor() {
    this.searchForm = this.fb.group({
      type: [''],
      query: ['']
    });
  }


  onSearch() {
    this.search.emit(this.searchForm.value);
  }
}