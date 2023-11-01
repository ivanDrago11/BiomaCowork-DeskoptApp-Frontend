let array = [];

function createDataUsuarios(name, direccion, telefono, email, password, id, acceso) {
    return {
      name,
      direccion,
      telefono,
      email,
      password,
      id,
      acceso
    };
  }

export function createArrayUsuarios(data = [], array = []){
    data.forEach((element) => {
        array.push(createDataUsuarios(element.name, element.direccion, element.telefono, element.email, element.password, element.id, element.acceso));
    });
    return array;
}



function createDataAreas(name, description, amenities, pricePerHour, capacity, image, id) {
    return {
      name,
      description,
      amenities,
      pricePerHour,
      capacity,
      image,
      id
    };
  }

export function createArrayAreas(data = [], array = []){
    data.forEach((element) => {
        array.push(createDataAreas(element.name, element.description, element.amenities, element.pricePerHour, element.capacity, element.image, element.id));
    });
    return array;
}
