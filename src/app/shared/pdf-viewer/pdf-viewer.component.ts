import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-viewer.component.html', // <-- Apunta al archivo HTML
  styleUrls: ['./pdf-viewer.component.scss']   // <-- Apunta al archivo SCSS
})
export class PdfViewerComponent implements OnChanges {
  @Input() pdfUrl: string | null = null;
  safeUrl: SafeResourceUrl | null = null;

  private sanitizer = inject(DomSanitizer);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pdfUrl'] && this.pdfUrl) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
    }
  }
}