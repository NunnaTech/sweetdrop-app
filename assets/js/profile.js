import { setData, getUser, clear } from "./utils/LocalStorage.js";
import AuthService from "./services/AuthService.js";
import { goToPage } from "./utils/Routes.js";
import NotifyService from "./utils/NotifyService.js";

const formProfile = document.querySelector("#formProfile");
const formPassword = document.querySelector("#formPassword");
const inputEmail = document.querySelector("#email");
const inputName = document.querySelector("#name");
const inputFirstSurname = document.querySelector("#first_surname");
const inputSecondSurname = document.querySelector("#second_surname");
const inputPhone = document.querySelector("#phone");

const inputPassword = document.querySelector("#password");
const inputNewPassword = document.querySelector("#new_password");
const inputNewPasswordConfirmation = document.querySelector(
  "#new_password_confirmation"
);

document.addEventListener("DOMContentLoaded", setDataOnForm);
formProfile.addEventListener("submit", saveProfile);
formPassword.addEventListener("submit", savePassword);

function validPasswords() {
  return (
    inputPassword.value !== "" &&
    inputNewPassword.value !== "" &&
    inputNewPasswordConfirmation.value !== ""
  );
}

function updatePassword() {
  let passwords = {
    password: inputPassword.value,
    new_password: inputNewPassword.value,
    new_password_confirmation: inputNewPasswordConfirmation.value,
  };
  AuthService.ChangePassword(passwords)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        NotifyService.loadingNotification(
          "Cerrando sesión, serás redirigido al inicio de sesión"
        );
        setTimeout(() => {
          clear();
          goToPage("../../index.html");
        }, 2000);
      } else {
        NotifyService.notificatonError(
          "Las contraseñas no fueron cambiadas, favor de revisar"
        );
      }
    })
    .catch((error) =>
      NotifyService.notificatonError("Hubo un error en el servicio")
    );
}

function savePassword(e) {
  e.preventDefault();
  if (validPasswords()) updatePassword();
  else
    NotifyService.notificatonError(
      "Los campos de contraseña no deben estar vacios"
    );
}

function saveProfile(e) {
  e.preventDefault();
  if (validateForm()) updateProfile();
  else
    NotifyService.notificatonError(
      "Los campos del perfil no deben estar vacios"
    );
}

function setDataOnForm() {
  const user = getUser();
  inputEmail.value = user.email;
  inputName.value = user.name;
  inputFirstSurname.value = user.first_surname;
  inputSecondSurname.value = user.second_surname;
  inputPhone.value = user.phone;
}

function updateProfile() {
  const user = getUser();
  let newUser = {
    id: user.id,
    email: inputEmail.value,
    name: inputName.value,
    first_surname: inputFirstSurname.value,
    second_surname: inputSecondSurname.value,
    phone: inputPhone.value,
    role_id: user.role_id,
  };
  AuthService.Profile(newUser)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        let user = data.data;
        setData("user", JSON.stringify(user));
        NotifyService.notificatonSuccess("El perfil ha sido actualizado");
      } else {
        NotifyService.notificatonError(
          "El perfil no fue actualizado, favor de revisar"
        );
      }
    })
    .catch((error) =>
      NotifyService.notificatonError("Hubo un error en el servicio")
    );
}

function validateForm() {
  return (
    inputEmail.value !== "" &&
    inputName.value !== "" &&
    inputFirstSurname.value !== "" &&
    inputPhone.value !== ""
  );
}
