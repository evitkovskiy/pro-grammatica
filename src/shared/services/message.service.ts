import { ComponentFactoryResolver, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

// Classes
import { Watcher } from 'shared/classes/watcher';

// Components
import { MessageComponent } from 'shared/components/message/message.component';

// Directives
import { RefDirective } from 'shared/directives/ref.directive';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends Watcher implements OnDestroy{

  message = new BehaviorSubject({})

  constructor(private cFResolver: ComponentFactoryResolver) {
    super()
   }

  sendMessage(message: string): void {
    this.message.next(message)
  }

  showMessage(refDir: RefDirective, message: any): void {
    const modalFactory = this.cFResolver.resolveComponentFactory(MessageComponent);
    const component = refDir?.containerRef.createComponent(modalFactory);
    if (component) {
        component.instance.message = message;
        component.instance.close
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((value: boolean) => {
            if (value) {
                refDir.containerRef.clear();
            }
        })
    }
    if (message.success) {
        setTimeout(() => {
            refDir.containerRef.clear()
        }, 3000)
    }

  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}


