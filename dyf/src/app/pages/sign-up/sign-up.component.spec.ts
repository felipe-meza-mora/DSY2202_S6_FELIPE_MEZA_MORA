import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SignUpComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('Debería inicializar el formulario ', () => {
    expect(component.formRegistro).toBeDefined();
    expect(component.formRegistro.get('rut')).toBeDefined();
    expect(component.formRegistro.get('nombre')).toBeDefined();
    expect(component.formRegistro.get('email')).toBeDefined();
    expect(component.formRegistro.get('password')).toBeDefined();
    expect(component.formRegistro.get('confirmPassword')).toBeDefined();
    expect(component.formRegistro.get('telefono')).toBeDefined();
    expect(component.formRegistro.get('direccionEnvio')).toBeDefined();
  });

  afterEach(() => {
    component.formRegistro.reset();
  });

  it('Debería requerir que las contraseñas coincidan', () => {
    const form = component.formRegistro;
    if (form !== null && form !== undefined) {
      form.patchValue({
        password: 'Password123!',
        confirmPassword: 'DifferentPassword123!'
      });
  
      expect(form.valid).toBeFalsy();
      expect(form.hasError('passwordMismatch')).toBeTruthy();
    }
  });

  it('Debería requerir al menos una letra mayúscula en la contraseña', () => {
    const form = component.formRegistro;
    if (form !== null && form !== undefined) {
      form.patchValue({
        password: 'password123!',
      });
  
      expect(form.valid).toBeFalsy();
      expect(form.get('password')?.hasError('missingUppercase')).toBeTruthy();
    }
  });

  it('Debería requerir al menos una letra minúscula en la contraseña', () => {
    const form = component.formRegistro;
    if (form !== null && form !== undefined) {
      form.patchValue({
        password: 'PASSWORD123!',
      });
  
      expect(form.valid).toBeFalsy();
      expect(form.get('password')?.hasError('missingLowercase')).toBeTruthy();
    }
  });

  it('Debería requerir al menos un número en la contraseña', () => {
    const form = component.formRegistro;
    if (form !== null && form !== undefined) {
      form.patchValue({
        password: 'Password!',
      });
  
      expect(form.valid).toBeFalsy();
      expect(form.get('password')?.hasError('missingNumber')).toBeTruthy();
    }
  });


  



});