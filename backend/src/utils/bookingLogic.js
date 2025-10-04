export const calculateBooking = (rooms, numberOfRooms) => {
  if (numberOfRooms < 1 || numberOfRooms > 5) {
    throw new Error("You can only book between 1 and 5 rooms.");
  }

  const available = rooms.filter((r) => !r.isBooked);

  if (available.length < numberOfRooms) {
    throw new Error("Not enough rooms available.");
  }

  // Rule 1: Try same floor first
  for (let floor = 1; floor <= 10; floor++) {
    const floorRooms = available
      .filter((r) => r.floor === floor)
      .map((r) => r.roomNumber)
      .sort((a, b) => a - b);

    if (floorRooms.length >= numberOfRooms) {
      // Pick first N consecutive rooms for minimal horizontal travel
      const chosen = floorRooms.slice(0, numberOfRooms);
      const travelTime =
        (chosen[chosen.length - 1] % 100) - (chosen[0] % 100); // horizontal steps
      return { bookedRooms: chosen, travelTime };
    }
  }

  // Rule 2: Across floors, minimize travel
  let bestSet = null;
  let bestTime = Infinity;

  const allRooms = available.map((r) => ({ floor: r.floor, num: r.roomNumber }));
  const combos = generateCombinations(allRooms, numberOfRooms);

  for (const combo of combos) {
    const floors = combo.map((r) => r.floor);
    const nums = combo.map((r) => r.num);

    const vertical =
      (Math.max(...floors) - Math.min(...floors)) * 2; // 2 min per floor
    const horizontal =
      Math.max(...nums.map((n) => n % 100)) -
      Math.min(...nums.map((n) => n % 100));

    const time = vertical + horizontal;
    if (time < bestTime) {
      bestTime = time;
      bestSet = combo.map((r) => r.num);
    }
  }

  return { bookedRooms: bestSet, travelTime: bestTime };
};

function generateCombinations(arr, k) {
  const result = [];

  function helper(start, combo) {
    if (combo.length === k) {
      result.push([...combo]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      combo.push(arr[i]);
      helper(i + 1, combo);
      combo.pop();
    }
  }

  helper(0, []);
  return result;
}
