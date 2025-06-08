# Lab 04 - Testing con Jest 🧪

Este repositorio contiene las pruebas unitarias desarrolladas con **Jest y Testing Library** para el proyecto **Proveedify**, como parte del curso **Ingeniería de Software II (2025-1)**.

## 👤 Autor

- Leonardo Miguel Pachas Cleonares

---

## 📌 Historia de Usuario (Sprint 2)

**HU:** Como usuario del sistema, quiero registrar gastos compartidos y recibir notificaciones cuando se haya realizado el pago correspondiente por parte de otros usuarios.

### ✅ Tareas completadas

| ID_TAREA | Tarea                                       | Rol       | Descripción técnica |
|----------|---------------------------------------------|-----------|---------------------|
| TA015    | Crear formulario de registro de gastos      | Frontend  | Permitir a los usuarios registrar un gasto compartido ingresando el monto, la descripción y los participantes. |
| TA016    | Crear lógica de notificación de pagos       | Frontend  | Implementar el envío de notificaciones cuando un usuario marque un gasto como pagado. |
| TA017    | Mostrar notificaciones de pagos             | Frontend  | Diseñar la vista de notificaciones para que los usuarios puedan visualizar los pagos realizados. |

---

## ✅ Escenarios de prueba – HU: Registrar gastos compartidos / Notificar pagos

### 🟢 Happy Paths

**Se muestra correctamente el formulario de gastos**  
- **Precondición**: El usuario ha iniciado sesión correctamente.  
- **Acción**: Navega a la sección “Gastos compartidos” y selecciona “Registrar gasto”.  
- **Resultado esperado**: Se visualiza un formulario con campos: descripción, monto y participantes.

**Se permite ingresar información válida en todos los campos**  
- **Acción**: El usuario completa los campos con datos válidos.  
- **Resultado esperado**: El formulario refleja los datos ingresados correctamente y el botón "Registrar" se habilita.

**El gasto se registra exitosamente**  
- **Acción**: Se presiona el botón “Registrar”.  
- **Resultado esperado**:  
  - Se realiza una petición POST al endpoint correspondiente.  
  - Se muestra un mensaje de confirmación: “Gasto registrado correctamente”.

**Se genera y muestra una notificación de pago**  
- **Acción**: Un usuario marca un gasto como pagado.  
- **Resultado esperado**:  
  - Se muestra una notificación visual indicando el pago.  
  - Los demás usuarios visualizan la notificación en la bandeja.

---

### 🔴 Unhappy Paths

**Intento de registro con campos vacíos o inválidos**  
- **Acción**: El usuario intenta registrar sin completar todos los campos o ingresa valores inválidos.  
- **Resultado esperado**:  
  - El envío se bloquea.  
  - Se muestran mensajes de error: “Campo obligatorio” o “Ingrese un monto válido”.

**Descripción vacía o solo espacios**  
- **Acción**: Se ingresa `"   "` como descripción.  
- **Resultado esperado**:  
  - Se desactiva el botón de registro.  
  - Se muestra advertencia: “Ingrese una descripción válida”.

**Fallo al registrar el gasto (error del servidor)**  
- **Simulación**: El backend responde con error 500.  
- **Resultado esperado**:  
  - Se muestra mensaje: “No se pudo registrar el gasto. Intente más tarde”.  
  - El formulario no se borra.

**Error de red al notificar el pago**  
- **Simulación**: Se corta la conexión antes de notificar el pago.  
- **Resultado esperado**:  
  - Se muestra alerta: “Error de red. Intente nuevamente”.  
  - La notificación no se guarda hasta reintentar con éxito.

---

## 🧪 Cómo ejecutar las pruebas

1. Clona el repositorio:  
   ```bash
   git clone https://github.com/TU-USUARIO/lab-04-test-frontend.git
   cd lab-04-test-frontend
