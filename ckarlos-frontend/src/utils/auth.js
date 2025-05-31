export const obtenerUsuario = () => {
try {
const user =
JSON.parse(localStorage.getItem('usuario')) ||
JSON.parse(sessionStorage.getItem('usuario'));
return user;
} catch (error) {
console.error('Error al obtener usuario:', error);
return null;
}
};

export const obtenerToken = () => {
return localStorage.getItem('token') || sessionStorage.getItem('token');
};