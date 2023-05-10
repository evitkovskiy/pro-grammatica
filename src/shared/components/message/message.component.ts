import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';

@Component({
  selector: 'pro-grammatica-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less'],
  animations: [
    trigger('hideComponent', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', [animate('2s')]),
      transition('hidden => visible', [animate('2s')])
    ])
  ]
})
export class MessageComponent implements OnInit {

  componentState = 'visible';

  @Output() close = new EventEmitter();

  message: any;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.componentState = 'hidden';
    }, 2000);
  }

}
