import { NgClass } from '@angular/common';
import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-component',
  imports: [NgClass, FormsModule],
  templateUrl: './input-component.html',
  styleUrl: './input-component.css',
})
export class InputComponent {
  isReadOnly = input(false);
  value = input<string>('');
  clickEvent = output<string>();
  enabled = input(true);
  currentValue = signal('');

  emitValue() {
    this.clickEvent.emit(this.currentValue());
  }
  constructor() {
    effect(() => {
      this.currentValue.set(this.value());
    });
  }
}
