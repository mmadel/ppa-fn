import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  private roles: string[] = [];

  @Input() set appHasRole(value: string | string[]) {
    this.roles = typeof value === 'string' ? [value] : value;
    this.updateView();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) { }

  private updateView(): void {
    const hasRole = this.authService.hasAnyRole(this.roles);
    
    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
