// Horarios comunes
const commonTimes = [
  '3:00 PM',
  '5:30 PM',
  '8:00 PM',
  '11:30 PM',
];

// Crear el arreglo de salas
export const regRooms = Array.from({ length: 7 }, (_, index) => ({
  name: `Room ${index + 1}`,
  times: commonTimes
}));
