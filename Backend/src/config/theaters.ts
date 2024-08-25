// Horarios comunes
const commonTimes = [
  '15:00 PM',
  '17:30 PM',
  '20:00 PM',
  '23:30 PM',
];

// Crear el arreglo de salas
export const regRooms = Array.from({ length: 7 }, (_, index) => ({
  name: `Room ${index + 1}`,
  times: commonTimes
}));
