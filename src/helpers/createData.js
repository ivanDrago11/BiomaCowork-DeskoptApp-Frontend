let array = [];

export function createData(name, direccion, telefono, email, password, id) {
    return {
      name,
      direccion,
      telefono,
      email,
      password,
      id
    };
  }

export function createArrayUsuarios(data = [], array = []){
    data.forEach((element) => {
        array.push(createData(element.name, element.direccion, element.telefono, element.email, element.password, element.id));
    });
    return array;
}